import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { compositionId: Number }
  static targets = ["sampleList", "selectedList"]

  connect() {
    this.localStorageKey = `playOrder_${this.compositionIdValue}`
    this.playOrder = JSON.parse(localStorage.getItem(this.localStorageKey)) || []
    this.renderOrder()
  }

  addToOrder(event) {
    const button = event.target.closest(".add-to-order")
    if (!button) return
    this.playOrder.push(button.dataset.audioId)
    this.save()
    this.renderOrder()
  }

  removeFromOrder(event) {
    const button = event.target.closest(".remove-from-order")
    if (!button) return
    const index = parseInt(button.dataset.index, 10)
    this.playOrder.splice(index, 1)
    this.save()
    this.renderOrder()
  }

  resetOrder() {
    this.playOrder = []
    localStorage.removeItem(this.localStorageKey)
    this.renderOrder()
  }

  save() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.playOrder))
  }

  renderOrder() {
    this.selectedListTarget.innerHTML = ""
    if (this.playOrder.length === 0) {
      const placeholder = document.createElement("li")
      placeholder.textContent = "Ajoute des accords à ta composition."
      placeholder.classList.add("placeholder")
      this.selectedListTarget.appendChild(placeholder)
      return
    }

    this.playOrder.forEach((audioId, index) => {
      const audioEl = document.getElementById(audioId)
      if (!audioEl) return
      const filename = audioEl.closest("li").querySelector(".audio-button div").textContent

      const li = document.createElement("li")
      li.innerHTML = `
        <div class="selected-container">
          <button class="selected-button" data-audio-id="${audioId}" data-index="${index}">
            <i class="fa-solid fa-circle-play"></i>
            <div>${filename}</div>
          </button>
          <button class="remove-from-order" data-action="click->timeline#removeFromOrder" data-index="${index}">-</button>
        </div>
      `
      this.selectedListTarget.appendChild(li)
    })
  }
}
