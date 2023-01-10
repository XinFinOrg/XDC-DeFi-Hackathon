import styled, { DefaultTheme } from 'styled-components';
import {
  FontSizePreset,
  getUniversalAttrs,
  getUniversalStyles,
  UniversalStyledComponentProps,
} from '../../../interfaces/universal-styled-component-props';
import { loadingAnimation } from '../../Loader/styled';
import { LoadingFigureComponent, LoadingProps } from './loading';

export interface DivStyledComponentProps extends UniversalStyledComponentProps {
  display?: string;
  width?: string | number;
  maxWidth?: string;
  minWidth?: string;
  height?: string | number;
  minHeight?: string;
  maxHeight?: string;
  margin?: string;
  padding?: string;
  border?: string;
  borderRadius?: string;
  cursor?: string;
  color?: string;
  bg?: string;
  fontSize?: string;
  fontWeight?: string;
  opacity?: string;
  position?: string;
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
  zIndex?: string;
  textAlign?: string;
  boxShadow?: string;
  overflow?: string;
  whiteSpace?: string;
  gridArea?: string;

  themeBgColor?: keyof DefaultTheme;

  flexDirection?: string;
  flexWrap?: string;
  align?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'baseline'
    | 'stretch'
    | 'inherit'
    | 'initial'
    | 'unset';
  justify?: string;
  justifySelf?: string;
  alignSelf?: string;
  gap?: string;
}

export const StyledDiv = styled.div.attrs(getUniversalAttrs)<DivStyledComponentProps>`
  ${getUniversalStyles};
  display: ${(props) => props.display || ''};
  width: ${(props) => props.width || ''};
  min-width: ${(props) => props.minWidth || ''};
  max-width: ${(props) => props.maxWidth || ''};
  height: ${(props) => props.height || ''};
  min-height: ${(props) => props.minHeight || ''};
  max-height: ${(props) => props.maxHeight || ''};
  margin: ${(props) => props.margin || ''};
  padding: ${(props) => props.padding || ''};
  position: ${(props) => props.position || ''};
  z-index: ${(props) => props.zIndex || ''};
  text-align: ${(props) => props.textAlign || ''};
  background-color: ${(props) => props.bg || ''};
  background-color: ${({ theme, themeBgColor }) => (themeBgColor ? theme[themeBgColor] : '')};
  color: ${(props) => props.color || ''};
  border: ${(props) => props.border || ''};
  border-radius: ${(props) => props.borderRadius || ''};
  opacity: ${(props) => props.opacity || ''};
  overflow: ${(props) => props.overflow || ''};
  box-shadow: ${(props) => props.boxShadow || ''};
  cursor: ${(props) => props.cursor || ''};
  height: ${(props) => props.height || ''};
  min-height: ${(props) => props.minHeight || ''};
  border-radius: ${(props) => props.borderRadius || ''};
  border: ${(props) => props.border || ''};
  left: ${(props) => props.left || ''};
  right: ${(props) => props.right || ''};
  top: ${(props) => props.top || ''};
  bottom: ${(props) => props.bottom || ''};
  font-weight: ${(props) => props.fontWeight || ''};
  font-size: ${(props) => props.fontSize || ''};
  white-space: ${(props) => props.whiteSpace || ''};

  ${(props) => (props.gridArea ? `grid-area: ${props.gridArea};` : '')}

  flex-direction: ${(props) => props.flexDirection || ''};
  flex-wrap: ${(props) => props.flexWrap || ''};
  gap: ${(props) => props.gap || '0'};
  justify-content: ${(props) => props.justify || ''};
  align-items: ${(props) => props.align || ''};
  justify-self: ${(props) => props.justifySelf || ''};
  align-self: ${(props) => props.alignSelf || ''};
`;

export function toLineProps(fontSizePreset?: FontSizePreset): {
  height: string;
  lineGap: string;
} | null {
  if (!fontSizePreset) return null;

  switch (fontSizePreset) {
    // case 'extra-large':
    //   return { height: '1.75rem', lineGap: '0.5rem' };
    case 'large':
      return { height: '1.5rem', lineGap: '0.5rem' };
    case 'medium':
      return { height: '1rem', lineGap: '0.5rem' };
    case 'small':
      return { height: '0.9rem', lineGap: '0.5rem' };
    case 'extra-small':
      return { height: '0.6rem', lineGap: '0.5rem' };
  }
}
export const LoadingDiv = styled(StyledDiv).attrs((props: DivStyledComponentProps) => {
  return {
    borderRadius: props.borderRadius ?? '0.25rem',
  };
})`
  animation: ${loadingAnimation} 1.5s infinite;
  animation-fill-mode: both;
  background: linear-gradient(
    to left,
    ${({ theme }) => theme.bg1} 25%,
    ${({ theme }) => theme.bg2} 50%,
    ${({ theme }) => theme.bg1} 75%
  );
  background-size: 400%;
  will-change: background-position;

  ${({ fontSizePreset: fontPreset }) => `height: ${toLineProps(fontPreset)?.height ?? ''};`}

  & > * {
    visibility: hidden;
  }
`;

export type UniversalDivComponentProps = DivStyledComponentProps &
  React.HTMLAttributes<HTMLDivElement>;

interface DivProps extends UniversalDivComponentProps {
  loadingProps?: {
    isLoading: boolean;
  } & LoadingProps;
  children?: React.ReactNode;
}

export default function Div({ loadingProps, children, ...styledProps }: DivProps) {
  if (loadingProps && loadingProps.isLoading) {
    return (
      <LoadingFigureComponent loadingProps={loadingProps} {...styledProps}>
        {children}
      </LoadingFigureComponent>
    );
  }

  return <StyledDiv {...styledProps}>{children ?? ''}</StyledDiv>;
}
