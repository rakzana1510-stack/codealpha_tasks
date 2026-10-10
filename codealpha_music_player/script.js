/**
 * AuraSound Music Player
 * CodeAlpha Web Development Internship - Task 3
 * Pure Vanilla JavaScript using HTML5 Audio API
 */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // 1. Song Data & Playlist
  // ---------------------------------------------------------------------------
  const songs = [
    {
      id: 1,
      title: 'Midnight Chill',
      artist: 'Aether Wave',
      album: 'Neon Horizon',
      genre: 'SYNTHWAVE • CHILL',
      cover: 'images/cover1.svg',
      src: 'audio/song1.mp3',
      duration: '3:45',
      durationSec: 225,
      featured: true,
      description: 'Immerse yourself in nostalgic retro-futuristic synth pads, deep arpeggiated basslines, and smooth lo-fi beats.',
      chords: [220.0, 174.61, 261.63, 196.0], // Am - F - C - G
      melody: [440.0, 523.25, 659.25, 587.33, 659.25, 523.25, 440.0, 392.0],
      bpm: 110
    },
    {
      id: 2,
      title: 'Cosmic Serenade',
      artist: 'Celeste Nova',
      album: 'Astral Drift',
      genre: 'AMBIENT • SPACE',
      cover: 'images/cover2.svg',
      src: 'audio/song2.mp3',
      duration: '4:12',
      durationSec: 252,
      featured: false,
      description: 'Atmospheric deep space pads, floating crystalline chiming melodies, and expansive cosmic reverb.',
      chords: [146.83, 116.54, 174.61, 130.81], // Dm - Bb - F - C
      melody: [587.33, 698.46, 880.0, 783.99, 698.46, 587.33, 523.25, 440.0],
      bpm: 95
    },
    {
      id: 3,
      title: 'Golden Horizon',
      artist: 'Solara Beats',
      album: 'Sunset Tape',
      genre: 'LO-FI • CHILL HOP',
      cover: 'images/cover3.svg',
      src: 'audio/song3.mp3',
      duration: '3:20',
      durationSec: 200,
      featured: false,
      description: 'Warm tape-saturated acoustic chords, gentle crackle, soothing piano progression, and laid-back grooves.',
      chords: [164.81, 220.0, 146.83, 123.47], // Em - Am - D - Bm
      melody: [329.63, 392.0, 440.0, 493.88, 440.0, 392.0, 329.63, 293.66],
      bpm: 85
    },
    {
      id: 4,
      title: 'Urban Beats',
      artist: 'Neon Pulse',
      album: 'Cyber Circuit',
      genre: 'ELECTRONIC • BASS',
      cover: 'images/cover4.svg',
      src: 'audio/song4.mp3',
      duration: '3:50',
      durationSec: 230,
      featured: false,
      description: 'Energetic modern future-bass synthesizers, punchy dynamic rhythm, and cutting-edge electronic textures.',
      chords: [174.61, 138.59, 207.65, 155.56], // Fm - Db - Ab - Eb
      melody: [698.46, 830.61, 1046.50, 932.33, 830.61, 698.46, 622.25, 523.25],
      bpm: 125
    },
    {
      id: 5,
      title: 'Rainy Cafe',
      artist: 'Velvet Bloom',
      album: 'Quiet Hours',
      genre: 'LO-FI JAZZ • STUDY',
      cover: 'images/cover5.svg',
      src: 'audio/song5.mp3',
      duration: '4:05',
      durationSec: 245,
      featured: false,
      description: 'Soothing jazz-hop chords, soft rain ambiance, mellow electric piano, and relaxing study beats.',
      chords: [196.0, 164.81, 220.0, 146.83], // G - Em - Am - D
      melody: [392.0, 493.88, 587.33, 523.25, 493.88, 392.0, 329.63, 293.66],
      bpm: 90
    },
    {
      id: 6,
      title: 'Starlight Symphony',
      artist: 'Aura Groove',
      album: 'Eclipse Dreams',
      genre: 'DREAM POP • CHILL',
      cover: 'images/cover6.svg',
      src: 'audio/song6.mp3',
      duration: '3:38',
      durationSec: 218,
      featured: false,
      description: 'Glistening synth arpeggios, uplifting dream-pop melodies, and ethereal ambient vocal textures.',
      chords: [130.81, 164.81, 174.61, 196.0], // C - Em - F - G
      melody: [523.25, 659.25, 698.46, 783.99, 880.0, 783.99, 659.25, 523.25],
      bpm: 100
    }
  ];

  // ---------------------------------------------------------------------------
  // 2. Application State
  // ---------------------------------------------------------------------------
  let currentIndex = 0;
  let isPlaying = false;
  let isMuted = false;
  let currentVolume = 0.8;
  let previousVolume = 0.8;
  let isShuffle = false;
  let repeatMode = 'all'; // 'none' | 'all' | 'one'
  let currentSpeed = 1.0;
  let favorites = new Set();
  let isSeeking = false;
  let searchQuery = '';

  // HTML5 Audio Element
  const audio = new Audio();
  audio.preload = 'metadata';
  audio.volume = currentVolume;

  // ---------------------------------------------------------------------------
  // 3. DOM Elements
  // ---------------------------------------------------------------------------
  const playerCard = document.querySelector('.player-card');
  const trackCover = document.getElementById('trackCover');
  const trackTitle = document.getElementById('trackTitle');
  const trackArtist = document.getElementById('trackArtist');
  const favoriteBtn = document.getElementById('favoriteBtn');

  // Featured Section
  const featuredCover = document.getElementById('featuredCover');
  const featuredTitle = document.getElementById('featuredTitle');
  const featuredArtist = document.getElementById('featuredArtist');
  const featuredGenre = document.getElementById('featuredGenre');
  const featuredDuration = document.getElementById('featuredDuration');
  const featuredPlayBtn = document.getElementById('featuredPlayBtn');
  const featuredPlayActionBtn = document.getElementById('featuredPlayActionBtn');

  // Progress Bar & Times
  const progressBarContainer = document.getElementById('progressBarContainer');
  const progressBar = document.getElementById('progressBar');
  const progressFill = document.getElementById('progressFill');
  const bufferedBar = document.getElementById('bufferedBar');
  const currentTimeEl = document.getElementById('currentTime');
  const totalDurationEl = document.getElementById('totalDuration');
  const seekTooltip = document.getElementById('seekTooltip');

  // Main Playback Controls
  const playPauseBtn = document.getElementById('playPauseBtn');
  const playIcon = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const shuffleBtn = document.getElementById('shuffleBtn');
  const repeatBtn = document.getElementById('repeatBtn');
  const repeatBadge = document.getElementById('repeatBadge');

  // Speed & Volume
  const speedBtn = document.getElementById('speedBtn');
  const speedDisplay = document.getElementById('speedDisplay');
  const speedMenu = document.getElementById('speedMenu');
  const speedOptions = document.querySelectorAll('.speed-option');
  const muteBtn = document.getElementById('muteBtn');
  const volHighIcon = document.getElementById('volHighIcon');
  const volLowIcon = document.getElementById('volLowIcon');
  const volMuteIcon = document.getElementById('volMuteIcon');
  const volumeSlider = document.getElementById('volumeSlider');
  const volumeFill = document.getElementById('volumeFill');
  const volumePercent = document.getElementById('volumePercent');

  // Playlist Elements
  const playlistEl = document.getElementById('playlist');
  const playlistSearch = document.getElementById('playlistSearch');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const playlistEmpty = document.getElementById('playlistEmpty');
  const trackCountBadge = document.getElementById('trackCount');
  const audioEngineStatus = document.getElementById('audioEngineStatus');

  // Modals & Toasts
  const shortcutsBtn = document.getElementById('shortcutsBtn');
  const shortcutsModal = document.getElementById('shortcutsModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const toastContainer = document.getElementById('toastContainer');

  // Visualizer Canvas
  const canvas = document.getElementById('visualizerCanvas');
  const ctx = canvas.getContext('2d');

  // ---------------------------------------------------------------------------
  // 4. In-Memory Synthesized Audio Engine (High-Fidelity Offline / Fallback WAV Generator)
  // ---------------------------------------------------------------------------
  // This ensures 100% playable audio instantly without CORS or missing file errors,
  // while allowing real MP3 audio files to be loaded if present!
  const audioBlobCache = new Map();

  function generateTrackWavBlob(songData) {
    if (audioBlobCache.has(songData.id)) {
      return audioBlobCache.get(songData.id);
    }

    const sampleRate = 22050; // High quality compact sample rate
    const duration = 60; // 60s rich looping musical movement
    const numSamples = sampleRate * duration;
    const buffer = new ArrayBuffer(44 + numSamples * 2);
    const view = new DataView(buffer);

    // RIFF Header
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + numSamples * 2, true);
    writeString(view, 8, 'WAVE');

    // fmt subchunk
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM
    view.setUint16(22, 1, true); // Mono
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);

    // data subchunk
    writeString(view, 36, 'data');
    view.setUint32(40, numSamples * 2, true);

    const beatLength = 60.0 / songData.bpm;
    const chordFreqs = songData.chords;
    const melodyNotes = songData.melody;

    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      const beat = t / beatLength;

      // Chord Pad
      const chordIdx = Math.floor(beat / 4) % chordFreqs.length;
      const baseFreq = chordFreqs[chordIdx];
      const pad = (
        Math.sin(2 * Math.PI * baseFreq * t) * 0.22 +
        Math.sin(2 * Math.PI * baseFreq * 1.5 * t) * 0.12 +
        Math.sin(2 * Math.PI * baseFreq * 1.25 * t) * 0.10 +
        Math.sin(2 * Math.PI * baseFreq * 0.5 * t) * 0.20
      );

      // Melody
      const melodyIdx = Math.floor(beat * 2) % melodyNotes.length;
      const melodyFreq = melodyNotes[melodyIdx];
      const melodyPhase = (beat * 2) % 1;
      const melodyEnv = Math.exp(-3.5 * melodyPhase);
      const melody = Math.sin(2 * Math.PI * melodyFreq * t) * melodyEnv * 0.32;

      // Soft LFO chorus
      const lfo = Math.sin(2 * Math.PI * 0.25 * t);
      let sample = (pad + melody) * (0.8 + 0.2 * lfo);

      // Fade In & Out
      if (t < 1.0) sample *= t;
      else if (t > duration - 1.5) sample *= Math.max(0, (duration - t) / 1.5);

      // Clamp to 16-bit PCM
      sample = Math.max(-1, Math.min(1, sample));
      view.setInt16(44 + i * 2, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
    }

    const blob = new Blob([buffer], { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);
    audioBlobCache.set(songData.id, url);
    return url;
  }

  function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  // ---------------------------------------------------------------------------
  // 5. Core Player Functions
  // ---------------------------------------------------------------------------

  /**
   * Load and prepare a track for playback
   */
  function loadSong(index, shouldPlay = false) {
    if (index < 0 || index >= songs.length) index = 0;
    currentIndex = index;
    const song = songs[currentIndex];

    // Update UI elements
    trackTitle.textContent = song.title;
    trackArtist.textContent = song.artist;
    trackCover.src = song.cover;
    trackCover.alt = `${song.title} - ${song.artist}`;
    totalDurationEl.textContent = song.duration;
    currentTimeEl.textContent = '0:00';
    progressBar.value = 0;
    progressFill.style.width = '0%';
    bufferedBar.style.width = '0%';

    // Update Favorite state
    if (favorites.has(song.id)) {
      favoriteBtn.classList.add('active');
    } else {
      favoriteBtn.classList.remove('active');
    }

    // Attempt to load the track file, fallback smoothly if needed
    audio.src = song.src;
    audio.playbackRate = currentSpeed;

    // Reset visualizer & player classes
    playerCard.classList.remove('is-playing', 'is-paused');

    updatePlaylistActiveState();

    if (shouldPlay) {
      playSong();
    }
  }

  /**
   * Play the current track
   */
  function playSong() {
    isPlaying = true;
    audioEngineStatus.textContent = 'Playing: ' + songs[currentIndex].title;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          updatePlayPauseUI(true);
        })
        .catch((err) => {
          console.warn('Audio play fallback triggered:', err);
          // If local audio/ file failed to load, seamlessly load synthesized rich audio blob!
          if (!audio.src.startsWith('blob:')) {
            const fallbackUrl = generateTrackWavBlob(songs[currentIndex]);
            audio.src = fallbackUrl;
            audio.play().then(() => {
              updatePlayPauseUI(true);
              showToast(`Playing "${songs[currentIndex].title}" (Synthesized Engine)`, 'success');
            }).catch(e => {
              showToast(`Playback prevented: ${e.message}`, 'error');
            });
          }
        });
    }
  }

  /**
   * Pause the current track
   */
  function pauseSong() {
    isPlaying = false;
    audio.pause();
    updatePlayPauseUI(false);
    audioEngineStatus.textContent = 'Playback Paused';
  }

  /**
   * Toggle between play and pause
   */
  function togglePlayPause() {
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  }

  /**
   * Play the next track
   */
  function nextSong() {
    if (isShuffle) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * songs.length);
      } while (randomIndex === currentIndex && songs.length > 1);
      currentIndex = randomIndex;
    } else {
      currentIndex++;
      if (currentIndex >= songs.length) {
        currentIndex = 0; // Loop back to start
      }
    }
    loadSong(currentIndex, true);
    showToast(`Now Playing: ${songs[currentIndex].title}`);
  }

  /**
   * Play the previous track
   */
  function prevSong() {
    // If more than 3 seconds in, restart the track
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      playSong();
      return;
    }

    if (isShuffle) {
      currentIndex = Math.floor(Math.random() * songs.length);
    } else {
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = songs.length - 1; // Loop to end
      }
    }
    loadSong(currentIndex, true);
    showToast(`Now Playing: ${songs[currentIndex].title}`);
  }

  /**
   * Update Play/Pause Button and Animation States
   */
  function updatePlayPauseUI(playing) {
    if (playing) {
      playIcon.classList.add('hidden');
      pauseIcon.classList.remove('hidden');
      playerCard.classList.remove('is-paused');
      playerCard.classList.add('is-playing');
    } else {
      playIcon.classList.remove('hidden');
      pauseIcon.classList.add('hidden');
      playerCard.classList.remove('is-playing');
      playerCard.classList.add('is-paused');
    }
  }

  // ---------------------------------------------------------------------------
  // 6. Audio Event Listeners (HTML5 Audio API)
  // ---------------------------------------------------------------------------

  // When metadata (duration, etc.) is loaded
  audio.addEventListener('loadedmetadata', () => {
    if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
      totalDurationEl.textContent = formatTime(audio.duration);
    } else {
      totalDurationEl.textContent = songs[currentIndex].duration;
    }
  });

  // Continuous playback progress update
  audio.addEventListener('timeupdate', () => {
    if (isSeeking) return;

    const current = audio.currentTime;
    const duration = (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration))
      ? audio.duration
      : songs[currentIndex].durationSec;

    currentTimeEl.textContent = formatTime(current);

    if (duration > 0) {
      const progressPercent = (current / duration) * 100;
      progressBar.value = progressPercent;
      progressFill.style.width = `${progressPercent}%`;
    }

    // Update buffered progress
    if (audio.buffered.length > 0) {
      try {
        const bufferedEnd = audio.buffered.end(audio.buffered.length - 1);
        const bufferedPercent = (bufferedEnd / duration) * 100;
        bufferedBar.style.width = `${Math.min(100, bufferedPercent)}%`;
      } catch (e) {
        bufferedBar.style.width = '100%';
      }
    }
  });

  // Autoplay feature & Song End handling
  audio.addEventListener('ended', () => {
    if (repeatMode === 'one') {
      audio.currentTime = 0;
      playSong();
      showToast(`Repeating: ${songs[currentIndex].title}`);
    } else if (repeatMode === 'all') {
      nextSong();
    } else if (repeatMode === 'none') {
      if (currentIndex < songs.length - 1) {
        nextSong();
      } else {
        pauseSong();
        audio.currentTime = 0;
        progressBar.value = 0;
        progressFill.style.width = '0%';
        currentTimeEl.textContent = '0:00';
      }
    }
  });

  // Play and Pause events from system or media keys
  audio.addEventListener('play', () => updatePlayPauseUI(true));
  audio.addEventListener('pause', () => updatePlayPauseUI(false));

  // Audio Error Handling: seamless fallback to synthesis
  audio.addEventListener('error', (e) => {
    console.warn('Audio element error, using synthesizer fallback:', e);
    const fallbackUrl = generateTrackWavBlob(songs[currentIndex]);
    audio.src = fallbackUrl;
    if (isPlaying) {
      audio.play().then(() => {
        updatePlayPauseUI(true);
      }).catch(err => console.log(err));
    }
  });

  // ---------------------------------------------------------------------------
  // 7. Progress Bar & Seek Functionality
  // ---------------------------------------------------------------------------

  // Seeking via range input (drag or click)
  progressBar.addEventListener('input', (e) => {
    isSeeking = true;
    const seekPercent = parseFloat(e.target.value);
    progressFill.style.width = `${seekPercent}%`;
    
    const duration = (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration))
      ? audio.duration
      : songs[currentIndex].durationSec;
    
    const seekTime = (seekPercent / 100) * duration;
    currentTimeEl.textContent = formatTime(seekTime);
  });

  progressBar.addEventListener('change', (e) => {
    const seekPercent = parseFloat(e.target.value);
    const duration = (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration))
      ? audio.duration
      : songs[currentIndex].durationSec;
    
    audio.currentTime = (seekPercent / 100) * duration;
    isSeeking = false;
  });

  // Hover Tooltip on Progress Bar
  progressBarContainer.addEventListener('mousemove', (e) => {
    const rect = progressBarContainer.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const duration = (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration))
      ? audio.duration
      : songs[currentIndex].durationSec;
    
    const hoverTime = pos * duration;
    seekTooltip.textContent = formatTime(hoverTime);
    seekTooltip.style.left = `${pos * 100}%`;
  });

  // ---------------------------------------------------------------------------
  // 8. Volume Controls & Mute
  // ---------------------------------------------------------------------------

  function setVolume(val) {
    val = Math.max(0, Math.min(1, val));
    currentVolume = val;
    audio.volume = currentVolume;
    volumeSlider.value = Math.round(val * 100);
    volumeFill.style.width = `${val * 100}%`;
    volumePercent.textContent = `${Math.round(val * 100)}%`;

    if (val === 0) {
      isMuted = true;
      showMuteIcon('mute');
    } else if (val < 0.5) {
      isMuted = false;
      showMuteIcon('low');
    } else {
      isMuted = false;
      showMuteIcon('high');
    }
  }

  function showMuteIcon(type) {
    volHighIcon.classList.add('hidden');
    volLowIcon.classList.add('hidden');
    volMuteIcon.classList.add('hidden');

    if (type === 'mute') {
      volMuteIcon.classList.remove('hidden');
    } else if (type === 'low') {
      volLowIcon.classList.remove('hidden');
    } else {
      volHighIcon.classList.remove('hidden');
    }
  }

  function toggleMute() {
    if (isMuted || currentVolume === 0) {
      // Unmute: restore previous non-zero volume
      const restoreVol = previousVolume > 0 ? previousVolume : 0.8;
      setVolume(restoreVol);
      showToast(`Volume Unmuted (${Math.round(restoreVol * 100)}%)`);
    } else {
      // Mute: save current volume and set to 0
      previousVolume = currentVolume;
      setVolume(0);
      showToast('Audio Muted');
    }
  }

  volumeSlider.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value) / 100;
    setVolume(val);
  });

  muteBtn.addEventListener('click', toggleMute);

  // ---------------------------------------------------------------------------
  // 9. Shuffle, Repeat & Speed Controls
  // ---------------------------------------------------------------------------

  // Shuffle Toggle
  shuffleBtn.addEventListener('click', () => {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('active', isShuffle);
    showToast(isShuffle ? 'Shuffle Enabled' : 'Shuffle Disabled');
  });

  // Repeat Mode Cycle (All -> One -> None -> All)
  repeatBtn.addEventListener('click', () => {
    if (repeatMode === 'all') {
      repeatMode = 'one';
      repeatBtn.classList.add('active');
      repeatBadge.classList.remove('hidden');
      showToast('Repeat Current Song');
    } else if (repeatMode === 'one') {
      repeatMode = 'none';
      repeatBtn.classList.remove('active');
      repeatBadge.classList.add('hidden');
      showToast('Repeat Off');
    } else {
      repeatMode = 'all';
      repeatBtn.classList.add('active');
      repeatBadge.classList.add('hidden');
      showToast('Repeat Playlist Queue');
    }
  });

  // Playback Speed Menu
  speedBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    speedMenu.classList.toggle('hidden');
  });

  speedOptions.forEach((option) => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      const speed = parseFloat(option.getAttribute('data-speed'));
      currentSpeed = speed;
      audio.playbackRate = speed;
      speedDisplay.textContent = `${speed.toFixed(speed === 1 || speed === 2 ? 1 : 2)}x`;

      speedOptions.forEach((opt) => opt.classList.remove('active'));
      option.classList.add('active');
      speedMenu.classList.add('hidden');
      showToast(`Playback Speed: ${speed}x`);
    });
  });

  document.addEventListener('click', () => {
    speedMenu.classList.add('hidden');
  });

  // Favorite / Like Button
  favoriteBtn.addEventListener('click', () => {
    const song = songs[currentIndex];
    if (favorites.has(song.id)) {
      favorites.delete(song.id);
      favoriteBtn.classList.remove('active');
      showToast(`Removed from Favorites`);
    } else {
      favorites.add(song.id);
      favoriteBtn.classList.add('active');
      showToast(`Added "${song.title}" to Favorites!`, 'success');
    }
  });

  // ---------------------------------------------------------------------------
  // 10. Featured Song Section
  // ---------------------------------------------------------------------------
  function initFeaturedSong() {
    const featuredTrack = songs.find((s) => s.featured) || songs[0];
    featuredCover.src = featuredTrack.cover;
    featuredCover.alt = `${featuredTrack.title} Album Art`;
    featuredTitle.textContent = featuredTrack.title;
    featuredArtist.textContent = featuredTrack.artist;
    featuredGenre.textContent = featuredTrack.genre;
    featuredDuration.textContent = featuredTrack.duration;

    const playFeatured = () => {
      const idx = songs.findIndex((s) => s.id === featuredTrack.id);
      if (idx !== -1) {
        loadSong(idx, true);
        showToast(`Playing Featured Track: ${featuredTrack.title}`, 'success');
      }
    };

    featuredPlayBtn.addEventListener('click', playFeatured);
    featuredPlayActionBtn.addEventListener('click', playFeatured);
  }

  // ---------------------------------------------------------------------------
  // 11. Playlist Rendering & Filtering
  // ---------------------------------------------------------------------------
  function renderPlaylist() {
    playlistEl.innerHTML = '';

    const filtered = songs.filter((s) => {
      const q = searchQuery.toLowerCase().trim();
      return (
        s.title.toLowerCase().includes(q) ||
        s.artist.toLowerCase().includes(q) ||
        s.album.toLowerCase().includes(q)
      );
    });

    if (filtered.length === 0) {
      playlistEmpty.classList.remove('hidden');
    } else {
      playlistEmpty.classList.add('hidden');
    }

    trackCountBadge.textContent = `${filtered.length} Track${filtered.length === 1 ? '' : 's'}`;

    filtered.forEach((song) => {
      const actualIndex = songs.findIndex((s) => s.id === song.id);
      const isActive = actualIndex === currentIndex;

      const item = document.createElement('div');
      item.className = `playlist-item ${isActive ? 'active' : ''}`;
      item.setAttribute('role', 'listitem');
      item.setAttribute('data-index', actualIndex);

      item.innerHTML = `
        <span class="item-index">${String(actualIndex + 1).padStart(2, '0')}</span>
        <div class="item-playing-icon" aria-label="Now Playing">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="item-thumb-wrapper">
          <img src="${song.cover}" alt="${song.title}" class="item-thumb" loading="lazy">
        </div>
        <div class="item-details">
          <h4 class="item-title">${song.title}</h4>
          <p class="item-artist">${song.artist}</p>
        </div>
        <span class="item-duration">${song.duration}</span>
      `;

      item.addEventListener('click', () => {
        loadSong(actualIndex, true);
      });

      playlistEl.appendChild(item);
    });
  }

  function updatePlaylistActiveState() {
    const items = playlistEl.querySelectorAll('.playlist-item');
    items.forEach((item) => {
      const idx = parseInt(item.getAttribute('data-index'), 10);
      if (idx === currentIndex) {
        item.classList.add('active');
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        item.classList.remove('active');
      }
    });
  }

  // Playlist Search Filter
  playlistSearch.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    clearSearchBtn.classList.toggle('hidden', searchQuery.length === 0);
    renderPlaylist();
  });

  clearSearchBtn.addEventListener('click', () => {
    playlistSearch.value = '';
    searchQuery = '';
    clearSearchBtn.classList.add('hidden');
    renderPlaylist();
  });

  // ---------------------------------------------------------------------------
  // 12. Audio Visualizer (Smooth frequency wave simulation on HTML5 Canvas)
  // ---------------------------------------------------------------------------
  let animFrameId;
  const numBars = 36;
  const barHeights = new Array(numBars).fill(4);

  function drawVisualizer() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / numBars) - 2;

    for (let i = 0; i < numBars; i++) {
      if (isPlaying) {
        // Dynamic undulating wave pattern reacting to rhythm
        const time = Date.now() / 150;
        const target = Math.sin(time + i * 0.4) * 16 + Math.cos(time * 0.7 + i * 0.2) * 12 + 18;
        barHeights[i] += (Math.max(4, target) - barHeights[i]) * 0.25;
      } else {
        // Idle gentle pulse
        barHeights[i] += (3 - barHeights[i]) * 0.1;
      }

      const x = i * (barWidth + 2);
      const h = barHeights[i];
      const y = canvas.height - h;

      // Gradient color from Cyan to Violet to Pink
      const grad = ctx.createLinearGradient(0, canvas.height, 0, 0);
      grad.addColorStop(0, '#06b6d4');
      grad.addColorStop(0.5, '#6366f1');
      grad.addColorStop(1, '#ec4899');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, h, [3, 3, 0, 0]);
      ctx.fill();
    }

    animFrameId = requestAnimationFrame(drawVisualizer);
  }

  // ---------------------------------------------------------------------------
  // 13. Toast Notification Helper
  // ---------------------------------------------------------------------------
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'toast-error' : type === 'success' ? 'toast-success' : ''}`;

    let iconSvg = `
      <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>`;

    if (type === 'success') {
      iconSvg = `
        <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>`;
    } else if (type === 'error') {
      iconSvg = `
        <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>`;
    }

    toast.innerHTML = `${iconSvg}<span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastOut 0.3s forwards cubic-bezier(0.4, 0, 0.2, 1)';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  // ---------------------------------------------------------------------------
  // 14. Keyboard Shortcuts
  // ---------------------------------------------------------------------------
  document.addEventListener('keydown', (e) => {
    // Ignore when typing inside search inputs
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch (e.code) {
      case 'Space':
        e.preventDefault();
        togglePlayPause();
        break;
      case 'ArrowRight':
        e.preventDefault();
        audio.currentTime = Math.min(audio.duration || songs[currentIndex].durationSec, audio.currentTime + 5);
        showToast('Seeked +5s');
        break;
      case 'ArrowLeft':
        e.preventDefault();
        audio.currentTime = Math.max(0, audio.currentTime - 5);
        showToast('Seeked -5s');
        break;
      case 'ArrowUp':
        e.preventDefault();
        setVolume(Math.min(1, currentVolume + 0.1));
        break;
      case 'ArrowDown':
        e.preventDefault();
        setVolume(Math.max(0, currentVolume - 0.1));
        break;
      case 'KeyM':
        e.preventDefault();
        toggleMute();
        break;
      case 'KeyN':
        e.preventDefault();
        nextSong();
        break;
      case 'KeyP':
        e.preventDefault();
        prevSong();
        break;
      case 'KeyL':
        e.preventDefault();
        repeatBtn.click();
        break;
      case 'KeyS':
        e.preventDefault();
        shuffleBtn.click();
        break;
      case 'Escape':
        shortcutsModal.classList.add('hidden');
        break;
      default:
        break;
    }
  });

  // Modal Controls
  shortcutsBtn.addEventListener('click', () => {
    shortcutsModal.classList.remove('hidden');
  });

  closeModalBtn.addEventListener('click', () => {
    shortcutsModal.classList.add('hidden');
  });

  shortcutsModal.addEventListener('click', (e) => {
    if (e.target === shortcutsModal) {
      shortcutsModal.classList.add('hidden');
    }
  });

  // ---------------------------------------------------------------------------
  // 15. Helper Utilities
  // ---------------------------------------------------------------------------
  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  }

  // ---------------------------------------------------------------------------
  // 16. Button Event Listeners Initialization
  // ---------------------------------------------------------------------------
  playPauseBtn.addEventListener('click', togglePlayPause);
  nextBtn.addEventListener('click', nextSong);
  prevBtn.addEventListener('click', prevSong);

  // Initialize Application
  function init() {
    setVolume(0.8);
    initFeaturedSong();
    renderPlaylist();
    loadSong(0, false);
    drawVisualizer();
    console.log('AuraSound Music Player initialized successfully.');
  }

  // Boot on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
