const options = ["Rock", "Paper", "Scissors"];

let playerScore = 0;
let computerScore = 0;
let winningScore = 3;

function getRandomComputerResult() {
  return options[Math.floor(Math.random() * options.length)];
}

function hasPlayerWonTheRound(player, computer) {
  return (
    (player === "Rock" && computer === "Scissors") ||
    (player === "Scissors" && computer === "Paper") ||
    (player === "Paper" && computer === "Rock")
  );
}

function getRoundResults(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return `It's a tie! Both chose ${playerChoice}`;
  }

  if (hasPlayerWonTheRound(playerChoice, computerChoice)) {
    playerScore++;
    return `Player wins! ${playerChoice} beats ${computerChoice}`;
  }

  computerScore++;
  return `Computer wins! ${computerChoice} beats ${playerChoice}`;
}

// DOM
const playerScoreSpanElement = document.getElementById("player-score");
const computerScoreSpanElement = document.getElementById("computer-score");
const roundResultsMsg = document.getElementById("results-msg");
const winnerMsgElement = document.getElementById("winner-msg");
const optionsContainer = document.querySelector(".options-container");
const resetGameBtn = document.getElementById("reset-game-btn");
const roundsSelect = document.getElementById("rounds");

// UPDATE GAME
function showResults(userOption) {
  const computerResult = getRandomComputerResult();
  const result = getRoundResults(userOption, computerResult);

  roundResultsMsg.textContent = result;
  playerScoreSpanElement.textContent = playerScore;
  computerScoreSpanElement.textContent = computerScore;

  roundResultsMsg.classList.remove("win", "lose", "tie");

  if (result.includes("Player wins")) {
    roundResultsMsg.classList.add("win");
  } else if (result.includes("Computer wins")) {
    roundResultsMsg.classList.add("lose");
  } else {
    roundResultsMsg.classList.add("tie");
  }

  if (playerScore === winningScore || computerScore === winningScore) {
    winnerMsgElement.textContent =
      playerScore === winningScore
        ? "Player has won the game!"
        : "Computer has won the game!";

    resetGameBtn.style.display = "block";
    optionsContainer.style.display = "none";
  }
}

// RESET
function resetGame() {
  playerScore = 0;
  computerScore = 0;

  playerScoreSpanElement.textContent = 0;
  computerScoreSpanElement.textContent = 0;

  roundResultsMsg.textContent = "";
  winnerMsgElement.textContent = "";

  resetGameBtn.style.display = "none";
  optionsContainer.style.display = "block";
}

// CHANGE WIN CONDITION
roundsSelect.addEventListener("change", (e) => {
  winningScore = Number(e.target.value);
  resetGame();
});

// EVENTS
document.getElementById("rock-btn").addEventListener("click", () => {
  showResults("Rock");
});

document.getElementById("paper-btn").addEventListener("click", () => {
  showResults("Paper");
});

document.getElementById("scissors-btn").addEventListener("click", () => {
  showResults("Scissors");
});

resetGameBtn.addEventListener("click", resetGame);
