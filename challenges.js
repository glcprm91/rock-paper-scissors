// prettier-ignore-start
let gamePlaying, game;

let choices = ["scissors", "rock", "paper"];

init();

document.querySelector(".scissors").addEventListener("click", startGame);
document.querySelector(".rock").addEventListener("click", startGame);
document.querySelector(".paper").addEventListener("click", startGame);

function startGame(e) {
  let playerChoose = String(...e.target.classList);
  if (gamePlaying) {
    // 1. Progress game
    game++;
    let player = document.querySelector(".player-game-" + game);
    let com = document.querySelector(".com-game-" + game);

    // 2. Display Player hand
    var image = document.querySelector(".player-hand");
    image.src = playerChoose + ".png";

    // 3. Random Com choice
    let comChoose = Math.floor(Math.random() * 3);
    let comHand = choices[comChoose];
    console.log(comHand);

    // 4. Display Com hand
    var image = document.querySelector(".com-hand");
    image.src = comHand + ".png";

    // 5. Update results

    let playerGame = document.querySelector(".player-game-" + game);
    let comGame = document.querySelector(".com-game-" + game);
    playerGame.classList.add("active");
    comGame.classList.add("active");

    if (playerChoose === "scissors" && comHand === "paper") {
      updateResult(player, com); //PLAYER WON
    } else if (playerChoose === "scissors" && comHand === "rock") {
      updateResult(com, player); //COM WON
    } else if (playerChoose === "rock" && comHand === "paper") {
      updateResult(com, player); //COM WON
    } else if (playerChoose === "rock" && comHand === "scissors") {
      updateResult(player, com); //PLAYER WON
    } else if (playerChoose === "paper" && comHand === "rock") {
      updateResult(player, com); //PLAYER WON
    } else if (playerChoose === "paper" && comHand === "scissors") {
      updateResult(com, player); //PLAYER WON
    } else {
      //DRAW
      player.classList.add("ion-android-remove");
      com.classList.add("ion-android-remove");
    }
  }
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  game = 0;
  gamePlaying = true;

  document.getElementById("name-0").textContent = "Player"; //RESET FOR WINNER TEXT
  document.getElementById("name-1").textContent = "COM"; //RESET FOR WINNER TEXT
  document.querySelector(".player-hand").src = "rock.png"; //DISPLAY ROCK AS DEFAULT
  document.querySelector(".com-hand").src = "rock.png"; //DISPLAY ROCK AS DEFAULT

  //RESET SCORES
  for (let i = 1; i <= 5; i++) {
    let playerGame = document.querySelector(".player-game-" + i);
    let comGame = document.querySelector(".com-game-" + i);

    playerGame.classList.remove("active");
    comGame.classList.remove("active");

    playerGame.classList.remove("ion-checkmark");
    playerGame.classList.remove("ion-close");
    comGame.classList.remove("ion-checkmark");
    comGame.classList.remove("ion-close");
    playerGame.classList.add("ion-android-remove");
    comGame.classList.add("ion-android-remove");

    playerGame.classList.add("drawn-match");
    comGame.classList.add("drawn-match");
    playerGame.classList.remove("lost-match");
    comGame.classList.remove("lost-match");
    playerGame.classList.remove("won-match");
    comGame.classList.remove("won-match");
  }
  // let matches = document.querySelectorAll(".match");
  // matches.forEach(e => e.parentNode.removeChild(e));
}

function updateResult(winner, loser) {
  winner.classList.remove("ion-android-remove");
  loser.classList.remove("ion-android-remove");
  loser.classList.add("ion-close");
  winner.classList.add("ion-checkmark");

  winner.classList.remove("drawn-match");
  loser.classList.remove("drawn-match");
  winner.classList.add("won-match");
  loser.classList.add("lost-match");
}
