import styled from 'styled-components/macro';
import { StyledComponentProps } from '../../../../interfaces/styled-component-props.interface';

export const TextAreaInput = styled.textarea<StyledComponentProps>`
  position: ${(props) => props.position || ''};
  padding: 16px;
  width: ${(props) => props.width || '100%'};
  background-color: ${({ theme }) => theme.bg1};
  border: none;
  outline: none;
  border-radius: 20px;
  margin: ${(props) => props.margin || ''};
  color: ${({ theme }) => theme.text1};
  border: 1px solid ${({ theme }) => theme.bg3};
  -webkit-appearance: none;
  min-height: ${(props) => props.minHeight || '260px'};
  font-size: ${(props) => props.fontSize || ''};
  resize: none;
  z-index: ${(props) => props.zIndex || ''};
  ::placeholder {
    color: ${({ theme }) => theme.text3};
  }
  transition: border 100ms;
  :focus {
    border: 1px solid ${({ theme }) => theme.primary1};
    outline: none;
  }
`;

// export const TextAreaInput = (props: any) => {
//   return <StyledTextAreaInput {...props} />;
// };
