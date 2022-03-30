const gameBoard = (() => {
  let boardState = Array(9).fill().map((_, i) => i + 1);
  let playerTurn = 1;

  const positionAvailable = (index) => {
    return typeof boardState[index] === 'number';
  }

  const resetBoardState = () => {
    boardState = Array(9).fill().map((_, i) => i + 1);
  }

  const updateBoardState = (index) => {
    if (positionAvailable(index)) {
      boardState[index] = playerTurn === 1 ? 'X' : 'O';
      if (gameOver()) {
        alert(`${displayController.currentPlayer(playerTurn)} Wins!`);
        resetBoardState();
        return;
      }
      playerTurn = Math.abs(playerTurn - 2) + 1;
    }
    else {
      alert('That position is taken');
    }
  }

  const gameOver = () => {
    if (rowCheck() || colCheck() || diagCheck()) return true;
    return false;
  }

  const rowCheck = () => {
    for (let i = 0; i < 3; i++) {
      const cell = i * 3;
      if (boardState[cell] === boardState[cell + 1] 
          && boardState[cell] === boardState[cell + 2]) {
            return true;
      }
    }
  }

  const colCheck = () => {
    for (let i = 0; i < 3; i++) {
      const cell = i;
      if (boardState[cell] === boardState[cell + 3] 
          && boardState[cell] === boardState[cell + 6]) {
            return true;
      }
    }
  }

  const diagCheck = () => {
    if ((boardState[0] === boardState[4] 
         && boardState[0] === boardState[8]) 
        || (boardState[2] === boardState[4] 
        && boardState[2] === boardState[6])) {
          return true;
    }
  }

  const print = () => {
    const playerHeader = document.querySelector('.player-header');
    playerHeader.textContent = `${displayController.currentPlayer(playerTurn)}'s Turn`;
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

  return {updateBoardState, resetBoardState, print};
})();

const player = (name) => {
  const getName = () => {return name};
  return {getName};
}

const displayController = (() => {
  const playerOne = player(prompt("Enter the first player's name").trim());
  const playerTwo = player(prompt("Enter the second player's name").trim());

  const newGame = () => {
    gameBoard.resetBoardState();
    gameBoard.print();
  }
  document.querySelector('.new-game').addEventListener('click', () => {
    newGame();
  });

  const run = (index) => {
    gameBoard.updateBoardState(index);
    gameBoard.print();
    // document.querySelector('.next-move').addEventListener('click', () => {
    //   gameBoard.updateBoardState(prompt('Enter your move') - 1);
    //   gameBoard.print();
    // });
  }

  const currentPlayer = (player) => {
    return player === 1 ? playerOne.getName() : playerTwo.getName();
  }

  return {run, currentPlayer};
})();

gameBoard.print();