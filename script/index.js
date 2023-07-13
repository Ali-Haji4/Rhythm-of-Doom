//Key input states
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let spacePressed = false;

const inputs = [
  "arrowLeft",
  "arrowRight",
  "arrowUp",
  "arrowDown",
  "space",
  "arrowLeft",
  "arrowRight",
  "arrowUp",
  "arrowDown",
  "space",
];
const inputImages = [
  "arrowLeft.png",
  "arrowRight.png",
  "arrowUp.png",
  "arrowDown.png",
  "space.png",
];
const darkInputImages = [
  "arrowLeftDark.png",
  "arrowRightDark.png",
  "arrowUpDark.png",
  "arrowDownDark.png",
  "spaceDark.png",
];

//sounds
const damageAudio = new Audio("sounds/damage.wav");

//shuffle
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

//DAMAGE FLASH ON SCREEN

const damage = document.getElementById("doom-damage");

function doomTakeDamage() {
  damage.classList.add("do-damage");
  setTimeout(function () {
    damage.classList.remove("do-damage");
  }, 300);
}

function doomDealDamage() {
  $(".enemy-img").addClass("do-damage");
  setTimeout(function () {
    $(".enemy-img").removeClass("do-damage");
  }, 300);
}

// // Used like so
// var arr = [2, 11, 37, 42];
// shuffle(arr);
// console.log(arr);

//game information
let timer = 0;
let score = 0;
let scoreMultiplier = 1;
let mistakes = 0;
let streak = 0;
let bossButtonClicks = 0;
let keyPressNumber = 0;
let sequenceNumber = 0;
let streakActive = false;
let currentMonster = 1;
let victory = false;
let gameOver = false;

//Monster information
let monster1Name = "Gorlock The Destroyer";
let monster1Damage = 10;
let monster1Hp = 10;

let monster2Name = "Asmodean The Cruel";
let monster2Damage = 15;
let monster2Hp = 200;

//Player information
let playerDamage = 10;
let playerHP = 0;

document.addEventListener("keydown", keyDownHandler, false);
// document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(event) {
  if (gameOver == false) {
    if (event.keyCode === 39) {
      rightPressed = true;
      checkInput("arrowRight");
      console.log("user input: right");
    } else if (event.keyCode === 37) {
      leftPressed = true;
      checkInput("arrowLeft");
      console.log("user input: left");
    }
    if (event.keyCode === 40) {
      downPressed = true;
      checkInput("arrowDown");
      console.log("user input: down");
    } else if (event.keyCode === 38) {
      upPressed = true;
      checkInput("arrowUp");
      console.log("user input: up");
    } else if (event.keyCode === 32) {
      spacePressed = true;
      console.log("user input: space");
      checkInput("space");
    }
  }
}

function loseByTime() {
  console.log("you lost");
}

function loseByMistakes() {
  if (mistakes >= 4 && victory == false) {
    console.log("you lost by mistakes");
    $(".game-screen").hide();
    $(".game-over-onLoad").show();
    $("#final-number").text(sequenceNumber);
    $("#final-score").text(score);
    $("#final-streak").text(streak);
    $("#final-status").text("Defeat");
    mistakes = 0;
    gameOver = true;
  }
}

$(".load-screen").on("keydown", (event) => {
  console.log(`User pressed: ${event.key}`);
  console.log("hi");
  event.preventDefault();
  return false;
});

function countdown(duration) {
  var endTime = new Date().getTime() + duration * 1000; // Set the end time to 10 seconds from now

  var interval = setInterval(function () {
    var now = new Date().getTime(); // Get the current time
    var distance = endTime - now; // Calculate the remaining time

    var seconds = Math.floor((distance % (1000 * 60)) / 1000); // Calculate the seconds

    $("#timer").text(seconds);

    if (distance <= 0 && victory == false) {
      clearInterval(interval); // Stop the countdown when the time is up
      console.log("you lost by time");
      $(".game-screen").hide();
      $(".game-over-onLoad").show();
      $("#final-number").text(sequenceNumber);
      $("#final-score").text(score);
      $("#final-streak").text(streak);
      $("#final-status").text("Defeat");
      gameOver = true;
      return;
    }
  }, 1000); // Update the countdown every 1 second
}

function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? seconds : seconds;

    display.text(seconds);

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}

