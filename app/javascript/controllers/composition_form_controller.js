import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["step", "progress", "moodSelect", "keySelect", "nextButton"]

  connect() {
    this.currentStep = 0
    this.showStep(this.currentStep)

    this.nextButtonTargets.forEach((btn, index) => {
      btn.addEventListener("click", () => this.nextStep())
    })

    if (this.hasMoodSelectTarget && this.hasKeySelectTarget) {
      this.moodSelectTarget.addEventListener("change", () => this.updateKeyOptions())
    }
  }

  showStep(index) {
    this.stepTargets.forEach((step, i) => {
      step.classList.toggle("active", i === index)
    })
    const progress = ((index + 1) / this.stepTargets.length) * 100
    this.progressTarget.style.width = `${progress}%`
  }

  nextStep() {
    if (this.currentStep < this.stepTargets.length - 1) {
      this.currentStep++
      this.showStep(this.currentStep)
    }
  }

    prevStep() {
      if (this.currentStep > 0) {
        this.currentStep--;
        this.showStep(this.currentStep);
      }
    }

  updateKeyOptions() {
    const mood = this.moodSelectTarget.value
    const keyOptions = {
      "majeur": ["DO", "SOL"],
      "mineur": ["MI", "LA"]
    }

    this.keySelectTarget.innerHTML = '<option value="">Choisir une note</option>'
    if (keyOptions[mood]) {
      keyOptions[mood].forEach(note => {
        const option = document.createElement("option")
        option.value = note
        option.textContent = note
        this.keySelectTarget.appendChild(option)
      })
    }
  }
}
