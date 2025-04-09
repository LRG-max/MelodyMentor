document.addEventListener('turbo:load', () => {
  console.log("Turbo:load déclenché");
  setTimeout(() => {
    initializeScript();
    setupRecording();
    initializeTimeline();
  }, 500);  // Attendre 500 ms avant d'exécuter le code pour être sûr que le DOM est chargé
});

function initializeScript() {
  // On tente de récupérer l'élément .composition après un délai
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

  // Insère ton code logique pour utiliser compositionId ici
}

/* -------- 🎙 ENREGISTREMENT -------- */
function setupRecording() {
  const recButton = document.getElementById('record');
  const stopButton = document.getElementById('stop');
  const downloadLink = document.getElementById('download');
  const audioElement = document.querySelector("audio");

  let mediaRecorder;
  let audioChunks = [];
  let audioContext;
  let destination;
  let sourceNodes = [];

  if (!recButton || recButton.dataset.bound) return;
  recButton.dataset.bound = "true";

  recButton.addEventListener('click', async () => {
    if (!window.AudioContext) {
      alert("AudioContext n'est pas supporté.");
      return;
    }

    audioContext = new AudioContext();
    destination = audioContext.createMediaStreamDestination();
    mediaRecorder = new MediaRecorder(destination.stream);
    mediaRecorder.start();
    recButton.style.color = "red";
    recButton.textContent = "En cours...";
    audioChunks = [];

    const audioArray = [
      'snd1', 'snd2', 'snd3', 'snd4', 'snd5', 'snd6', 'snd7'
    ].map(id => document.getElementById(id)).filter(el => el);

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
    };
  });

  stopButton?.addEventListener('click', () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }
  });

  function cleanupAudioContext() {
    if (sourceNodes.length) {
      sourceNodes.forEach(node => node.disconnect());
      sourceNodes = [];
    }
    destination?.disconnect();
    audioContext?.close();
  }
}

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

/* -------- 🎼 TIMELINE -------- */
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

  // Playback buttons
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

  sampleList.addEventListener('click', (event) => {
    const btn = event.target.closest('.audio-button');
    if (!btn) return;
    const audioId = btn.dataset.audioId;
    const audio = document.getElementById(audioId);
    const icon = btn.querySelector('i');
    togglePlayButton(audio, icon);
  });

  selectedOrderList.addEventListener('click', (event) => {
    const btn = event.target.closest('.selected-button');
    if (!btn) return;
    const audioId = btn.dataset.audioId;
    const audio = document.getElementById(audioId);
    const icon = btn.querySelector('i');
    togglePlayButton(audio, icon);
  });

  playSequenceButton.addEventListener('click', () => {
    if (playOrder.length === 0) {
      alert('Ajoute des accords à ta composition!');
      return;
    }

    let index = 0;

    const playNext = () => {
      if (index >= playOrder.length) return;
      const audio = document.getElementById(playOrder[index]);
      audio.play().catch(err => console.warn("Erreur de lecture:", err));
      audio.onended = () => {
        index++;
        playNext();
      };
    };

    // Stop all current audios
    document.querySelectorAll('audio').forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });

    playNext();
  });

  const resetButton = document.getElementById('reset-order');
  if (resetButton) {
  console.log('Button "reset-order" trouvé');
  resetButton.addEventListener('click', () => {
    console.log('Réinitialisation lancée');
    if (!confirm("Souhaites-tu vraiment réinitialiser ta composition ?")) return;

    playOrder = [];
    localStorage.removeItem(localStorageKey);
    renderSelectedOrder();
  });
} else {
  console.log('Button "reset-order" non trouvé');
}}
