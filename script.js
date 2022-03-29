const gameBoard = (() => {
  const boardState = [1, 2, 'X', 'O', 5, 6, 7, 8, 9];

  const updateBoardState = (index, piece) => boardState[index] = piece;

  const print = () => {
    const board = document.querySelector('.board');
    while (board.firstChild) {
      board.removeChild(board.firstChild);
    }
    for (let i = 0; i < 3; i++) {
      const row = document.createElement('div');
      row.classList.add('row');
      for (let j = 0; j < 3; j++) {
        const col = document.createElement('div');
        col.classList.add('col')
        col.setAttribute('id', `${i * 3 + j + 1}`);
        col.textContent = boardState[i * 3 + j]
        row.appendChild(col);
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
  const playerOne = player('X');
  const playerTwo = player('O');
  let whoseTurn = 1;
  const run = () => {
    gameBoard.print();
  }
  return {run};
})();

displayController.run();