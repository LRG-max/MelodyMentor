
/* RECORDING */
document.addEventListener('turbo:load', () => {
  const recButton = document.getElementById('record');
  const stopButton = document.getElementById('stop');
  const downloadLink = document.getElementById('download');
  const audioElement = document.querySelector("audio");
  let mediaRecorder;
  let audioChunks = [];
  let audioContext;
  let destination;
  let sourceNodes = [];

  if (recButton && !recButton.hasEventListener) {
    recButton.addEventListener('click', async () => {
      audioContext = new AudioContext();
      destination = audioContext.createMediaStreamDestination();
      mediaRecorder = new MediaRecorder(destination.stream);
      mediaRecorder.start();
      recButton.style.color = "red";
      recButton.textContent = "En cours...";
      audioChunks = [];

      const audioArray = [
        document.getElementById('snd1'),
        document.getElementById('snd2'),
        document.getElementById('snd3'),
        document.getElementById('snd4'),
        document.getElementById('snd5'),
        document.getElementById('snd6'),
        document.getElementById('snd7')
      ];

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
      };
    });

  recButton.hasEventListener = true; // Prevent duplicate listeners
}

if (stopButton) {
  stopButton.addEventListener('click', () => {
    if (mediaRecorder) mediaRecorder.stop();
  });
}
});

