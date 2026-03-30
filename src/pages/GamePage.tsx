import { useState, useContext } from "react";
import Board from "../components/Board";
import TopBar from "../components/TopBar";
import styled from "styled-components";
import { createBoard, moveTile, shuffleBoard, isSolved } from "../utils/boardUtils";
import { DEFAULT_BOARD_SIZE } from "../utils/constants/game";
import { UserContext } from "../contexts/UserContext";

const GamePage = () => {
  const [board, setBoard] = useState<number[]>(createBoard(DEFAULT_BOARD_SIZE));
  const userContext = useContext(UserContext);
  if (!userContext) throw new Error("UserContext is undefined");
  const { user } = userContext;

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
      <TopRowMessages>
        {user ? <UserName>Hello {user.name} !</UserName> : null}
        {isSolved(board) ? <WinMessage>You succeeded!</WinMessage> : null}
      </TopRowMessages>
      <TopBar
        value={board.length}
        onSizeChange={handleBoardSizeChange}
        onShuffle={handleShuffle}
      />
      <Board board={board} onTileClick={handleTileClick} />     
    </AppWrapper>
  );
};

export default GamePage;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TopRowMessages = styled.div`
  display: flex;
  justify-content: space-between;       
`;

const UserName = styled.div`
  font-size: 1.5rem;
  color: red;
  background-color: yellow;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  text-align: center;
`;

const WinMessage = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: red;
  background-color: yellow;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  text-align: center;
`;

