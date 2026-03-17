import { useState } from "react";
import { Board } from "./components/Board";
import { SizeSelector } from "./components/SizeSelector";
import { createBoard, moveTile, shuffleBoard, isSolved } from "./utils/board";

const amountOfTiles = 9;

function App() {
  const [board, setBoard] = useState<number[]>(createBoard(amountOfTiles));
  const [isWin, setIsWin] = useState(false);

  function handleTileClick(index: number) {
    const newBoard = moveTile(board, index);
    setBoard(newBoard);

    if (isSolved(newBoard)) {
      setIsWin(true);
    }
  }

  function handleShuffle() {
    const newBoard = shuffleBoard(board);
    setBoard(newBoard);
    setIsWin(false);
  }

  function handleBoardSizeChange(amount: number) {
    const newBoard = shuffleBoard(createBoard(amount));
    setBoard(newBoard);
    setIsWin(false);
  }
  
  return (
    <div className="app">
      {isWin ? (<div className="win-message">You succeeded!</div>) : null}
      <div className="top-bar">
        <SizeSelector value={board.length} onChange={handleBoardSizeChange} />
        <button className="shuffle-bt" onClick={handleShuffle}>Shuffle</button>
      </div >
      <Board board={board} onTileClick={handleTileClick} />     
    </div>  
  );
};

export default App;