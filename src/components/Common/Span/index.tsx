import styled, { DefaultTheme } from 'styled-components';
import {
  getUniversalAttrs,
  getUniversalStyles,
  UniversalStyledComponentProps,
} from '../../../interfaces/universal-styled-component-props';
import { LoadingDiv } from '../Div';

export interface SpanStyledProps extends UniversalStyledComponentProps {
  display?: string;
  width?: string | number;
  height?: string | number;
  color?: string;
  themeColor?: keyof DefaultTheme;
  margin?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  opacity?: string;
  wordWrap?: string;
  whiteSpace?: string;
  cursor?: string;
  verticalAlign?: string;
  textAlign?: string;
  padding?: string;
  pb?: string;
  oneLineEllipses?: boolean;
}

export const StyledSpan = styled.span.attrs(getUniversalAttrs)<
  SpanStyledProps & UniversalStyledComponentProps
>`
  ${getUniversalStyles};
  display: ${(props) => props.display || ''};
  width: ${(props) => props.width || ''};
  height: ${(props) => props.height || ''};
  color: ${({ theme, color }) => color ?? theme.text1};
  color: ${({ theme, themeColor }) => (themeColor ? theme[themeColor] : '')};
  margin: ${(props) => props.margin || '0'};
  font-size: ${(props) => props.fontSize || ''};
  font-weight: ${(props) => props.fontWeight || ''};
  line-height: ${(props) => props.lineHeight || ''};
  vertical-align: ${(props) => props.verticalAlign || ''};
  opacity: ${(props) => props.opacity || '1'};
  word-wrap: ${(props) => props.wordWrap || 'break-word'};
  white-space: ${(props) => props.whiteSpace || 'normal'};
  cursor: ${(props) => props.cursor || ''};
  text-align: ${(props) => props.textAlign || ''};
  padding: ${(props) => props.padding || ''};
  padding-bottom: ${(props) => props.pb || ''};

  ${({ oneLineEllipses }) =>
    oneLineEllipses &&
    `
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`;

export interface SpanProps extends SpanStyledProps, React.HTMLAttributes<HTMLSpanElement> {
  loadingProps?: {
    isLoading: boolean;
  } & SpanStyledProps;
  children?: React.ReactNode;
}

export function Span({ loadingProps: loadingParams, children, ...styledProps }: SpanProps) {
  if (loadingParams && loadingParams.isLoading) {
    return <LoadingDiv {...styledProps} {...loadingParams} />;
  }

  return <StyledSpan {...styledProps}>{children}</StyledSpan>;
}
