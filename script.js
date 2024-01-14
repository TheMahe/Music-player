// DOM Elements
const music = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const cover = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

// State
let isPlaying = false;
let songIndex = 0;

// Songs Data
const songs = [
  {
    displayName: "Electric Chill Machine",
    artist: "Jacinto",
    src: "./music/jacinto-1.mp3",
    cover: "./img/jacinto-1.jpg",
  },
  {
    displayName: "Electric Chill Machine 2",
    artist: "Jacinto",
    src: "./music/jacinto-2.mp3",
    cover: "./img/jacinto-2.jpg",
  },
  {
    displayName: "Electric Chill Machine 2",
    artist: "Jacinto",
    src: "./music/jacinto-3.mp3",
    cover: "./img/jacinto-3.jpg",
  },
];

function loadSong(song, isSameSong = false) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  cover.src = song.cover;

  if (!isSameSong) {
    music.src = song.src;
  }
}

playBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
  } else {
    loadSong(songs[songIndex], isPlaying);
    playSong();
  }
});

// Previous Song Event Listener
prevBtn.addEventListener("click", prevSong);

// Next Song Event Listener
nextBtn.addEventListener("click", nextSong);

// Music Ended Event Listener
music.addEventListener("ended", nextSong);

// Time Update Event Listener
music.addEventListener("timeupdate", updateProgressBar);

// Progress Container Click Event Listener
progressContainer.addEventListener("click", setProgressBar);

// Play Song
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

// Pause Song
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    durationEl.textContent = `${durationMinutes}:${durationSeconds}`;

    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Initial Load
loadSong(songs[songIndex]);
