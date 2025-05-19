import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { compositionId: Number }

  playSequence() {
    const playOrder = JSON.parse(localStorage.getItem(`playOrder_${this.compositionIdValue}`)) || []
    if (playOrder.length === 0) return

    let index = 0
    window.sequencePaused = false

    const playNext = () => {
      if (index >= playOrder.length) return
      const audio = document.getElementById(playOrder[index])
      const icon = document.querySelector(`button[data-audio-id='${audio.id}'] i`)
      if (!audio || !icon) return

      this.toggleIcons(audio, icon)

      audio.addEventListener("ended", () => {
        this.toggleIcons(audio, icon, true)
        if (!window.sequencePaused) {
          index = (index + 1) % playOrder.length
          playNext()
        }
      }, { once: true })

      audio.play()
    }

    playNext()
  }

  pauseSequence() {
    window.sequencePaused = true
    document.querySelectorAll("audio").forEach(a => a.pause())
  }

  toggleIcons(audio, icon, reset = false) {
    if (reset || !audio.paused) {
      icon.classList.remove("fa-circle-stop")
      icon.classList.add("fa-circle-play")
      audio.pause()
      audio.currentTime = 0
    } else {
      icon.classList.remove("fa-circle-play")
      icon.classList.add("fa-circle-stop")
    }
  }
}
