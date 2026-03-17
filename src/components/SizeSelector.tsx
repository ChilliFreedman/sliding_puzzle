import "../styles/sizeSelector.css";

type SizeSelectorProps = {
  value: number;
  onChange: (size: number) => void;
};

export function SizeSelector({ value, onChange }: SizeSelectorProps) {
  return (
    <div className="size-selector">
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        <option value={9}>3x3</option>
        <option value={16}>4x4</option>
        <option value={25}>5x5</option>
        <option value={36}>6x6</option>
      </select>
    </div>
  );
}