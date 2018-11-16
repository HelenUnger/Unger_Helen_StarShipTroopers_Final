(() => {
//do not remove
$(document).foundation()
//VARIABLES
const vidPlayer = document.querySelector('video'),
  rewind = document.querySelector('.rewind'),
  playPause = document.querySelector('.play-pause'),
  bigPlay = document.querySelector('.main-play'),
  forward = document.querySelector('.forward'),
  mute = document.querySelector('.mute'),
  time = document.querySelector('.timer');

//FUNCTIONS
function togglePlay(){
  var playSVG = playPause.firstElementChild;
  //flip this according to its viseo state
  //if playing make it pause, change the icon
  //if paused make it play, change the icon
  if (vidPlayer.paused){
    playSVG.dataset.icon = "pause";
    bigPlay.classList.add('play-hide');
    vidPlayer.play();
  } else {
    playSVG.dataset.icon = "play";
    bigPlay.classList.remove('play-hide');
    vidPlayer.pause();
  }
}

function ffWd() {
  vidPlayer.currentTime = vidPlayer.currentTime + 15;
}

function reWd() {
  vidPlayer.currentTime = vidPlayer.currentTime - 15;
}

function toggleMute(){
  var theSVG = this.firstElementChild;

  if (vidPlayer.muted==true){
    theSVG.dataset.icon = "volume-up";
    vidPlayer.muted = false;
  } else {
    theSVG.dataset.icon = "volume-off";
    vidPlayer.muted = true;
  }
}

function updateTime(){
  var mins = Math.floor(vidPlayer.currentTime/60),
  sec = Math.floor(vidPlayer.currentTime % 60);
  time.textContent = mins +':'+ sec;
}

//EVENT LISTENERS
vidPlayer.addEventListener('timeupdate', updateTime, false);
vidPlayer.addEventListener('click', togglePlay);
playPause.addEventListener('click', togglePlay);
bigPlay.addEventListener('click', togglePlay);
forward.addEventListener('click', ffWd);
rewind.addEventListener('click', reWd);
mute.addEventListener('click', toggleMute);
})();
