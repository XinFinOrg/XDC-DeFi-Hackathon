import { Copy } from 'react-feather';
import styled from 'styled-components';

export const StyledCopy = styled(Copy)`
  display: flex;
  cursor: pointer;
  padding: 5px;
  margin-left: 2px;
  min-width: 30px;
  height: 30px;
  transition: 1s all;
  &:hover {
    opacity: 50%;
  }
  &:active {
    transition: 0s all;
    background: black;
    border-radius: 5px;
  }
`;
