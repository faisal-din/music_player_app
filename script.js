let progress = document.getElementById('progress');
let song = document.getElementById('song');
let playBtn = document.getElementById('playBtn');
let prevBtn = document.getElementById('prevBtn');
let nextBtn = document.getElementById('nextBtn');
let songImg = document.getElementById('songImg');
let title = document.getElementById('title');
let artist = document.getElementById('artist');

//song titles
const songs = [
  {
    name: 'song-1',
    title: 'Despacito',
    artist: 'Luis Fonsi  Ft. Daddy Yankee ',
  },
  {
    name: 'song-2',
    title: 'Hum Koyan Dar Dar Firaya',
    artist: 'Abida Parveen',
  },
  {
    name: 'song-3',
    title: 'Wo Dil Kahan Se Laon',
    artist: 'Unknown',
  },
];

//keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

//Update song details
function loadSong(songs) {
  title.innerText = songs.title;
  artist.innerText = songs.artist;
  song.src = `music/${songs.name}.mp3`;
  songImg.src = `images/${songs.name}.png`;
}
loadSong(songs[0]);
song.onloadedmetadata = function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
};

// play song
function playSong() {
  song.play();
  playBtn.classList.replace('fa-play', 'fa-pause');
  // playBtn.classList.remove("fa-play");
  // playBtn.classList.add("fa-pause");
  songImg.classList.add('anime');
}

//Pause song
function pauseSong() {
  song.pause();
  playBtn.classList.replace('fa-pause', 'fa-play');
  // playBtn.classList.remove("fa-pause");
  // playBtn.classList.add("fa-play");
  songImg.classList.remove('anime');
}

//next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

//prev song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

//Event listner on play btn
playBtn.addEventListener('click', playPause);

function playPause() {
  const isPlaying = playBtn.classList.contains('fa-pause');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
}

// plays the progress bar with song controll
if (song.play) {
  setInterval(() => {
    progress.value = song.currentTime;
  }, 500);
}

// changes the song when you click on any place on progress bar
progress.onchange = function () {
  song.play();
  song.currentTime = progress.value;
  playBtn.classList.add('fa-pause');
  playBtn.classList.remove('fa-play');
};

// Change song events
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
