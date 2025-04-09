let mediaRecorder = null;
let audioContext = null;
document.addEventListener('turbo:load', () => {
  console.log("Turbo:load déclenché");

  setTimeout(() => {
    initializeScript();
    setupRecording();
    initializeTimeline();
  }, 500); // Attendre 500 ms avant d'exécuter le code pour être sûr que le DOM est chargé
});

// Initialisation du script
function initializeScript() {
  const compositionElement = document.querySelector('.composition');
  if (!compositionElement) {
    console.error('L\'élément .composition n\'a pas été trouvé');
    return;
  }

  const compositionId = compositionElement.dataset.compositionId;
  if (!compositionId) {
    console.error('L\'ID de la composition est manquant');
    return;
  }

  console.log("ID de la composition : ", compositionId);
}

// Setup de l'enregistrement audio
function setupRecording() {
  const recButton = document.getElementById('record');
  const stopButton = document.getElementById('stop');
  const downloadLink = document.getElementById('download');
  const audioElement = document.querySelector("audio");

  if (!recButton || !stopButton || !downloadLink || !audioElement) {
    console.error("Des éléments nécessaires sont manquants dans le DOM !");
    return;
  }

  let audioChunks = [];
  let destination = null;
  let sourceNodes = [];

  if (recButton.dataset.bound) return;
  recButton.dataset.bound = "true";

  recButton.addEventListener('click', async () => {
    if (!window.AudioContext) {
      alert("AudioContext n'est pas supporté.");
      return;
    }

    if (audioContext && audioContext.state !== 'closed') {
      await audioContext.close();
    }

    audioContext = new AudioContext();
    destination = audioContext.createMediaStreamDestination();
    mediaRecorder = new MediaRecorder(destination.stream);
    audioChunks = [];


    const originalIds = ['snd1', 'snd2', 'snd3', 'snd4', 'snd5', 'snd6', 'snd7'];
    const audioArray = originalIds.map(id => {
      const original = document.getElementById(id);
      if (!original) return null;
      const clone = original.cloneNode(true);
      clone.id = `${id}-clone`;
      document.body.appendChild(clone);
      return clone;
    }).filter(el => el);

    audioArray.forEach(audio => {
      const source = audioContext.createMediaElementSource(audio);
      source.connect(destination);
      source.connect(audioContext.destination);
      sourceNodes.push(source);
    });

    mediaRecorder.ondataavailable = event => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      const arrayBuffer = await audioBlob.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      const wavBlob = await audioBufferToWav(audioBuffer);
      const audioURL = URL.createObjectURL(wavBlob);

      audioElement.src = audioURL;
      downloadLink.href = audioURL;
      downloadLink.download = 'recording.wav';

      recButton.style.color = "";
      recButton.innerHTML = '<i class="fa-solid fa-record-vinyl"></i>&nbsp Enregistrer';

      cleanupAudioContext();


      audioArray.forEach(audio => audio.remove());
    };

    mediaRecorder.start();
    recButton.style.color = "red";
    recButton.textContent = "En cours...";
  });

  stopButton.addEventListener('click', () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      console.log("Arrêt de l'enregistrement...");
      mediaRecorder.stop();
    } else {
      console.warn("Aucun enregistrement actif à arrêter");
    }
  });

  function cleanupAudioContext() {
    if (sourceNodes.length) {
      sourceNodes.forEach(node => node.disconnect());
      sourceNodes = [];
    }

    if (destination) {
      destination.disconnect();
      destination = null;
    }

    if (audioContext && audioContext.state !== 'closed') {
      audioContext.close();
    }

    audioContext = null;
  }
}

// Convertir le buffer audio en fichier WAV
async function audioBufferToWav(audioBuffer) {
  const numOfChan = audioBuffer.numberOfChannels;
  const length = audioBuffer.length * numOfChan * 2 + 44;
  const buffer = new ArrayBuffer(length);
  const view = new DataView(buffer);
  const channels = [];
  const sampleRate = audioBuffer.sampleRate;

  writeUTFBytes(view, 0, 'RIFF');
  view.setUint32(4, 44 + audioBuffer.length * numOfChan * 2, true);
  writeUTFBytes(view, 8, 'WAVE');
  writeUTFBytes(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numOfChan, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2 * numOfChan, true);
  view.setUint16(32, numOfChan * 2, true);
  view.setUint16(34, 16, true);
  writeUTFBytes(view, 36, 'data');
  view.setUint32(40, audioBuffer.length * numOfChan * 2, true);

  for (let i = 0; i < numOfChan; i++) {
    channels.push(audioBuffer.getChannelData(i));
  }

  let offset = 44;
  for (let i = 0; i < audioBuffer.length; i++) {
    for (let j = 0; j < numOfChan; j++) {
      const sample = Math.max(-1, Math.min(1, channels[j][i]));
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
      offset += 2;
    }
  }

  return new Blob([buffer], { type: 'audio/wav' });
}

