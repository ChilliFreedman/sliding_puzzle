import SizeSelector from "./SizeSelector";
import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

type TopBarProps = {
  value: number;
  onSizeChange: (size: number) => void;
  onShuffle: () => void;
};

const TopBar = ({ value, onSizeChange, onShuffle }: TopBarProps) => {
  const userContext = useContext(UserContext);
  if (!userContext) throw new Error("UserContext is undefined");
  const { logout } = userContext;
  
  return (
    <Wrapper>
      <SizeSelector value={value} onChange={onSizeChange} />
      <ShuffleButton onClick={onShuffle}>Shuffle</ShuffleButton>
      <LogoutButton onClick={logout}>Logout</LogoutButton>
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
`;