import styled from "styled-components";

type SizeSelectorProps = {
  value: number;
  onChange: (size: number) => void;
};

const SizeSelector = ({ value, onChange }: SizeSelectorProps) => {
  return (
     <StyledSelect
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      >
        <option value={9}>3x3</option>
        <option value={16}>4x4</option>
        <option value={25}>5x5</option>
        <option value={36}>6x6</option>
      </StyledSelect>
  );
};

export default SizeSelector;

const StyledSelect = styled.select`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 0.5rem;
  border: none;
  background-color: red;
  color: yellow;
  cursor: pointer;

  &:hover {
    background-color: darkred;
  }
`;

