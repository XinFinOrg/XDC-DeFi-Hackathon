import styled from 'styled-components';
import { getUniversalAttrs } from '../../../interfaces/universal-styled-component-props';
import { FlexStyledComponentProps } from '../Flex';

export interface GridStyledComponentProps extends FlexStyledComponentProps {
  templateAreas?: string[];
  mobileGridAreas?: string[];

  templateRows?: string;
  templateColumns?: string;
  autoRows?: string;
  autoColumns?: string;
  columnGap?: string;
  rowGap?: string;

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
}

export const Grid = styled.div.attrs(getUniversalAttrs)<GridStyledComponentProps>`
  width: ${(props) => props.width || ''};
  min-width: ${(props) => props.minWidth || ''};
  max-width: ${(props) => props.maxWidth || ''};
  height: ${(props) => props.height || ''};
  flex-direction: ${(props) => props.flexDirection || ''};
  flex-wrap: ${(props) => props.flexWrap || ''};
  justify-content: ${(props) => props.justify || ''};
  align-items: ${(props) => props.align || ''};
  margin: ${(props) => props.margin || '0'};
  padding: ${(props) => props.padding || '0'};
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
  height: ${(props) => props.height || 'auto'};
  min-height: ${(props) => props.minHeight || ''};
  border-radius: ${(props) => props.borderRadius || ''};
  border: ${(props) => props.border || ''};
  left: ${(props) => props.left || ''};
  right: ${(props) => props.right || ''};
  top: ${(props) => props.top || ''};
  bottom: ${(props) => props.bottom || ''};
  font-weight: ${(props) => props.fontWeight || ''};
  font-size: ${(props) => props.fontSize || ''};
  white-space: ${(props) => props.whiteSpace || 'normal'};

  display: ${(props) => props.display || 'grid'};
  gap: ${(props) => props.gap || '0'};
  ${({ columnGap }) => (columnGap ? `column-gap: ${columnGap};` : '')}
  ${({ rowGap }) => (rowGap ? `row-gap: ${rowGap};` : '')}
  grid-template-rows: ${({ templateRows }) => templateRows || 'none'};
  grid-template-columns: ${({ templateColumns }) => templateColumns || 'none'};
  grid-auto-rows: ${({ autoRows }) => autoRows || 'auto'};
  grid-auto-columns: ${({ autoColumns }) => autoColumns || 'auto'};
  ${({ templateAreas }) =>
    templateAreas
      ? `grid-template-areas: ${templateAreas.reduce((prev, cur) => `${prev} '${cur}'`, '')};`
      : ''}

  ${(props) => (props.justify ? `justify-content: ${props.justify};` : '')}
  ${(props) => (props.align ? `align-items: ${props.align};` : '')}

  @media ${({ smallWidth }) => smallWidth} {
    ${({ mobileGridAreas }) =>
      mobileGridAreas
        ? `grid-template-areas: ${mobileGridAreas.reduce((prev, cur) => `${prev} '${cur}'`, '')};`
        : ''};
  }
`;
