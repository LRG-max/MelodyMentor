import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["button"]

  connect() {

  }

  toggle(event) {
    const button = event.currentTarget
    const audioId = button.dataset.audioId
    const original = document.getElementById(audioId)
    const icon = button.querySelector("i")

    if (!original || !icon) return


    const clone = original.cloneNode(true)
    clone.id = `${audioId}-clone-${Date.now()}`
    clone.crossOrigin = "anonymous"
    document.body.appendChild(clone)

    icon.classList.remove("fa-circle-play")
    icon.classList.add("fa-circle-stop")

    clone.play().then(() => {
      clone.addEventListener("ended", () => {
        icon.classList.remove("fa-circle-stop")
        icon.classList.add("fa-circle-play")
        clone.remove()
      }, { once: true })
    }).catch(err => {
      console.warn("Erreur de lecture du clone :", err)
      icon.classList.remove("fa-circle-stop")
      icon.classList.add("fa-circle-play")
      clone.remove()
    })
  }
}
