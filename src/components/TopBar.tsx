import SizeSelector from "./SizeSelector";
import styled from "styled-components";

type TopBarProps = {
  value: number;
  onSizeChange: (size: number) => void;
  onShuffle: () => void;
};

const TopBar = ({ value, onSizeChange, onShuffle }: TopBarProps) => {
  return (
    <Wrapper>
      <SizeSelector value={value} onChange={onSizeChange} />
      <ShuffleButton onClick={onShuffle}>Shuffle</ShuffleButton>
    </Wrapper>
  );
};

export default TopBar;

const Wrapper = styled.div`
  width: 100%;
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