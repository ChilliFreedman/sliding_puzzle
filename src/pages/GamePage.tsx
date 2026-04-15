import { useState } from "react";
import Board from "../components/Board";
import TopBar from "../components/TopBar";
import styled from "styled-components";
import { createBoard, moveTile, shuffleBoard, isSolved } from "../utils/boardUtils";
import { DEFAULT_BOARD_SIZE } from "../utils/constants/game";
import { useUser } from "../contexts/UserContext";


const GamePage = () => {
  const [board, setBoard] = useState<number[]>(createBoard(DEFAULT_BOARD_SIZE));
  const { user } = useUser();
  const isSolvedBoard = isSolved(board);

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
      <GameHeader>
        {user ? <UserName>Hello {user.name} !</UserName> : null}
      </GameHeader>
      
      <TopBar
        value={board.length}
        onSizeChange={handleBoardSizeChange}
        onShuffle={handleShuffle}
      />
      <Board board={board} onTileClick={handleTileClick} />     
      {isSolvedBoard 
        ?
        <WinOverlay>
          <WinBox>
            <h1>You succeeded!</h1>

            <button
              onClick={() => {
                setBoard(shuffleBoard(board));
              }}
            >
              Play again
            </button>
          </WinBox>
        </WinOverlay>
        : null 
      }
    </AppWrapper>
  );
};

export default GamePage;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const GameHeader = styled.div`
  display: flex;   
`;

const UserName = styled.div`
  font-size: 1.5rem;
  color: red;
  background-color: yellow;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  text-align: center;
`;

const WinOverlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WinBox = styled.div`
  background-color: red;
  padding: 2rem 3rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.3);

  h1 {
    margin-bottom: 1rem;
    color: yellow;
  }

  button {
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    background-color: yellow;
    font-size: 1rem;
    
    &:hover {
      background-color: gold;
    }
  }
`;