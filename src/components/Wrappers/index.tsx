import styled from 'styled-components/macro';

export const Wrappers = styled.div<{ padding?: string; width?: string }>`
  position: relative;
  width: ${({ width }) => (width ? width : 'auto')};
  background: ${({ theme }) => theme.bg0};
  border-radius: 10px;
  padding: ${({ padding }) => (padding ? padding : '2rem')};
  border: 1px solid #000000;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
`;
