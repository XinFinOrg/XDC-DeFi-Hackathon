import styled from 'styled-components';

export interface SvgStyledComponentProps {
  width?: string;
  height?: string;
}

export const Svg = styled.svg<SvgStyledComponentProps>`
  width: ${({ width }) => width ?? '1em'};
  height: ${({ height }) => height ?? '1em'};
  color: ${({ theme }) => theme.primaryText1 ?? 'black'};

  :hover {
    transition: all 0.1s;
    color: ${({ theme }) => theme.primary1 ?? 'black'};
    transform: scale(1.15);
  }
`;
