import React from 'react';
import styled from 'styled-components';

const StyledCheckbox = styled.input`
  position: absolute;
  z-index: -1;
  opacity: 0;
  + label {
    display: inline-flex;
    align-items: center;
    user-select: none;
  }
  + label::before {
    content: '';
    display: inline-block;
    width: 1em;
    height: 1em;
    flex-shrink: 0;
    flex-grow: 0;
    /* background-color: ; */
    border: 1px solid ${({ theme }) => theme.bg3};
    border-radius: 0.25em;
    margin-right: 0.5em;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 50% 50%;
  }
  :checked + label::before {
    border-color: ${({ theme }) => theme.success};
    background-color: ${({ theme }) => theme.success};
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
  }

  :disabled + label {
    color: ${({ theme }) => theme.bg4};
  }
  :disabled + label::before {
    border-color: ${({ theme }) => theme.bg2};
  }
`;

const Label = styled.label`
  display: flex;
  align-items: flex-start;
  cursor: pointer;
`;

interface CheckboxProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  id: string;
  name?: string;
  checked?: boolean;
  color?: string;
}

export function Checkbox({
  label,
  id,
  name,
  onChange,
  checked,
  disabled,
  color,
  ...rest
}: CheckboxProps) {
  return (
    <div {...rest}>
      <StyledCheckbox type='checkbox' id={id} name={name} checked={checked} onChange={onChange} />
      <Label style={{ display: 'flex', alignItems: 'start', color: color || '' }} htmlFor={id}>
        {label}
      </Label>
    </div>
  );
}

export default Checkbox;