$(document).ready(function () {
  console.log("document loaded");
  (fiveMinutes = 3), (display = $("#loading"));
  startTimer(fiveMinutes, display);
  setTimeout(function () {
    console.log("Game started!");

    shuffle(inputs);
    console.log("Array:");
    console.log(inputs);
    $(".load-screen").toggle();
    $(".game-screen").toggle();
    let stringOfSequences = "";
    for (let index = 0; index < 7; index++) {
      stringOfSequences += `<img id="image-${index}" src="images/${inputs[index]}.png" alt="${inputs[index]}" class="arrow-img"/>`;
    }

    $(".sequence-images").html(stringOfSequences);
    $("#enemy-name").text(monster1Name);
    $("#enemy-hp").text(`${monster1Hp} HP`);
    countdown(40);
  }, 4000); // 5000 milliseconds = 5 seconds
});

function followingSequence() {
  console.log("Outer new");
  if (keyPressNumber === 7) {
    if (mistakes == 0) {
      streak += 1;
      scoreMultiplier += 0.1;
      streakActive = true;
    } else {
      scoreMultiplier = 1;
      streakActive = false;
    }
    score += 200 * scoreMultiplier;
    score = Math.round(score);
    console.log("Inner new");
    shuffle(inputs);
    console.log("Array:");
    console.log(inputs);
    let stringOfSequences = "";
    for (let index = 0; index < 7; index++) {
      stringOfSequences += `<img id="image-${index}" src="images/${inputs[index]}.png" alt="${inputs[index]}" class="arrow-img"/>`;
    }
    damageAudio.play();
    $(".sequence-images").html(stringOfSequences);
    $("#sequence-score").text(`Score: ${score}`);
    $("#sequence-number").text(`Sequence: ${(sequenceNumber += 1)}`);
    if (currentMonster == 1) {
      $("#enemy-hp").text(`${(monster1Hp -= playerDamage)} HP`);
    } else {
      $("#enemy-hp").text(`${(monster2Hp -= playerDamage)} HP`);
    }

    $(".damage-number").toggle();
    if (streakActive) {
      $("#sequence-streak").text(`Streak: ${streak}`);
    }
    keyPressNumber = 0;

    //CONDITION TO ENTER THE SECOND STAGE
    if (monster1Hp <= 0) {
      //RESET DATA
      console.log("Begin stage 2");
      currentMonster = 2;
      $("#enemy-name").text(monster2Name);
      $(".enemy-img").attr("src", "images/enemy2.png");
      $("#enemy-hp").text(`${monster2Hp} HP`);
      if (monster2Hp <= 170) {
        //THIS IS FOR LOSING
        // $(".game-over-onLoad").toggle();
        // $(".game-screen").toggle();

        //THIS IS FOR VICTORY
        $("#final-status").text("Victory");
        victory = true;
        gameOver = true;
        $(".game-victory-onLoad").toggle();
        $(".game-screen").toggle();
      }
    }
  }
}

function checkInput(key) {
  if (key == inputs[keyPressNumber]) {
    $(`#image-${keyPressNumber}`).attr(
      "src",
      `images/${inputs[keyPressNumber]}Dark.png`
    );
    console.log("--------------");
    console.log("correct");
    keyPressNumber++;
    console.log("key press number: " + keyPressNumber);
    console.log("--------------");
    followingSequence();
  } else {
    console.log("--------------");
    console.log("incorrect");
    console.log("correct key is: " + inputs[keyPressNumber]);
    console.log("key press number: " + keyPressNumber);
    loseByMistakes();
    mistakes++;
    doomTakeDamage();
    $("#sequence-mistakes").text(`Mistakes: ${mistakes}`);
    $("#sequence-streak").text(`Streak Ended`);
    console.log("--------------");
  }
}

$("#leaderboard-navigate-btn").on("click", function () {
  console.log("forwarded");
  $(".game-screen").hide();
  $(".game-over-onLoad").hide();
  $(".game-over-screen").show();
  $("#final-number").text(sequenceNumber);
  $("#final-score").text(score);
  $("#final-streak").text(streak);
  mistakes = 0;
});
$("#leaderboard-victory-navigate-btn").on("click", function () {
  console.log("forwarded");
  $(".game-screen").hide();
  $(".game-victory-onLoad").hide();
  $(".game-over-screen").show();
  $("#final-number").text(sequenceNumber);
  $("#final-score").text(score);
  $("#final-streak").text(streak);
  mistakes = 0;
});
