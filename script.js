let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  { name:"Kwaku The Traveller",
    artist: "Black Sherif",
    image : "https://trendybeatz.com/images/Black-Sherif-Kwaku-The-Traveller-Artwork.jpg",
    path: "https://www.emijoemedia.com/wp-content/uploads/2021/12/Chris_Brown_-_Under_the_influence.mp3"
  },
  {
    name: "Vision 2020",
    artist: "Bella Shmurda",
    image: "https://trendybeatz.com/images/Bella-Shmurda-Vision-2020.jpg",
    path: "https://cdn.trendybeatz.com/audio/Bella-Shmurda-Vision-2020-%5BTrendyBeatz.com%5D.mp3"
  },
  {
    name: "Under the Influence",
    artist: "Chris Brown",
    image: "https://emijoemedia.com/wp-content/uploads/2021/12/Chris-Brown-ft.-Davido-%E2%80%93-Lower-Body0A0A.jpg",
    path: "https://www.emijoemedia.com/wp-content/uploads/2021/12/Chris_Brown_-_Under_the_influence.mp3"
  },
  {
    name: "Buga Ft. Tekno",
    artist: "Kizz Daniel",
    image: "https://i2.wp.com/netxclusive.com/wp-content/uploads/2022/05/Kizz-Daniel-Buga.jpg?w=600&ssl=1",
    path: "https://netxclusive.com/wp-content/uploads/2022/05/Kizz_Daniel_Ft_Tekno_-_Buga_Netxclusive.com.mp3",
  },
  { name: "Only You",
    artist: "Bella Shmurda",
    image :"https://www.naijavibes.com/wp-content/uploads/2019/10/Bella-Shmurda-Only-You-Artwork.jpeg",
    path : "https://www.naijavibes.com/wp-content/uploads/2019/10/Bella-Shmurda-Only-You.mp3"
      
  }
];

function random_bg_color() {

  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

swal({
  title: "Important information?",
  text: "❌This coad some error. please load the full song and use play  it ❌,",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    swal("💞Created By @rkens💞💝", {
      icon: "success",
    });
  } else {
    swal("💞Created By @rkens💞💝");
  }
});


 
var a = " " +"   "+"  "+"    "+
"💝  Follow me  ‼️ \n"+"\n"+
"   "+"     "+ "  "+"🌟🌟  Cos it's yet to be unleashed . 💯💝"
alert(a+" \n  "+"  "+" \n"+"     "+"       "+"❌Created BY @rkens❌")