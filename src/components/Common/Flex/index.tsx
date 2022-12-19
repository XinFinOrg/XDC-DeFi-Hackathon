import styled from 'styled-components';
import { getUniversalAttrs } from '../../../interfaces/universal-styled-component-props';

export interface FlexStyledComponentProps {
  display?: string;
  flex?: string;
  flexDirection?:
    | 'row'
    | 'row-reverse'
    | 'column'
    | 'column-reverse'
    | 'inherit'
    | 'iniitial'
    | 'unset';
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
  width?: string | number;
  maxWidth?: string;
  minWidth?: string;
  height?: string | number;
  minHeight?: string;
  maxHeight?: string;
  margin?: string;
  padding?: string;
  pl?: string;
  py?: string;
  border?: string;
  borderRadius?: string;
  cursor?: string;
  color?: string;
  bg?: string;
  fontSize?: string;
  fontWeight?: string;
  opacity?: string;
  position?: string;
  inset?: string;
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
  zIndex?: string;
  textAlign?: string;
  boxShadow?: string;
  overflow?: string;
  gap?: string;
  whiteSpace?: string;

  gridArea?: string;
  pending?: boolean;
}

export const Flex = styled.div.attrs(getUniversalAttrs)<FlexStyledComponentProps>`
  flex: ${(props) => props.flex || ''};
  width: ${(props) => props.width || '100%'};
  min-width: ${(props) => props.minWidth || ''};
  max-width: ${(props) => props.maxWidth || '100%'};
  height: ${(props) => props.height || 'auto'};
  min-height: ${(props) => props.minHeight || 'auto'};
  max-height: ${(props) => props.maxHeight || 'auto'};
  display: ${(props) => props.display || 'flex'};
  flex-direction: ${(props) => props.flexDirection || 'row'};
  flex-wrap: ${(props) => props.flexWrap || 'nowrap'};
  gap: ${(props) => props.gap || '0'};
  justify-content: ${(props) => props.justify || 'center'};
  align-items: ${(props) => props.align || 'center'};
  margin: ${(props) => props.margin || '0'};
  padding: ${(props) => props.padding || '0'};
  padding-left: ${(props) => props.pl || ''};
  padding-bottom: ${(props) => props.py || ''};
  padding-top: ${(props) => props.py || ''};
  position: ${(props) => props.position || ''};
  z-index: ${(props) => props.zIndex || ''};
  text-align: ${(props) => props.textAlign || 'start'};
  background-color: ${(props) => props.bg || ''};
  color: ${(props) => props.color || ''};
  border: ${(props) => props.border || ''};
  border-radius: ${(props) => props.borderRadius || ''};
  inset: ${(props) => props.inset || ''};
  opacity: ${(props) => props.opacity || ''};
  overflow: ${(props) => props.overflow || ''};
  box-shadow: ${(props) => props.boxShadow || ''};
  cursor: ${(props) => props.cursor || ''};
  border-radius: ${(props) => props.borderRadius || ''};
  border: ${(props) => props.border || ''};
  left: ${(props) => props.left || ''};
  right: ${(props) => props.right || ''};
  top: ${(props) => props.top || ''};
  bottom: ${(props) => props.bottom || ''};
  font-weight: ${(props) => props.fontWeight || ''};
  font-size: ${(props) => props.fontSize || ''};
  white-space: ${(props) => props.whiteSpace || 'normal'};

  ${(props) => (props.gridArea ? `grid-area:${props.gridArea};` : '')}
`;

export const DefaultFlex = styled.div.attrs(getUniversalAttrs)<FlexStyledComponentProps>`
  display: ${(props) => props.display || 'flex'};

  width: ${(props) => props.width || ''};
  min-width: ${(props) => props.minWidth || ''};
  max-width: ${(props) => props.maxWidth || ''};
  height: ${(props) => props.height || ''};
  min-height: ${(props) => props.minHeight || ''};
  min-height: ${(props) => props.maxHeight || ''};
  flex-direction: ${(props) => props.flexDirection || ''};
  flex-wrap: ${(props) => props.flexWrap || ''};
  gap: ${(props) => props.gap || ''};
  justify-content: ${(props) => props.justify || ''};
  align-items: ${(props) => props.align || ''};
  margin: ${(props) => props.margin || ''};
  padding: ${(props) => props.padding || ''};
  position: ${(props) => props.position || ''};
  z-index: ${(props) => props.zIndex || ''};
  text-align: ${(props) => props.textAlign || ''};
  background-color: ${(props) => props.bg || ''};
  color: ${(props) => props.color || ''};
  border: ${(props) => props.border || ''};
  border-radius: ${(props) => props.borderRadius || ''};
  inset: ${(props) => props.inset || ''};
  opacity: ${(props) => props.opacity || ''};
  overflow: ${(props) => props.overflow || ''};
  box-shadow: ${(props) => props.boxShadow || ''};
  cursor: ${(props) => props.cursor || ''};
  border-radius: ${(props) => props.borderRadius || ''};
  border: ${(props) => props.border || ''};
  left: ${(props) => props.left || ''};
  right: ${(props) => props.right || ''};
  top: ${(props) => props.top || ''};
  bottom: ${(props) => props.bottom || ''};
  font-weight: ${(props) => props.fontWeight || ''};
  font-size: ${(props) => props.fontSize || ''};
  white-space: ${(props) => props.whiteSpace || ''};

  ${(props) => (props.gridArea ? `grid-area:${props.gridArea};` : '')}
`;
