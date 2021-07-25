const levelButtons = document.querySelector('.levels-buttons');
const startButton = document.querySelector('.header-button_start');
const minesCounter = document.querySelector('.minesweeper-header_counter span');
const gameTimer = document.querySelector('.minesweeper-header_timer span');
const gameBody = document.querySelector('.minesweeper-body');
 
let numberOfMines = 0;
let numberOfCells = 81;
let allCellsArray = [];

// Set up Mines amount to Game Level
levelButtons.addEventListener('click', (e) => {
  let level = e.target.id.split('').pop();
  
  if (level === '2') {
    numberOfMines = 40;
    numberOfCells = 256;
  } else if (level === '3') {
    numberOfMines = 99;
    numberOfCells = 480;
  } else {
    numberOfMines = 10;
    numberOfCells = 81;
  }
})

// Create Minesweeper Boady with Cells
const createBoard = () => {
  // Create Arrey With Shuffled Empty Cells And Mine Cells  
  const minesCells = Array(numberOfMines).fill('mine');
  const emptyCells = Array(numberOfCells - numberOfMines).fill('valid');
  const allCells = emptyCells.concat(minesCells)
  const shuffledCells = allCells.sort(() =>(Math.random() > .5) ? 1 : -1);
  console.log(shuffledCells)
  // Create Number Of Cells In Minesweeper Body
  for(let i = 0; i < numberOfCells; i++) {
    const cell = document.createElement('div');
    cell.setAttribute('id', i);
    cell.classList.add('cell');
    cell.classList.add(shuffledCells[i]);
    gameBody.appendChild(cell);
    allCellsArray.push(cell);
  }
}

// Start Game Event
startButton.addEventListener('click', createBoard);

