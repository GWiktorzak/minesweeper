const levelButtons = document.querySelector('.levels-buttons');
const startButton = document.querySelector('.header-button_start');
const minesCounter = document.querySelector('.minesweeper-header_counter span');
const gameTimer = document.querySelector('.minesweeper-header_timer span');
const gameBody = document.querySelector('.minesweeper-body');
 
let numberOfMines = 0;
let numberOfCells = 81;
let allCellsArray = [];
let shuffledCells = [];
let cellsInRow = 9;
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
  shuffledCells = allCells.sort(() =>(Math.random() > .5) ? 1 : -1);
  // Create Number Of Cells In Minesweeper Body
  for(let i = 0; i < numberOfCells; i++) {
    const cell = document.createElement('div');
    cell.setAttribute('id', i);
    cell.classList.add('cell');
    cell.classList.add(shuffledCells[i]);
    gameBody.appendChild(cell);
    allCellsArray.push(cell);
  }
  checkCell()
}

//  Add Numbers of neighboring mains to Cell 
const checkCell = () => {
  
  for (let i = 0; i < allCellsArray.length ; i++) {
    const isLeftEdge = (i % cellsInRow === 0);
    const isRigthEdge = (i % cellsInRow === cellsInRow - 1)
    let total = 0;

    if (allCellsArray[i].classList.contains('valid') && !isLeftEdge && !isRigthEdge && i < 71) {
      if (i > 0 && allCellsArray[i + 1].classList.contains('mine')) total ++
      if (i > 0 && allCellsArray[i - 1].classList.contains('mine')) total ++
      if (i > 0 && allCellsArray[i + 8].classList.contains('mine')) total ++
      if (i > 0 && allCellsArray[i + 9].classList.contains('mine')) total ++
      if (i > 0 && allCellsArray[i + 10].classList.contains('mine')) total ++
      if (i > 8 && allCellsArray[i - 8].classList.contains('mine')) total++
      if (i > 8 && allCellsArray[i - 9].classList.contains('mine')) total++
      if (i > 8 && allCellsArray[i - 10].classList.contains('mine')) total++

      allCellsArray[i].setAttribute('data', total);
    }
    if (allCellsArray[i].classList.contains('valid') && !isLeftEdge && !isRigthEdge && i > 71) {
      if (allCellsArray[i - 1].classList.contains('mine')) total ++
      if (allCellsArray[i + 1].classList.contains('mine')) total ++
      if (allCellsArray[i - 10].classList.contains('mine')) total ++
      if (allCellsArray[i - 9].classList.contains('mine')) total ++
      if (allCellsArray[i - 8].classList.contains('mine')) total ++

      allCellsArray[i].setAttribute('data', total);
    }
    if (isLeftEdge && allCellsArray[i].classList.contains('valid')) {
      if (i >= 0 && allCellsArray[i + 1].classList.contains('mine')) total ++
      if (i >= 0 && i < 71 && allCellsArray[i + 9].classList.contains('mine')) total ++
      if (i >= 0 && i < 71  && allCellsArray[i + 10].classList.contains('mine')) total ++
      if (i > 0 && allCellsArray[i - 8].classList.contains('mine')) total ++
      if (i > 0 && allCellsArray[i - 9].classList.contains('mine')) total ++

      allCellsArray[i].setAttribute('data', total);
    }
    if (isRigthEdge && allCellsArray[i].classList.contains('valid')) {
      if (i <= 80 && allCellsArray[i - 1].classList.contains('mine')) total ++
      if (i <= 80 && i > 8 && allCellsArray[i - 9].classList.contains('mine')) total ++
      if (i <= 80 && i > 8 && allCellsArray[i - 10].classList.contains('mine')) total ++
      if (i > 8 && i < 72 && allCellsArray[i + 8].classList.contains('mine')) total ++
      if (i > 8 && i < 72 && allCellsArray[i + 9].classList.contains('mine')) total ++

      allCellsArray[i].setAttribute('data', total);
    }
  }
}

// Start Game Event
startButton.addEventListener('click', createBoard);