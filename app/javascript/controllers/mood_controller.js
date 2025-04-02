document.addEventListener("DOMContentLoaded", function () {
  const moodSelect = document.getElementById("mood-select");
  const keySignatureSelect = document.getElementById("key-signature-select");

  // Notes disponibles selon l'humeur
  const tonalities = {
    majeur: ["Do", "Sol"],
    mineur: ["La", "Mi"]
  };

  moodSelect.addEventListener("change", function () {
    const selectedMood = moodSelect.value;

    // Vider la liste des tonalités
    keySignatureSelect.innerHTML = '<option value="">Choisir une note</option>';

    if (selectedMood && tonalities[selectedMood]) {
      tonalities[selectedMood].forEach(note => {
        let option = document.createElement("option");
        option.value = note;
        option.textContent = note;
        keySignatureSelect.appendChild(option);
      });
    }
  });
});
