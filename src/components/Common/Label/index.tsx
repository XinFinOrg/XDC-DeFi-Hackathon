import styled from 'styled-components';
import { StyledComponentProps } from '../../../interfaces/styled-component-props.interface';

export const Label = styled.label<StyledComponentProps>`
  color: ${({ theme }) => theme.text1};
  margin: ${(props) => props.margin || '0'};
  font-size: ${(props) => props.fontSize || ''};
  font-weight: ${(props) => props.fontWeight || ''};
  opacity: ${(props) => props.opacity || ''};
  cursor: ${(props) => props.cursor || ''};
`;

// export const Label = (props: StyledComponentProps) => {
//   return <StyledLabel {...props} />;
// };
