// const playSquares = document.querySelectorAll('.square')

// playSquares.forEach((square) => {
//   square.addEventListener("click", onClick)
// })

// function onClick(e) {
//   let id = e.target.id
//   document.getElementById(id).style.backgroundColor = 'blue';
// }

// function onClick(e) {
//   let id = e.target.id
//   let squareClicked = "false"
//   if (squareClicked = "false")
//     document.getElementById(id).style.backgroundColor = 'red';
// }

// const resetButton = document.querySelector('.resetButton')
// resetButton.forEach((square) => {
//   resetButton.addEventListener("click", reset)
// })
// function reset(e) {
//   square.removeEventListener("click", onClick)
// }



// Next Steps
// Change From Red to Blue
// Prevent Same box from being clicked again

const statusDisplay = document.querySelector(".game-message")

let gameActive = true;
let currentPlayer = "X"
let gameState = ["", "", "", "", "", "", "", ""]

const winningMessage = () => `Player ${currentPlayer} won!`
const drawMessage = () => "It's a tie!"
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn!`

// console.log(currentPlayerTurn())

statusDisplay.innerText = currentPlayerTurn()

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
]

function handleSquarePlayed(clickedSquare, i) {
  gameState[i] = currentPlayer
  clickedSquare.innerText = currentPlayer
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X"
  statusDisplay.innerText = currentPlayerTurn()
}

function handleResultValidation() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const winningCondition = winningConditions[i] // [0,1,2] on first iteration //
    let a = gameState[winningCondition[0]]
    let b = gameState[winningCondition[1]]
    let c = gameState[winningCondition[2]]

    if (a === "" || b === "" || c === "") {
      continue
    }

    if (a == b && b == c) {
      roundWon = true
      break
    }

    if (roundWon) {
      statusDisplay.innerText = winningMessage()
      gameActive = false
      return
    }

    let roundDraw = !gameState.includes("")
    if (roundDraw) {
      statusDisplay.innerText = drawMessage()
      gameActive = false;
      return
    }
  }

  handlePlayerChange()
}

function onClick(e) {
  const clickedSquare = e.target
  const index = parseInt(clickedSquare.dataset.index)

  if (gameState[index] !== "" || !gameActive) {
    return;
  }

  handleSquarePlayed(clickedSquare, index)
  handleResultValidation()
}

function handleReset() {
  gameActive = true
  currentPlayer = "X"
  gameState = ["", "", "", "", "", "", "", "", ""]
  statusDisplay.innerText = currentPlayerTurn()

  document.querySelectorAll(".square").forEach((square) => (square.innerText = ""))
}

document.querySelectorAll(".square")
  .forEach((square) => {
    square.addEventListener("click", onClick)
  })

document.querySelector(".game-reset").addEventListener("click", handleReset)




