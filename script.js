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
const isPlaying = false;
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
  playBtn.classList.toggle("fa-play");
  playBtn.classList.toggle("fa-pause");
  playBtn.setAttribute("title", isPlaying ? "Pause" : "Play");
  music.play();
}

// Pause Song
function pauseSong() {
  playBtn.classList.toggle("fa-play");
  playBtn.classList.toggle("fa-pause");
  playBtn.setAttribute("title", isPlaying ? "Pause" : "Play");
  music.pause();
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.path[0].offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
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
    const durationSeconds = Math.floor(duration % 60)
      .toString()
      .padStart(2, "0");
    durationEl.textContent = `${durationMinutes}:${durationSeconds}`;

    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60)
      .toString()
      .padStart(2, "0");
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Initial Load
loadSong(songs[songIndex]);
