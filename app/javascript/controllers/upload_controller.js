import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["audio", "save"]
  static values = { url: String }

  connect() {

  }

  save() {
    const audioEl = this.audioTarget
    const blobUrl = audioEl.src

    if (!blobUrl || !blobUrl.startsWith("blob:")) {
      alert("Aucun enregistrement à sauvegarder !");
      return;
    }

    fetch(blobUrl)
      .then(res => res.blob())
      .then(blob => {
        const formData = new FormData()
        formData.append("audio", new File([blob], "composition.wav", { type: "audio/wav" }))

        const csrfToken = document.querySelector("meta[name='csrf-token']").content

        return fetch(this.urlValue, {
          method: "POST",
          headers: { "X-CSRF-Token": csrfToken },
          body: formData
        })
      })
      .then(response => {
        if (response.ok) {
          alert("✅ Enregistrement sauvegardé !");
        } else {
          alert("❌ Erreur lors de la sauvegarde !");
        }
      })
      .catch(error => {
        console.error("Erreur lors de l’envoi :", error)
        alert("❌ Problème de connexion ou de traitement.")
      });
  }
}
