
const dayMusic = document.getElementById('dayMusic');
const nightMusic = document.getElementById('nightMusic');
const rainSound = document.getElementById('rainSound');
const playBtn = document.getElementById('playBtn');
const nightBtn = document.getElementById('nightBtn');
const body = document.body;

let isPlaying = false;
let isNight = false;

dayMusic.volume = 0.6;
nightMusic.volume = 0.6;
rainSound.volume = 0.4;


function fadeAudio(audio, targetVolume, duration, onComplete) {
  const step = (targetVolume - audio.volume) / (duration / 50);
  const fade = setInterval(() => {
    audio.volume = Math.max(0, Math.min(1, audio.volume + step));
    if ((step > 0 && audio.volume >= targetVolume) ||
        (step < 0 && audio.volume <= targetVolume)) {
      clearInterval(fade);
      if (onComplete) onComplete();
    }
  }, 50);
}


function createSakura() {
  for (let i = 0; i < 25; i++) {
    const petal = document.createElement('div');
    petal.classList.add('sakura');
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.animationDuration = 5 + Math.random() * 5 + 's';
    petal.style.animationDelay = Math.random() * 5 + 's';
    petal.style.width = 10 + Math.random() * 10 + 'px';
    petal.style.height = 10 + Math.random() * 10 + 'px';
    petal.style.opacity = 0.6 + Math.random() * 0.4;
    document.body.appendChild(petal);
  }
}


function createRain() {
  for (let i = 0; i < 80; i++) {
    const drop = document.createElement('div');
    drop.classList.add('rain');
    drop.style.left = Math.random() * 100 + 'vw';
    drop.style.animationDuration = 0.8 + Math.random() * 0.8 + 's';
    drop.style.animationDelay = Math.random() * 2 + 's';
    drop.style.height = 10 + Math.random() * 10 + 'px';
    document.body.appendChild(drop);
  }
}

function clearEffects() {
  document.querySelectorAll('.sakura, .rain').forEach(el => el.remove());
}


playBtn.addEventListener('click', () => {
  if (isPlaying) {
    stopAllMusic();
    playBtn.textContent = 'Play Music 🎵';
    playBtn.classList.remove('playing');
  } else {
    startCurrentMusic();
    playBtn.textContent = 'Pause Music ⏸️';
    playBtn.classList.add('playing');
  }
  isPlaying = !isPlaying;
});

function startCurrentMusic() {
  if (isNight) {
    nightMusic.play().catch(() => {});
    rainSound.play().catch(() => {});
    fadeAudio(nightMusic, 0.6, 1000);
    fadeAudio(rainSound, 0.4, 1500);
  } else {
    dayMusic.play().catch(() => {});
    fadeAudio(dayMusic, 0.6, 1000);
  }
}

function stopAllMusic() {
  fadeAudio(dayMusic, 0, 800, () => dayMusic.pause());
  fadeAudio(nightMusic, 0, 800, () => nightMusic.pause());
  fadeAudio(rainSound, 0, 800, () => rainSound.pause());
}


nightBtn.addEventListener('click', () => {
  isNight = !isNight;
  body.classList.toggle('night', isNight);
  clearEffects();

  if (isNight) {
    createRain();
    nightBtn.textContent = '☀️';
    fadeAudio(dayMusic, 0, 800, () => dayMusic.pause());
    if (isPlaying) {
      nightMusic.currentTime = 0;
      rainSound.currentTime = 0;
      nightMusic.play().catch(() => {});
      rainSound.play().catch(() => {});
      fadeAudio(nightMusic, 0.6, 1000);
      fadeAudio(rainSound, 0.4, 1500);
    }
  } else {
    createSakura();
    nightBtn.textContent = '🌙';
    fadeAudio(nightMusic, 0, 800, () => nightMusic.pause());
    fadeAudio(rainSound, 0, 800, () => rainSound.pause());
    if (isPlaying) {
      dayMusic.currentTime = 0;
      dayMusic.play().catch(() => {});
      fadeAudio(dayMusic, 0.6, 1000);
    }
  }
});

createSakura();
