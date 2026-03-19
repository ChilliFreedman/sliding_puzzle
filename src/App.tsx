import { useState } from "react";
import Board from "./components/Board";
import TopBar from "./components/TopBar";
import styled from "styled-components";
import { createBoard, moveTile, shuffleBoard, isSolved } from "./utils/boardUtils";
import { DEFAULT_BOARD_SIZE } from "./utils/constants/game";

const App = () => {
  const [board, setBoard] = useState<number[]>(createBoard(DEFAULT_BOARD_SIZE));

  function handleTileClick(index: number) {
    setBoard(moveTile(board, index));
  }

  function handleShuffle() {
    setBoard(shuffleBoard(board));
  }

  function handleBoardSizeChange(amount: number) {
    setBoard(createBoard(amount));
  }
  
  return (
    <AppWrapper>
      {isSolved(board) ? (<WinMessage>You succeeded!</WinMessage>) : null}
      <TopBar
        value={board.length}
        onSizeChange={handleBoardSizeChange}
        onShuffle={handleShuffle}
      />
      <Board board={board} onTileClick={handleTileClick} />     
    </AppWrapper>
  );
};

export default App;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const WinMessage = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: yellow;
  background-color: red;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  text-align: center;
`;

