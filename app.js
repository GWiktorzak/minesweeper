
  const grid = document.querySelector('.grid')
  const flagsLeft = document.querySelector('#flags-left')
  const result = document.querySelector('#result')
  const startBtn = document.querySelector('.start-btn')
  const smilyFace = document.querySelector('img')
  const timer = document.querySelector('#timer')

  flagsLeft.textContent = '000'
  timer.textContent = '000'

  let time = 0
  let width = 10
  let bombAmount = 20
  let flags = 0
  let squares = []
  let isGameOver = false
  

  //Create Game Board
  function createBoard() {
    flagsLeft.textContent = bombAmount

    //Shuffle Valid Squares With Bomb Squares
    const bombsArray = Array(bombAmount).fill('bomb')
    const emptyArray = Array(width * width - bombAmount).fill('valid')
    const gameArray = emptyArray.concat(bombsArray)
    const shuffledArray = gameArray.sort(() => Math.random() - 0.5)

    for(let i = 0; i < width * width; i++) {
      const square = document.createElement('div')
      square.setAttribute('id', i)
      square.classList.add(shuffledArray[i])
      grid.appendChild(square)
      squares.push(square)

      //Normal Click
      square.addEventListener('click', (e) => click(square));

      //Cntrl And Left Click
      square.oncontextmenu = function(e) {
        e.preventDefault()
        addFlag(square)
      }
    }

    //Add Numbers of Neighbouring Bombs
    for (let i = 0; i < squares.length; i++) {
      let total = 0
      const isLeftEdge = (i % width === 0)
      const isRightEdge = (i % width === width -1)

      if (squares[i].classList.contains('valid')) {
        if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb')) total ++
        if (i > 9 && !isRightEdge && squares[i + 1 -width].classList.contains('bomb')) total ++
        if (i > 10 && squares[i -width].classList.contains('bomb')) total ++
        if (i > 11 && !isLeftEdge && squares[i - 1 -width].classList.contains('bomb')) total ++
        if (i < 98 && !isRightEdge && squares[i + 1].classList.contains('bomb')) total ++
        if (i < 90 && !isLeftEdge && squares[i - 1 + width].classList.contains('bomb')) total ++
        if (i < 88 && !isRightEdge && squares[i + 1 + width].classList.contains('bomb')) total ++
        if (i < 89 && squares[i +width].classList.contains('bomb')) total ++
        squares[i].setAttribute('data', total)
      }
    }
  }


  //Add Flag With Right Click
  function addFlag(square) {
    if (isGameOver) return
    if (!square.classList.contains('checked') && (flags < bombAmount)) {
      if (!square.classList.contains('flag')) {
        square.classList.add('flag')
        flags ++
        flagsLeft.textContent = bombAmount - flags
        checkForWin()
      } else {
        square.classList.remove('flag')
        flags --
        flagsLeft.textContent = bombAmount - flags
      }
    }
  }

  //Click On Square Action
  function click(square) {
    let currentId = square.id
    if (isGameOver) return
    if (square.classList.contains('checked') || square.classList.contains('flag')) return
    if (square.classList.contains('bomb')) {
      gameOver(square)
    } else {
      let total = square.getAttribute('data')
      if (total !=0) {
        square.classList.add('checked')
        if (total == 1) square.classList.add('one')
        if (total == 2) square.classList.add('two')
        if (total == 3) square.classList.add('three')
        if (total == 4) square.classList.add('four')
        if (total > 4) square.classList.add('red')

        square.textContent = total
        return
      }
      checkSquare(square, currentId)
    }
    square.classList.add('checked')
  }


  //Check Neighboring Squares Once Square Is Clicked
  function checkSquare(square, currentId) {
    const isLeftEdge = (currentId % width === 0)
    const isRightEdge = (currentId % width === width - 1)

    setTimeout(() => {
      if (currentId > 0 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId > 9 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1 - width].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId > 10) {
        const newId = squares[parseInt(currentId - width)].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId > 11 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1 - width].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId < 98 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId < 90 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1 + width].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId < 88 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1 + width].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId < 89) {
        const newId = squares[parseInt(currentId) + width].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
    }, 10)
  }

  //Game Over
  function gameOver(square) {
    result.textContent = 'BOOM! Game Over!'
    isGameOver = true

    //show ALL the bombs
    squares.forEach(square => {
      if (square.classList.contains('bomb')) {
        square.classList.remove('bomb')
        square.classList.add('game-over')
        smilyFace.src = './assets/sad.png'
      }
    })
  }

  //check for win
  function checkForWin() {
    ///simplified win argument
  let matches = 0

    for (let i = 0; i < squares.length; i++) {
      if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
        matches ++
      }
      if (matches === bombAmount) {
        result.textContent = 'YOU WIN!'
        isGameOver = true
      }
    }
  }

  const timeStart = () => {
    setInterval(() => {
      time ++
      if (!isGameOver) {
        if (time < 10) {
          timer.textContent = `00${time}`
        } else if (time >= 10 && time < 100) {
          timer.textContent = `0${time}`
        } else {
          timer.textContent = time
        }
      }
    }, 1000)
  }

  const startGame = () => {
    if (timer.textContent > 0 || grid.childNodes.length > 0) {
      console.log(`grid.childNodes`, grid.childNodes)
      location.reload()
    } else {
      createBoard()
      timeStart()
    }

  }
  startBtn.addEventListener('click', startGame );


