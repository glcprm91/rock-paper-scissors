let playerScore, comScore, gamePlaying, game;

let choices = ["scissors", "rock", "paper"];

init();

document
  .querySelectorAll(".button-choose")
  .forEach(choose => choose.addEventListener("click", startGame));

/// TBD --> *functions should do 1 thing* ///
function startGame(choose) {
  let playerChoose = String(...choose.target.classList);
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

    // 4. Display Com hand
    var image = document.querySelector(".com-hand");
    image.src = comHand + ".png";

    // 5. Update results
    player.classList.add("active");
    com.classList.add("active");

    if (playerChoose === "scissors" && comHand === "paper") {
      playerScore++;
      updateResult(player, com); //PLAYER WON
      checkGameWinner(playerScore, comScore);
    } else if (playerChoose === "scissors" && comHand === "rock") {
      comScore++;
      updateResult(com, player); //COM WON
      checkGameWinner(playerScore, comScore);
    } else if (playerChoose === "rock" && comHand === "paper") {
      comScore++;
      updateResult(com, player); //COM WON
      checkGameWinner(playerScore, comScore);
    } else if (playerChoose === "rock" && comHand === "scissors") {
      playerScore++;
      updateResult(player, com); //PLAYER WON
      checkGameWinner(playerScore, comScore);
    } else if (playerChoose === "paper" && comHand === "rock") {
      playerScore++;
      updateResult(player, com); //PLAYER WON
      checkGameWinner(playerScore, comScore);
    } else if (playerChoose === "paper" && comHand === "scissors") {
      playerScore++;
      updateResult(com, player); //PLAYER WON
      checkGameWinner(playerScore, comScore);
    } else {
      //DRAW
      player.classList.add("ion-android-remove");
      com.classList.add("ion-android-remove");
      checkGameWinner(playerScore, comScore);
    }
  }
}

function checkGameWinner(playerScore, comScore) {
  let playerPanel = document.querySelector(".player-0-panel");
  let comPanel = document.querySelector(".player-1-panel");

  if (playerScore === 3) {
    playerPanel.classList.add("winner");
    document.querySelector("#name-0").textContent = "Winner!";
    gamePlaying = false;
  } else if (comScore === 3) {
    comPanel.classList.add("winner");
    document.querySelector("#name-1").textContent = "Winner!";
    gamePlaying = false;
  } else if (game === 5) {
    if (playerScore > comScore) {
      playerPanel.classList.add("winner");
      document.querySelector("#name-0").textContent = "Winner!";
      gamePlaying = false;
    } else if (playerScore < comScore) {
      comPanel.classList.add("winner");
      document.querySelector("#name-1").textContent = "Winner!";
      gamePlaying = false;
    } else if (playerScore === comScore) {
      document.querySelector("#name-1").textContent = "Draw!";
      document.querySelector("#name-0").textContent = "Draw!";
      gamePlaying = false;
    }
  }
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  playerScore = 0;
  comScore = 0;
  game = 0;
  gamePlaying = true;

  document.getElementById("name-0").textContent = "Player"; //RESET FOR WINNER TEXT
  document.getElementById("name-1").textContent = "COM"; //RESET FOR WINNER TEXT
  document.querySelector(".player-hand").src = "rock.png"; //DISPLAY ROCK AS DEFAULT
  document.querySelector(".com-hand").src = "rock.png"; //DISPLAY ROCK AS DEFAULT

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

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
