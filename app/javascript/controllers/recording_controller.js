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
    const playOrder = JSON.parse(localStorage.getItem(`playOrder_${this.compositionIdValue}`)) || []
    if (playOrder.length === 0) return alert("Aucun son sélectionné à enregistrer.")

    if (this.audioContext && this.audioContext.state !== 'closed') await this.audioContext.close()
    this.audioContext = new AudioContext()
    if (this.audioContext.state === 'suspended') await this.audioContext.resume()

    this.destination = this.audioContext.createMediaStreamDestination()
    this.mediaRecorder = new MediaRecorder(this.destination.stream)
    this.audioChunks = []

    const clones = playOrder.map(id => {
      const original = document.getElementById(id)
      if (!original) return null
      const source = original.querySelector('source')
      const clone = document.createElement('audio')
      clone.src = source?.src || original.src
      clone.crossOrigin = 'anonymous'
      clone.preload = 'auto'
      document.body.appendChild(clone)
      return clone
    }).filter(Boolean)

    clones.forEach(audio => {
      const source = this.audioContext.createMediaElementSource(audio)
      source.connect(this.destination)
      source.connect(this.audioContext.destination)
      this.sourceNodes.push(source)
    })

    this.mediaRecorder.ondataavailable = e => this.audioChunks.push(e.data)

    this.mediaRecorder.onstop = async () => {
      const blob = new Blob(this.audioChunks, { type: 'audio/webm' })
      if (blob.size === 0) {
        alert("❌ L'enregistrement est vide.")
        this.cleanup(clones)
        return
      }

      const arrayBuffer = await blob.arrayBuffer()
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer)
      const wavBlob = await this.audioBufferToWav(audioBuffer)
      const url = URL.createObjectURL(wavBlob)

      this.audioTarget.src = url
      this.downloadTarget.href = url
      this.downloadTarget.download = 'recording.wav'
    }

    this.mediaRecorder.start()
    this.recordTarget.textContent = "En cours..."
    let index = 0
    const playNext = () => {
      if (!clones[index]) return
      const audio = clones[index]
      audio.currentTime = 0
      audio.play().then(() => {
        audio.onended = () => {
          index += 1
          index < clones.length ? playNext() : this.stopRecording()
        }
      })
    }
    playNext()
  }

  stopRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop()
    }
  }

  cleanup(clones) {
    this.sourceNodes.forEach(n => n.disconnect())
    if (this.destination) this.destination.disconnect()
    this.audioContext?.close()
    clones.forEach(a => a.remove())
  }

  async audioBufferToWav(audioBuffer) {
    const numChannels = audioBuffer.numberOfChannels
    const length = audioBuffer.length * numChannels * 2 + 44
    const buffer = new ArrayBuffer(length)
    const view = new DataView(buffer)
    const sampleRate = audioBuffer.sampleRate
    const channels = []

    this.writeUTFBytes(view, 0, 'RIFF')
    view.setUint32(4, 44 + audioBuffer.length * numChannels * 2, true)
    this.writeUTFBytes(view, 8, 'WAVE')
    this.writeUTFBytes(view, 12, 'fmt ')
    view.setUint32(16, 16, true)
    view.setUint16(20, 1, true)
    view.setUint16(22, numChannels, true)
    view.setUint32(24, sampleRate, true)
    view.setUint32(28, sampleRate * numChannels * 2, true)
    view.setUint16(32, numChannels * 2, true)
    view.setUint16(34, 16, true)
    this.writeUTFBytes(view, 36, 'data')
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

    return new Blob([buffer], { type: 'audio/wav' })
  }

  writeUTFBytes(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i))
    }
  }
}
