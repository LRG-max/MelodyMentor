import { Controller } from "@hotwired/stimulus"
import * as Tone from "tone"

export default class extends Controller {
  static targets = ["key"]

  connect() {
    this.keyMap = {}
    this.keyTargets.forEach(el => {
      const k = el.dataset.keyboard
      if (k) this.keyMap[k.toLowerCase()] = el
    })

    this.boundHandleKeydown = this.handleKeydown.bind(this)
    window.addEventListener("keydown", this.boundHandleKeydown)
  }

  disconnect() {
    window.removeEventListener("keydown", this.boundHandleKeydown)
  }

  handleKeydown = (event) => {
    const el = this.keyMap[event.key.toLowerCase()]
    if (el) this.playFromKey(el)
  }

  playNote(event) {
    this.playFromKey(event.currentTarget)
  }

  playFromKey(el) {
    const note = el.dataset.note
    const synth = new Tone.Synth()

    if (window.sharedAudioDestination && window.sharedAudioContext) {
      const gainNode = window.sharedAudioContext.createGain()

      synth.output.connect(gainNode)
      gainNode.connect(window.sharedAudioDestination)
      gainNode.connect(window.sharedAudioContext.destination)
    } else {
      synth.toDestination()
    }

    synth.triggerAttackRelease(note, "8n")

    el.classList.add("active")
    setTimeout(() => el.classList.remove("active"), 100)
  }
}