function writeUTFBytes(view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

// Initialisation de la timeline (gestion des échantillons audio)
function initializeTimeline() {
  const sampleList = document.getElementById('sample-list');
  const selectedOrderList = document.getElementById('selected-order');
  const playSequenceButton = document.getElementById('play-sequence');
  const compositionElement = document.querySelector('.composition');
  const compositionId = compositionElement?.dataset.compositionId;

  if (!sampleList || !selectedOrderList || !playSequenceButton || !compositionId) return;

  const localStorageKey = `playOrder_${compositionId}`;
  let playOrder = JSON.parse(localStorage.getItem(localStorageKey)) || [];

  const renderSelectedOrder = () => {
    selectedOrderList.innerHTML = '';
    console.log("Play Order dans la vue d'édition :", playOrder);
    if (playOrder.length === 0) {
      const placeholder = document.createElement('li');
      placeholder.textContent = "Ajoute des accords à ta composition.";
      placeholder.classList.add('placeholder');
      selectedOrderList.appendChild(placeholder);
      return;
    }

    playOrder.forEach((audioId, index) => {
      const audioEl = document.getElementById(audioId);
      if (!audioEl) return;
      const filename = audioEl.closest('li').querySelector('.audio-button div').textContent;

      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <div class="selected-container">
          <button class="selected-button" data-audio-id="${audioId}" data-index="${index}">
            <i class="fa-solid fa-circle-play"></i>
            <div>${filename}</div>
          </button>
          <button class="remove-from-order" data-index="${index}">-</button>
        </div>`;
      selectedOrderList.appendChild(listItem);
    });
  };

  renderSelectedOrder();

  sampleList.addEventListener('click', (event) => {
    const addBtn = event.target.closest('.add-to-order');
    if (!addBtn) return;
    const audioId = addBtn.dataset.audioId;
    playOrder.push(audioId);
    localStorage.setItem(localStorageKey, JSON.stringify(playOrder));
    renderSelectedOrder();
  });

  selectedOrderList.addEventListener('click', (event) => {
    const removeBtn = event.target.closest('.remove-from-order');
    if (!removeBtn) return;
    const index = parseInt(removeBtn.dataset.index, 10);
    playOrder.splice(index, 1);
    localStorage.setItem(localStorageKey, JSON.stringify(playOrder));
    renderSelectedOrder();
  });

  // Boutons de lecture
  const togglePlayButton = (audioElement, icon) => {
    if (!audioElement.paused) {
      audioElement.pause();
      audioElement.currentTime = 0;
      icon.classList.remove('fa-circle-stop');
      icon.classList.add('fa-circle-play');
    } else {
      document.querySelectorAll('audio').forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
        const otherIcon = document.querySelector(`button[data-audio-id="${audio.id}"] i`);
        otherIcon?.classList.remove('fa-circle-stop');
        otherIcon?.classList.add('fa-circle-play');
      });

      audioElement.play().catch(err => console.warn("Playback issue:", err));
      icon.classList.remove('fa-circle-play');
      icon.classList.add('fa-circle-stop');

      audioElement.addEventListener('ended', () => {
        icon.classList.remove('fa-circle-stop');
        icon.classList.add('fa-circle-play');
      }, { once: true });
    }
  };

  playSequenceButton.addEventListener('click', () => {

    if (window.sequenceInterval) clearInterval(window.sequenceInterval);

    const audiosToPlay = playOrder.map(audioId => document.getElementById(audioId));
    if (audiosToPlay.length === 0) return;

    let currentIndex = 0;

    const playNextAudio = () => {
      if (!audiosToPlay[currentIndex]) return;

      const audio = audiosToPlay[currentIndex];
      const icon = document.querySelector(`button[data-audio-id="${audio.id}"] i`);

      audio.currentTime = 0;
      togglePlayButton(audio, icon);

      audio.addEventListener('ended', () => {
        currentIndex = (currentIndex + 1) % audiosToPlay.length;
        window.sequenceCurrentIndex = currentIndex;

        if (!window.sequencePaused) {
          playNextAudio();
        }
      }, { once: true });

      audio.play();
    };

    window.sequencePaused = false;
    playNextAudio();
  });


const resetOrderButton = document.getElementById('reset-order');
if (resetOrderButton) {
  resetOrderButton.addEventListener('click', () => {
    playOrder = [];
    localStorage.removeItem(localStorageKey);
    renderSelectedOrder();

    if (window.sequenceInterval) {
      clearInterval(window.sequenceInterval);
      window.sequenceInterval = null;
    }
  });
}

const pauseSequenceButton = document.getElementById('pause-sequence');
if (pauseSequenceButton) {
  pauseSequenceButton?.addEventListener('click', () => {
    window.sequencePaused = true;
    document.querySelectorAll('audio').forEach(audio => audio.pause());
  });
}

if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
  console.log("Hard refresh détecté");
}
}
