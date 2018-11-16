(() => {
  console.log('game js file loaded!');
  //variables
  const startScreen = document.querySelector('.start-screen'),
   holes = document.querySelectorAll('.hole'),
   scoreBoard = document.querySelectorAll('.score'),
   bugs = document.querySelectorAll('.bug'),
   bugShown = document.querySelector('.bugs-shown'),
   startButton = document.querySelector('.start-button'),
   restartButton = document.querySelector('.restart-button'),
   restartScreen = document.querySelector('.restart'),
   lvlButton = document.querySelector('.lvl-button'),
   lvlScreen = document.querySelector('.lvl-up'),
   winScreen = document.querySelector('.winner'),
   contButton = document.querySelector('.continue-button');

  var lastHole,
   timeUp = false,
   score = bugCounter,
   minTime = 1500,
   maxTime = 2000,
   timeleft = 10,
   bugCounter = 0,
   level = 0;

  function countDown() {
  var timer = setInterval(function(){
      timeleft--;
      document.getElementById("timer").textContent = timeleft;
      if(timeleft <= 0)
          clearInterval(timer);
      },1000);
  }

  function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
      return randomHole(holes);
    }
    lastHole = hole;
    return hole;
  }

  function peep() {
    const hole = randomHole(holes);
    var time = randomTime(minTime, maxTime);
    hole.classList.add('up');
    bugCounter++;
    // console.log(score, bugCounter);
    setTimeout(() => {
      hole.classList.remove('up');
      if (!timeUp) peep();

      if (timeUp == true){
        gameEnd();
      }
    }, time);
  }

  function gameEnd() {

    if ((score >= bugCounter) && (level >= 3)) {
      winScreen.classList.add('show-screen');
    }else {
      if (score >= bugCounter) {
        //level up, go faster
        lvlScreen.classList.add('show-screen');
      }else if (score < bugCounter) {
        //lose, try again
        scoreBoard.forEach(hitScore => hitScore.textContent = score);
        bugShown.textContent = bugCounter;
        minTime = 1500,
        maxTime = 2000,
        level = 0;
        restartScreen.classList.add('show-screen');
      }
    }
  }

  function lvlUp() {
    minTime = minTime - 500;
    init();
  }

  function init(){
    timeUp = false;
    timeleft = 10,
    bugCounter = 0;
    score = 0;
    scoreBoard.textContent = 0;
    startScreen.classList.add('hide-start');
    restartScreen.classList.remove('show-screen');
    lvlScreen.classList.remove('show-screen');
    winScreen.classList.remove('show-screen');
    startGame();
  }

  function startGame() {
    level++;
    document.getElementById("timer").textContent = '10';
    countDown();
    peep();
    setTimeout(() => timeUp = true, 10000);
  }

  function smush(e) {
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.forEach(hitScore => hitScore.textContent = score);
  }

  startButton.addEventListener('click', init);
  restartButton.addEventListener('click', init);
  lvlButton.addEventListener('click', lvlUp);
  contButton.addEventListener('click', lvlUp);
  bugs.forEach(bug => bug.addEventListener('click', smush));
})();
