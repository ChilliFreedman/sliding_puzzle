import styled from "styled-components";
import { BOARD_SIZES } from "../utils/constants/game";

type SizeSelectorProps = {
  value: number;
  onChange: (size: number) => void;
  disabled: boolean;
};

const SizeSelector = ({ value, onChange, disabled }: SizeSelectorProps) => {

  return (
     <StyledSelect
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        disabled={disabled}
      >
        {BOARD_SIZES.map((size) => (
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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: gray;
  }
`;