import styled from "styled-components";

type SizeSelectorProps = {
  value: number;
  onChange: (size: number) => void;
};

const SizeSelector = ({ value, onChange }: SizeSelectorProps) => {
  const sizes = [3, 4, 5, 6];

  return (
     <StyledSelect
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      >
        {sizes.map((size) => (
          <option key={size} value={size * size}>
            {size}x{size}
          </option>
        ))}
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

