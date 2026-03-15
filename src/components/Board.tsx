import { Tile } from "./Tile";
import "../styles/board.css";

type BoardProps = {
  board: number[];
  onTileClick: (index: number) => void;
};

export const Board = ({ board, onTileClick }: BoardProps) => {
  const size = Math.sqrt(board.length);

  return (
    <div
      className="board"
      style={{
        gridTemplateColumns: `repeat(${size}, 1fr)`
      }}
    >
      {board.map((value, i) => (
        <Tile key={i} value={value} onClick={() => onTileClick(i)} />
      ))}
    </div>
  );
};