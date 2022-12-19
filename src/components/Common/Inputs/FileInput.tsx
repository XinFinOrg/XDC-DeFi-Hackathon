import { darken } from 'polished';
import styled from 'styled-components';

export const FileInput = styled.input.attrs(() => ({
  type: 'file',
}))`
  color: #878787;

  ::-webkit-file-upload-button {
    background-color: ${({ theme }) => theme.primary1};
    border: 1px solid transparent;
    color: white;
    border-radius: 4px;
    border-radius: 11px;
    cursor: pointer;
    font-size: 12px;
    outline: none;
    padding: 5px 10px;
    text-transform: uppercase;
    transition: all 1s ease;
    will-change: transform;
    transition: transform 450ms ease;
    transform: perspective(1px) translateZ(0);
  }

  ::-webkit-file-upload-button:hover {
    background-color: ${({ theme, disabled }) => !disabled && darken(0.03, theme.primary1)};
  }
`;
