import "../styles/tile.css";

type TileProps = {
  value: number;
  onClick: () => void;
};

export const Tile = ({ value, onClick }: TileProps) => {
  return (
    <div className={`tile ${value === 0 ? "empty" : ""}`} onClick={onClick}>
      {value !== 0 ? value : null}
    </div>
  );
};