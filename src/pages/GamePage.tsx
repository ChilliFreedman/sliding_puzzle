import { useState, useRef } from "react";
import styled from "styled-components";
import Board from "../components/Board";
import TopBar from "../components/TopBar";
import { useUser } from "../contexts/UserContext";
import { createBoard, moveTile, shuffleBoard, isSolved, boardToGrid, createTargetBoardGrid } from "../utils/boardUtils";
import { DEFAULT_BOARD_SIZE, EMPTY_TILE_IN_STRING, STEP_DELAY_MS, START_STEP } from "../utils/constants/game";
import { useSolvePuzzle } from "../hooks/useSolvePuzzle";

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
 
  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function runSolutionAnimation(startIndex: number) {
    const path = pathRef.current;
    if (!path) return;

    for (let index = startIndex; index < path.length; index++) {
      if (isPausedRef.current) return;

      setBoard(path[index].flat().map(Number));
      setCurrentStep(index + 1);

      await sleep(STEP_DELAY_MS);
    }

    setIsSolving(false);
  }
  
  const solveMutation = useSolvePuzzle();

  function handleSolve() {
    if (isSolving && !isPausedRef.current) {
      isPausedRef.current = true;
      setIsPaused(true);
      return;
    }

    if (isSolving && isPausedRef.current) {
      isPausedRef.current = false;
      setIsPaused(false);
      runSolutionAnimation(currentStep);
      return;
    }

    setHasUserMoved(false);
    
    solveMutation.mutate(
      {
        board: boardToGrid(board),
        movable_tile: EMPTY_TILE_IN_STRING,
        target_board: createTargetBoardGrid(board),
      },
      {
        onSuccess: (data) => {
          pathRef.current = data.path;
          setCurrentStep(START_STEP);
          setIsSolving(true);
          isPausedRef.current = false;
          setIsPaused(false);

          runSolutionAnimation(START_STEP);
        },
        onError: (error) => {
          console.error(error);
          setIsSolving(false);
        },
      }
    );
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
      {solveMutation.isPending ? (
        <LoadingOverlay>
          <Spinner />
        </LoadingOverlay>
      ) : null} 
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

    &:hover {
      background-color: darkred;
    }
  }
`;

const LoadingOverlay = styled.div`
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled.div`
  width: 3rem;
  height: 3rem;
  border: 0.8rem solid white;
  border-top-color: red;
  border-radius: 50%;
  animation: loading 1s linear infinite;

  @keyframes loading {
    to {
      transform: rotate(360deg);
    }
  }
`;