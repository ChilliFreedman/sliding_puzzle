import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import styled from "styled-components";
import Board from "../components/Board";
import TopBar from "../components/TopBar";
import { useUser } from "../contexts/UserContext";
import { createBoard, moveTile, shuffleBoard, isSolved, boardToGrid, createTargetBoardGrid } from "../utils/boardUtils";
import { solvePuzzle } from "../utils/puzzleApi";
import { DEFAULT_BOARD_SIZE, EMPTY_TILE_IN_STRING, STEP_DELAY_MS, START_STEP } from "../utils/constants/game";


type SolveRequest = {
  board: string[][];
  movable_tile: string;
  target_board: string[][];
};

type SolveResponse = {
  path: string[][][];
  solvable: boolean;
  steps: number;
};
const GamePage = () => {
  const [board, setBoard] = useState<number[]>(createBoard(DEFAULT_BOARD_SIZE));
  const [hasUserMoved, setHasUserMoved] = useState(false);
  const [isSolving, setIsSolving] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  const [currentStep, setCurrentStep] = useState(START_STEP);
  const pathRef = useRef<string[][][] | null>(null);
  const { user } = useUser();
  const isSolvedBoard = isSolved(board);

  function handleTileClick(index: number) {
    if (isSolving) return;
    setBoard(moveTile(board, index));
    setHasUserMoved(true); 
  }

  function handleShuffle() {
    if (isSolving) return;
    setBoard(shuffleBoard(board));
    setHasUserMoved(false);
  }

  function handleBoardSizeChange(amount: number) {
    if (isSolving) return;
    setBoard(createBoard(amount));
    setHasUserMoved(false);
  }
  
  const solveMutation = useMutation<SolveResponse, Error, SolveRequest>({
    mutationFn: solvePuzzle,
    
    onSuccess: (data) => {
      pathRef.current = data.path;
      setCurrentStep(START_STEP);
      setIsSolving(true);
      isPausedRef.current = false;
      setIsPaused(false);

      runStep(START_STEP);
    },

    onError: (error) => {
      console.error(error);
      setIsSolving(false);
    }
  });
  
  function runStep(index: number) {
    const path = pathRef.current;
    if (!path) return;

    if (isPausedRef.current) return;

    if (index >= path.length) {
      setIsSolving(false);
      return;
    }

    setTimeout(() => {
      if (isPausedRef.current) return;

      setBoard(path[index].flat().map(Number));
      setCurrentStep(index + 1);

      runStep(index + 1);
    }, STEP_DELAY_MS);
  }
  
  function handleSolve() {
    if (isSolving && !isPausedRef.current) {
      isPausedRef.current = true;
      setIsPaused(true);
      return;
    }

    if (isSolving && isPausedRef.current) {
      isPausedRef.current = false;
      setIsPaused(false);
      runStep(currentStep);
      return;
    }

    setHasUserMoved(false);
    
    solveMutation.mutate({
      board: boardToGrid(board),
      movable_tile: EMPTY_TILE_IN_STRING,
      target_board: createTargetBoardGrid(board)
    });
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
        onSolve={handleSolve}
        isSolving={isSolving}
        isPaused={isPaused}
      />
      <Board board={board} onTileClick={handleTileClick} />     
      {isSolvedBoard && hasUserMoved ? (
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
        )  : null 
      }
      {solveMutation.isError ? (
        <ErrorOverlay>
          <ErrorBox>
            <h2>Error</h2>

            <p>
              {solveMutation.error.message}
            </p>

            <button onClick={() => solveMutation.reset()}>
              Close
            </button>
          </ErrorBox>
        </ErrorOverlay>
      ): null
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
  background: rgba(0, 0, 0, 0.3);
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

const ErrorOverlay = styled.div`
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorBox = styled.div`
  background-color: yellow;
  color: red;
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;

  h2 {
    color: red;
    margin-bottom: 1rem;
  }

  button {
    border: none;
    background-color: red;
    color: yellow;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
`;