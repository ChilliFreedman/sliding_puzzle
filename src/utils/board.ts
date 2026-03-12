const EMPTY_TILE = 0;

export function createBoard(size: number): number[] {
  const arr = [];

  for (let i = 1; i < size; i++) {
    arr.push(i);
  }

  arr.push(EMPTY_TILE) ;

  return arr;
}

function canMove(board: number[], index: number): boolean {
  const emptyIndex = board.indexOf(EMPTY_TILE);
  const size = Math.sqrt(board.length);

  const row = Math.floor(index / size);
  const col = index % size;

  const emptyRow = Math.floor(emptyIndex / size);
  const emptyCol = emptyIndex % size;

  const isAdjacent =
    (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
    (col === emptyCol && Math.abs(row - emptyRow) === 1);

  return isAdjacent;
}

export function moveTile(board: number[], index: number): number[] {
  if (!canMove(board, index)) {
    return board;
  }

  const emptyIndex = board.indexOf(EMPTY_TILE);
  const newBoard = [...board];
  [newBoard[index], newBoard[emptyIndex]] = [newBoard[emptyIndex], newBoard[index]];

  return newBoard;
}

