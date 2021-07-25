if ( i > 0 && !isLeftEdge && (allCellsArray[i - 1].classList.contains('mine'))) total ++
if ( i > 8 && !isRigthEdge && (allCellsArray[i + 1 - cellsInRow].classList.contains('mine'))) total ++
if ( i > 9 && allCellsArray[i - cellsInRow].classList.contains('mine')) total ++
if ( i > 10 && !isLeftEdge && allCellsArray[i - 1 - cellsInRow].contains('mine')) total ++
if ( i < 81 && !isRigthEdge && allCellsArray[i + 1].classList.contains('mine')) total ++
if ( i < 72 && !isLeftEdge && allCellsArray[i - 1 + cellsInRow].classList.contains('mine')) total++

allCellsArray[i].setAttribute('data', total);
total = 0;