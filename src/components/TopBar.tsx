import SizeSelector from "./SizeSelector";
import styled from "styled-components";
import { useUser } from "../contexts/UserContext";

type TopBarProps = {
  value: number;
  onSizeChange: (size: number) => void;
  onShuffle: () => void;
  onSolve: () => void;
  isSolving: boolean;
  isPaused: boolean;
};

const TopBar = ({ value, onSizeChange, onShuffle, onSolve, isSolving, isPaused }: TopBarProps) => {
  const { logout } = useUser();
  
  return (
    <Wrapper>
      <SizeSelector value={value} onChange={onSizeChange} disabled={isSolving} />
      <ShuffleButton onClick={onShuffle} disabled={isSolving}>Shuffle</ShuffleButton>
      <SolveButton onClick={onSolve}>
        {isSolving
          ? isPaused
            ? "Continue"
            : "Stop"
          : "Solve"}
      </SolveButton>
      <LogoutButton onClick={logout} disabled={isSolving}>Logout</LogoutButton>
    </Wrapper>
  );
};

export default TopBar;

const Wrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ShuffleButton = styled.button`
  font-size: 1rem;
  padding: 0.5rem 1rem;
  background-color: red;
  color: yellow;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: darkred;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: gray;
  }
`;

const SolveButton = styled.button`
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  background-color: red;
  color: yellow;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: darkred;
  }
`;

const LogoutButton = styled.button`
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  background-color: red;
  color: yellow;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-left: auto;

  &:hover {
    background-color: darkred;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: gray;
  }
`;