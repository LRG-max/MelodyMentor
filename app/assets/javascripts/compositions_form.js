document.addEventListener("turbo:load", function () {
  console.log("Script chargé !");
  const moodSelect = document.getElementById("mood-select");
  const keySignatureSelect = document.getElementById("key-signature-select");

  const options = {
    majeur: ["DO", "SOL"],
    mineur: ["MI", "LA"]
  };

  if (moodSelect && keySignatureSelect) {
    moodSelect.addEventListener("change", function () {
      const selectedMood = moodSelect.value;
      keySignatureSelect.innerHTML = '<option value="">Choisir une note</option>';

      if (options[selectedMood]) {
        options[selectedMood].forEach((note) => {
          const option = document.createElement("option");
          option.value = note;
          option.textContent = note;
          keySignatureSelect.appendChild(option);
        });
      }
    });
  }
});
