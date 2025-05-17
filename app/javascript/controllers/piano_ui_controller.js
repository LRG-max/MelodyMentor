import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["container", "toggle", "piano"]

  connect() {
    this.active = false
    this.hidePiano()
  }

  toggle() {
    this.active = !this.active
    if (this.active) {
      this.showPiano()
      this.loadPianoController()
    } else {
      this.hidePiano()
      this.unloadPianoController()
    }
  }

  hidePiano() {
    this.containerTarget.classList.add("hidden")
    this.containerTarget.style.display = "none"
  }

  showPiano() {
    this.containerTarget.classList.remove("hidden")
    this.containerTarget.style.display = "block"
  }

  loadPianoController() {
    this.pianoTarget.setAttribute("data-controller", "piano")
    this.pianoTarget.dispatchEvent(new Event("turbo:frame-load", { bubbles: true }))
  }

  unloadPianoController() {
    this.pianoTarget.removeAttribute("data-controller")
  }
}
