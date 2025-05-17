import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["button"]

  connect() {
    console.log("🎶 NoteController connecté")
  }

  toggle(event) {
    const button = event.currentTarget
    const audioId = button.dataset.audioId
    const audio = document.getElementById(audioId)
    const icon = button.querySelector("i")

    if (!audio || !icon) return

    if (!audio.paused) {
      audio.pause()
      audio.currentTime = 0
      icon.classList.remove('fa-circle-stop')
      icon.classList.add('fa-circle-play')
    } else {

      document.querySelectorAll("audio").forEach(a => {
        a.pause()
        a.currentTime = 0
        const otherIcon = document.querySelector(`button[data-audio-id='${a.id}'] i`)
        otherIcon?.classList.remove("fa-circle-stop")
        otherIcon?.classList.add("fa-circle-play")
      })

      audio.play().then(() => {
        icon.classList.remove('fa-circle-play')
        icon.classList.add('fa-circle-stop')
      })

      audio.addEventListener("ended", () => {
        icon.classList.remove("fa-circle-stop")
        icon.classList.add("fa-circle-play")
      }, { once: true })
    }
  }
}