async function audioBufferToWav(audioBuffer) {
  const numOfChan = audioBuffer.numberOfChannels,
  length = audioBuffer.length * numOfChan * 2 + 44,
  buffer = new ArrayBuffer(length),
  view = new DataView(buffer),
  channels = [],
  sampleRate = audioBuffer.sampleRate,
  format = 1;

  writeUTFBytes(view, 0, 'RIFF');
  view.setUint32(4, 44 + audioBuffer.length * numOfChan * 2, true);
  writeUTFBytes(view, 8, 'WAVE');
  writeUTFBytes(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, format, true);
  view.setUint16(22, numOfChan, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2 * numOfChan, true);
  view.setUint16(32, numOfChan * 2, true);
  view.setUint16(34, 16, true);
  writeUTFBytes(view, 36, 'data');
  view.setUint32(40, audioBuffer.length * numOfChan * 2, true);

  for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
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



      /* AUDIO TIMELINE */
document.addEventListener('turbo:load', () => {
  console.log("Turbo:load event fired");
  initializeScript();
});

function initializeScript() {
  console.log("initializeScript function executed");

  const sampleList = document.getElementById('sample-list');
  const selectedOrderList = document.getElementById('selected-order');
  const playSequenceButton = document.getElementById('play-sequence');
  const compositionElement = document.querySelector('.composition');
  const compositionId = compositionElement.dataset.compositionId;

  console.log('Composition ID:', compositionId);

  // Ensure required DOM elements exist
  if (!sampleList || !selectedOrderList || !playSequenceButton) {
    console.error('Required DOM elements are missing.');
    return;
  }

  const localStorageKey = `playOrder_${compositionId}`; // Unique key for this composition
  let playOrder = JSON.parse(localStorage.getItem(localStorageKey)) || []; // Retrieve saved playOrder or initialize as empty

  // Debugging: Check initial playOrder
  console.log('Initial playOrder:', playOrder);

  // Function to render the selected order list
  const renderSelectedOrder = () => {
  selectedOrderList.innerHTML = ''; // Clear the list

  if (playOrder.length === 0) {
    // Add a placeholder message if the list is empty
    const placeholder = document.createElement('li');
    placeholder.textContent = "Ajoute des accords à ta composition.";
    placeholder.classList.add('placeholder');
    selectedOrderList.appendChild(placeholder);
    return;
  }

  // Render the selected samples
  playOrder.forEach((audioId, index) => {
    const audioElement = document.getElementById(audioId);
    if (!audioElement) return; // Skip if the audio element is not found
    const filename = audioElement.closest('li').querySelector('.audio-button div').textContent;

    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <div class="selected-container">
        <button class="selected-button" data-audio-id="${audioId}" data-index="${index}">
          <i class="fa-solid fa-circle-play"></i>
          <div>${filename}</div>
        </button>
        <button class="remove-from-order" data-index="${index}">-</button>
      </div>
    `;
    listItem.dataset.audioId = audioId;
    selectedOrderList.appendChild(listItem);
  });


    // Debugging: Check rendered list
    console.log('Rendered selected order:', selectedOrderList.innerHTML);
  };

  // Initial render of the selected order list
  renderSelectedOrder();

  // Add sample to the custom order
  sampleList.addEventListener('click', (event) => {
    const button = event.target.closest('.add-to-order');
    if (!button) return;

    const audioId = button.dataset.audioId;

    // Add the sample to the play order (allow duplicates)
    playOrder.push(audioId);
    localStorage.setItem(localStorageKey, JSON.stringify(playOrder)); // Save to localStorage
    renderSelectedOrder(); // Re-render the list

    // Debugging: Check updated playOrder
    console.log('Updated playOrder after adding:', playOrder);
  });

  // Remove sample from the custom order
  selectedOrderList.addEventListener('click', (event) => {
    const button = event.target.closest('.remove-from-order');
    if (!button) return;

    const index = parseInt(button.dataset.index, 10);

    // Remove the item from the playOrder array by index
    playOrder.splice(index, 1);
    localStorage.setItem(localStorageKey, JSON.stringify(playOrder)); // Save updated playOrder to localStorage
    renderSelectedOrder(); // Re-render the list

    // Debugging: Check updated playOrder
    console.log('Updated playOrder after removing:', playOrder);
  });

  // Play/Stop functionality for the selected order
  selectedOrderList.addEventListener('click', (event) => {
    const button = event.target.closest('.selected-button');
    if (!button) return;

    const audioId = button.dataset.audioId;
    const audioElement = document.getElementById(audioId);
    const icon = button.querySelector('i');

    if (!audioElement) {
      console.error(`Audio element with ID "${audioId}" not found.`);
      return;
    }

    if (!audioElement.paused) {
      // If the audio is playing, stop it and reset the icon
      audioElement.pause();
      audioElement.currentTime = 0; // Reset playback to the beginning
      icon.classList.remove('fa-circle-stop');
      icon.classList.add('fa-circle-play');
    } else {
      // Stop any other playing audio
      document.querySelectorAll('audio').forEach((audio) => {
        if (!audio.paused) {
          audio.pause();
          audio.currentTime = 0;
          const otherButton = document.querySelector(`.selected-button[data-audio-id="${audio.id}"]`);
          if (otherButton) {
            const otherIcon = otherButton.querySelector('i');
            otherIcon.classList.remove('fa-circle-stop');
            otherIcon.classList.add('fa-circle-play');
          }
        }
      });

      // Play the selected audio and change the icon
      audioElement.play();
      icon.classList.remove('fa-circle-play');
      icon.classList.add('fa-circle-stop');

      // Listen for the 'ended' event to reset the icon when the audio finishes
      audioElement.addEventListener('ended', () => {
      icon.classList.remove('fa-circle-stop');
      icon.classList.add('fa-circle-play');
    }, { once: true }); // Use { once: true } to ensure the event listener is removed after execution
    }
  });


  // Play the samples in the custom order
  playSequenceButton.addEventListener('click', () => {
    if (playOrder.length === 0) {
      alert('Ajoute des accords à ta composition!');
      return;
    }

    let currentIndex = 0;

    const playNext = () => {
      if (currentIndex >= playOrder.length) return; // Stop if all samples are played

      const audioId = playOrder[currentIndex];
      const audioElement = document.getElementById(audioId);

      audioElement.play();
      audioElement.onended = () => {
        currentIndex++;
        playNext(); // Play the next sample when the current one ends
      };
    };

    playNext(); // Start playing the first sample
  });




  document.addEventListener('DOMContentLoaded', () => {
    console.log("hello from DOMContentLoaded");
  });




  // Toggle play/stop icon and audio playback
  sampleList.addEventListener('click', (event) => {
    const button = event.target.closest('.audio-button');
    if (!button) return;

    const audioId = button.dataset.audioId;
    const audioElement = document.getElementById(audioId);
    const icon = button.querySelector('i');

    if (!audioElement) {
    console.error(`Audio element with ID "${audioId}" not found.`);
    return;
  }

    if (!audioElement.paused) {
      // If the audio is playing, stop it and reset the icon
      audioElement.pause();
      audioElement.currentTime = 0; // Reset playback to the beginning
      icon.classList.remove('fa-circle-stop');
      icon.classList.add('fa-circle-play');

    } else {
      // Stop any other playing audio
      document.querySelectorAll('audio').forEach((audio) => {
        if (!audio.paused) {
          audio.pause();
          audio.currentTime = 0;
          const otherButton = document.querySelector(`.audio-button[data-audio-id="${audio.id}"]`);
          if (otherButton) {
            const otherIcon = otherButton.querySelector('i');
            otherIcon.classList.remove('fa-circle-stop');
            otherIcon.classList.add('fa-circle-play');

          }
        }
      });

      // Play the selected audio and change the icon
      audioElement.play();
      icon.classList.remove('fa-circle-play');
      icon.classList.add('fa-circle-stop');

      // Listen for the 'ended' event to reset the icon when the audio finishes
      audioElement.addEventListener('ended', () => {
        icon.classList.remove('fa-circle-stop');
        icon.classList.add('fa-circle-play');
      }, { once: true }); // Use { once: true } to ensure the event listener is removed after execution

    }


    });
  }
