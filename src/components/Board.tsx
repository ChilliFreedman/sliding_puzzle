import Tile from "./Tile";
import styled from "styled-components";

type BoardProps = {
  board: number[];
  onTileClick: (index: number) => void;
};

const Board = ({ board, onTileClick }: BoardProps) => {
  const size = Math.sqrt(board.length);

  return (
    <StyledBoard $columns={size}>
      {board.map((value, index) => (
        <Tile key={value} value={value} onClick={() => onTileClick(index)} />
      ))}
    </StyledBoard>
  );
};

export default Board;

const StyledBoard = styled.div<{ $columns: number }>`
  display: grid;
  gap: 0.25rem;
  padding: 1.25rem;
  background-color: red;
  border-radius: 0.75rem;
  box-shadow: 0 0.25rem 0.625rem rgba(0,0,0,0.5);
  width: 25rem;
  height: 25rem;
  grid-template-columns: repeat(${({ $columns }) => $columns}, 1fr);
`;

