import { useState } from "react";
import { Board } from "./components/Board";
import { SizeSelector } from "./components/SizeSelector";
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

  function handleBoardSizeChange(amount: number) {
    setBoard(shuffleBoard(createBoard(amount)));
  }
  
  return (
    <div className="app">
      <div className="top-bar">
        <SizeSelector value={board.length} onChange={handleBoardSizeChange} />
        <button className="shuffle-bt" onClick={handleShuffle}>Shuffle</button>
      </div >
      <Board board={board} onTileClick={handleTileClick} />     
    </div>  
  );
};

export default App;