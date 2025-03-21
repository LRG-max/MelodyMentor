import Shepherd from 'shepherd.js';

document.addEventListener("DOMContentLoaded", function () {
  const tour = new Shepherd.Tour({
    defaultStepOptions: {
      classes: 'tour-step',
      scrollTo: true
    }
  });

  tour.addStep({
    title: 'Bienvenue sur MelodyMentor ! 🎵',
    text: 'Découvrez comment utiliser l’application en quelques étapes.',
    attachTo: { element: '#features-section', on: 'bottom' },
    buttons: [{ text: 'Suivant', action: tour.next }]
  });

  tour.addStep({
    title: 'Connexion',
    text: 'Cliquez ici pour vous connecter',
    attachTo: { element: '#login', on: 'bottom'},
    buttons: [
      { text: 'Précédent', action: tour.back },
      { text: 'Suivant', action: tour.next }
    ]
  });

  tour.addStep({
    title: 'Création',
    text: 'Cliquez ici pour commencer à composer.',
    attachTo: { element: '#button-action', on: 'bottom' },
    buttons: [
      { text: 'Précédent', action: tour.back },
      { text: 'Terminer', action: tour.complete }
    ]
  });

  // Événement pour démarrer la visite
  const startTourButton = document.getElementById('start-tour');
  if (startTourButton) {
    startTourButton.addEventListener('click', function () {
      tour.start();
    });
  }
});
