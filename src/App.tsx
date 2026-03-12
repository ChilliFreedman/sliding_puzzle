import { useState } from "react";
import { Board } from "./components/Board";
import { createBoard, moveTile } from "./utils/board";

const amountOfTiles = 9;

function App() {
  const [board, setBoard] = useState<number[]>(createBoard(amountOfTiles));

  function handleTileClick(index: number) {
    setBoard(moveTile(board, index));
  }

  return (
    <div className="app">
      <Board board={board} onTileClick={handleTileClick} />
    </div>
  );
};

export default App;