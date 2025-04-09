document.addEventListener("turbo:load", () => {
  const saveBtn = document.getElementById("save-recording");
  const audioElement = document.querySelector("#records audio");

  if (!saveBtn || !audioElement) return;

  saveBtn.addEventListener("click", () => {
    const blobUrl = audioElement.src;
    if (!blobUrl || !blobUrl.startsWith("blob:")) {
      alert("Aucun enregistrement à sauvegarder !");
      return;
    }

    fetch(blobUrl)
      .then(res => res.blob())
      .then(blob => {
        const formData = new FormData();
        formData.append("audio", new File([blob], "composition.wav", { type: "audio/wav" }));

        const csrfToken = document.querySelector("meta[name='csrf-token']").content;

        return fetch(saveBtn.dataset.url, {
          method: "POST",
          headers: { "X-CSRF-Token": csrfToken },
          body: formData
        });
      })
      .then(response => {
        if (response.ok) {
          alert("✅ Enregistrement sauvegardé !");
        } else {
          alert("❌ Erreur lors de la sauvegarde !");
        }
      })
      .catch(error => {
        console.error("Erreur lors de l’envoi :", error);
        alert("❌ Problème de connexion ou de traitement.");
      });
  });
});
