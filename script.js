const gameBoard = (() => {
  const boardState = [1, 2, 'X', 'O', 5, 6, 7, 8, 9];
  let playerTurn = 1;
  const positionAvailable = (index) => {
    return typeof boardState[index] === 'number';
  }
  const updateBoardState = (index) => {
    if (positionAvailable(index)) {
      boardState[index] = playerTurn === 1 ? 'X' : 'O';
      playerTurn = Math.abs(playerTurn - 2) + 1;
    }
    else {
      alert('That position is taken');
    }
  }
  const print = () => {
    const playerHeader = document.querySelector('.player-header');
    playerHeader.textContent = `Player ${playerTurn }'s Turn`;
    const board = document.querySelector('.board');
    while (board.firstChild) {
      board.removeChild(board.firstChild);
    }
    for (let i = 0; i < 3; i++) {
      const row = document.createElement('div');
      row.classList.add('row');
      for (let j = 0; j < 3; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell')
        cell.setAttribute('id', `${i * 3 + j + 1}`);
        cell.textContent = boardState[i * 3 + j];
        cell.addEventListener('click', () => {
          displayController.run(cell.getAttribute('id') - 1)
        });
        row.appendChild(cell);
      }
      board.appendChild(row);
    }
  }

  return {updateBoardState, print};
})();

const player = (gamePiece) => {
  const getPiece = () => gamePiece;

  return {getPiece};
}

const displayController = (() => {
  const run = (index) => {
    gameBoard.updateBoardState(index);
    gameBoard.print();
    // document.querySelector('.next-move').addEventListener('click', () => {
    //   gameBoard.updateBoardState(prompt('Enter your move') - 1);
    //   gameBoard.print();
    // });
  }

  return {run};
})();

gameBoard.print();