import { useState } from "react";
import { Board } from "./components/Board";
import { createBoard, moveTile, shuffleBoard } from "./utils/board";

const amountOfTiles = 9;

function App() {
  const [board, setBoard] = useState<number[]>(createBoard(amountOfTiles));

  function handleTileClick(index: number) {
    setBoard(moveTile(board, index));
  }

  function handleShuffle() {
    setBoard(shuffleBoard(board));
  }

  return (
    <div className="app">
      <Board board={board} onTileClick={handleTileClick} />
      <button className="shuffle-bt" onClick={handleShuffle}>Shuffle</button>
    </div>
  );
};

export default App;