export interface StyledComponentProps {
  display?: string;
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
  border?: string;
  borderRadius?: string;
  cursor?: string;
  color?: string;
  bg?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
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
  boxSizing?: 'border-box' | 'content-box';
  wordWrap?: string;
  overflow?: string;
  validate?: any;
  className?: string;
  name?: string;
  id?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  value?: any;
  onChange?: any;
  disabled?: boolean;
  required?: boolean;
  children?: any;
  htmlFor?: string;
  gap?: string;
  whiteSpace?: string;
  isMobile?: boolean;
  isActive?: boolean;
  isOpened?: boolean;
}
