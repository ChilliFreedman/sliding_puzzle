import { random } from "lodash";

const EMPTY_TILE = 0;

export function createBoard(size: number): number[] {
  const arr = [];

  for (let i = 1; i < size; i++) {
    arr.push(i);
  }

  arr.push(EMPTY_TILE) ;

  return arr;
}

export function getAvailableTiles(board: number[]): number[] {
  const emptyIndex = board.indexOf(EMPTY_TILE);
  const size = Math.sqrt(board.length);
  const row = Math.floor(emptyIndex / size);
  const col = emptyIndex % size;
  const availableTiles = [];

  if (row > 0) {
    availableTiles.push(emptyIndex - size);
  }

  if (row < size - 1) {
    availableTiles.push(emptyIndex + size);
  }

  if (col > 0) {
    availableTiles.push(emptyIndex - 1);
  }

  if (col < size - 1) {
    availableTiles.push(emptyIndex + 1);
  }

  return availableTiles;
}

function canMove(board: number[], index: number): boolean {
  const availableTiles = getAvailableTiles(board);
  return availableTiles.includes(index);
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

export function shuffleBoard(board: number[]): number[] {
  let newBoard = [...board];
  const moves = random(100, 300);

  for (let i = 0; i < moves; i++) {
    const possibleMoves = getAvailableTiles(newBoard);
    const randomIndex = random(possibleMoves.length - 1);
    newBoard = moveTile(newBoard, possibleMoves[randomIndex]);
  }

  return newBoard;
}
  