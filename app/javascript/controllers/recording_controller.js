import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["record", "stop", "audio", "download"]
  static values = { compositionId: Number }

  connect() {
    this.audioChunks = []
    this.sourceNodes = []
    this.audioContext = null
    this.destination = null
    this.mediaRecorder = null
  }

  async startRecording() {
    if (this.audioContext && this.audioContext.state !== "closed") await this.audioContext.close()
    this.audioContext = new AudioContext()
    if (this.audioContext.state === "suspended") await this.audioContext.resume()

    this.destination = this.audioContext.createMediaStreamDestination()
    this.mediaRecorder = new MediaRecorder(this.destination.stream)
    this.audioChunks = []


    const allAudios = Array.from(document.querySelectorAll("audio")).filter(a => a.id)
    allAudios.forEach(audio => {
      try {
        const source = this.audioContext.createMediaElementSource(audio)
        source.connect(this.destination)
        this.sourceNodes.push(source)
      } catch (e) {
        console.warn(`⚠️ Source déjà connectée ou erreur : ${audio.id}`, e)
      }
    })


    this.sourceNodes.forEach(source => source.connect(this.audioContext.destination))

    this.mediaRecorder.ondataavailable = e => this.audioChunks.push(e.data)

    this.mediaRecorder.onstop = async () => {
      try {
        const blob = new Blob(this.audioChunks, { type: "audio/webm" })
        if (blob.size === 0) {
          alert("❌ L'enregistrement est vide.")
          return
        }

        const arrayBuffer = await blob.arrayBuffer()
        const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer)
        const wavBlob = await this.audioBufferToWav(audioBuffer)
        const url = URL.createObjectURL(wavBlob)

        this.audioTarget.src = url
        this.downloadTarget.href = url
        this.downloadTarget.download = "recording.wav"
      } catch (e) {
        console.error("Erreur conversion en WAV :", e)
        alert("❌ Erreur lors de la conversion.")
      } finally {
        this.cleanup()
        this.recordTarget.textContent = "Enregistrer"
      }
    }

    this.mediaRecorder.start()
    this.recordTarget.textContent = "En cours..."
    console.log("🎙️ Enregistrement lancé. Lance la lecture manuellement.")
  }

  stopRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state !== "inactive") {
      this.mediaRecorder.stop()
      console.log("🛑 Enregistrement arrêté.")
    }
  }

  cleanup() {
    this.sourceNodes.forEach(n => n.disconnect())
    if (this.destination) this.destination.disconnect()
    this.audioContext?.close()
    this.sourceNodes = []
    this.destination = null
    this.audioContext = null
  }

  async audioBufferToWav(audioBuffer) {
    const numChannels = audioBuffer.numberOfChannels
    const length = audioBuffer.length * numChannels * 2 + 44
    const buffer = new ArrayBuffer(length)
    const view = new DataView(buffer)
    const sampleRate = audioBuffer.sampleRate
    const channels = []

    this.writeUTFBytes(view, 0, "RIFF")
    view.setUint32(4, 44 + audioBuffer.length * numChannels * 2, true)
    this.writeUTFBytes(view, 8, "WAVE")
    this.writeUTFBytes(view, 12, "fmt ")
    view.setUint32(16, 16, true)
    view.setUint16(20, 1, true)
    view.setUint16(22, numChannels, true)
    view.setUint32(24, sampleRate, true)
    view.setUint32(28, sampleRate * numChannels * 2, true)
    view.setUint16(32, numChannels * 2, true)
    view.setUint16(34, 16, true)
    this.writeUTFBytes(view, 36, "data")
    view.setUint32(40, audioBuffer.length * numChannels * 2, true)

    for (let i = 0; i < numChannels; i++) {
      channels.push(audioBuffer.getChannelData(i))
    }

    let offset = 44
    for (let i = 0; i < audioBuffer.length; i++) {
      for (let j = 0; j < numChannels; j++) {
        const sample = Math.max(-1, Math.min(1, channels[j][i]))
        view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true)
        offset += 2
      }
    }

    return new Blob([buffer], { type: "audio/wav" })
  }

  writeUTFBytes(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i))
    }
  }
}
