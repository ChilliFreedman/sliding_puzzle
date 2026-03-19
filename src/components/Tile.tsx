import styled from "styled-components";
import { EMPTY_TILE } from "../utils/constants/game";

type TileProps = {
  value: number;
  onClick: () => void;
};

const Tile = ({ value, onClick }: TileProps) => {
  const isEmpty = value === EMPTY_TILE;

  return (
    <StyledTile empty={isEmpty} onClick={onClick}>
      {!isEmpty ? value : null}
    </StyledTile>
  );
};   

export default Tile;

const StyledTile = styled.div<{ empty: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  font-weight: bold;
  border-radius: 0.2rem;
  background-color: ${({ empty }) => (empty ? "red" : "yellow")};
  cursor: ${({ empty }) => (empty ? "default" : "pointer")};
  box-shadow: ${({ empty }) =>
  empty
    ? "inset 0.125rem 0.125rem 0.375rem rgba(0,0,0,0.5)"
    : "0 0.25rem 0.625rem rgba(0,0,0,0.5)"};
   
  &:hover {
    background-color: ${({ empty }) => (empty ? "red" : "darkkhaki")};
  }
`;

