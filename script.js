const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'

// 出現勝利的條件
const WINNING_COMBINATION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById('restartButton')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

// 遊戲開始
function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    // 只能點選一次=>再次點選不會觸發事件
    cell.addEventListener('click', handdleClick, { once: true})
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

// 點擊後觸發事件
function handdleClick(e) {
  // console.log('clicked')

  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS :　X_CLASS
  
  // place Mark 填上圈圈或叉叉
  placeMark(cell, currentClass)
  
  // 1.Check For Win O或X勝利
  if (checkWin(currentClass)) {
    // console.log('winner')
    endGame(false)
  
  // 2.Check For Draw 平手
  } else if (isDraw()){
    endGame(true)

  // 3.Swap Turns 圈圈填完換叉叉
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}
  
// 結束遊戲
function endGame(draw) {
  // 平手
  if(draw) {
    winningMessageTextElement.innerText = 'Draw!'
  
  // O或X勝利
  } else {
    // 出現 O's Wins! 或　X's Wins!
    winningMessageTextElement.innerText = `${circleTurn ? "O's" :　"X's"} Wins!`
  }
  winningMessageElement.classList.add('show')
}

function isDraw() {
  // 取
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || 
    cell.classList.contains(CIRCLE_CLASS)
  })
}

// place Mark 填上圈圈或叉叉
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

// Swap Turns 圈圈填完換叉叉
function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

// Check For Win 確認勝負
function checkWin(currentClass) {
  return WINNING_COMBINATION.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}