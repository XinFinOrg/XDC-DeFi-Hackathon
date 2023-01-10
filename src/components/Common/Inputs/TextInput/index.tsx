import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { StyledComponentProps } from '../../../../interfaces/styled-component-props.interface';
import { smallWidth } from '../../../../interfaces/universal-styled-component-props';
import { Flex, FlexStyledComponentProps } from '../../Flex';
import { Span } from '../../Span';

export const TextInput = styled.input<StyledComponentProps>`
  height: 36px;
  margin: ${(props) => props.margin || '0'};
  padding: ${(props) => props.padding || '6px 10px'};
  width: ${(props) => props.width || '100%'};
  min-width: ${(props) => props.minWidth || '100%'};
  max-width: ${(props) => props.maxWidth || '100%'};
  white-space: nowrap;
  background-color: black;
  box-shadow: ${(props) => props.boxShadow || '1px 2px 4px rgba(0, 0, 0, 0.25)'};
  outline: none;
  border-radius: ${(props) => props.borderRadius || '5px'};
  color: ${({ theme }) => theme.text1_inverse};
  position: relative;
  -webkit-appearance: none;

  font-size: 18px;

  ::placeholder {
    color: ${({ theme }) => theme.text3};
  }

  ::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }

  :focus {
    outline: none;
  }

  @media ${smallWidth} {
    width: 100%;
  }
`;

export const InputErrorMessage = styled.div<StyledComponentProps>`
  width: fit-content;

  padding: 8px;
  color: ${({ theme }) => theme.text2};

  font-size: 12px;

  border: 1px solid ${({ theme }) => theme.error};
  border-radius: 20px;

  margin-top: -0.5em;
  margin-bottom: 0.4em;
`;

export interface LabeledTextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  required?: boolean;
  label?: string;
  wrapper?: FlexStyledComponentProps;
  error?: string;
}
export const LabeledTextInput = (props: LabeledTextInputProps) => {
  return (
    <Flex {...props.wrapper} flexDirection='column' gap='0.8rem' align='flex-start'>
      {props.label && (
        <label htmlFor={props.id}>
          {props.label}: {props.required && <Span themeColor='red1'>*</Span>}
        </label>
      )}

      <TextInput {...props} autoComplete='off' />
      {props.error && <InputErrorMessage>{props.error}</InputErrorMessage>}
    </Flex>
  );
};

type TextAreaProps = React.HTMLAttributes<HTMLTextAreaElement> & StyledComponentProps;

export const Textarea = styled.textarea<TextAreaProps>`
  margin: ${(props) => props.margin || '0'};
  padding: ${(props) => props.padding || '16px'};
  width: ${(props) => props.width || '100%'};
  min-width: ${(props) => props.minWidth || '100%'};
  max-width: ${(props) => props.maxWidth || '100%'};
  background-color: ${({ theme }) => theme.bg1};
  outline: none;
  border-radius: 20px;
  color: ${({ theme }) => theme.text1};
  border: 1px solid ${({ theme }) => theme.bg3};
  -webkit-appearance: none;
  text-align: ${(props) => props.textAlign || ''};

  font-size: 18px;

  ::placeholder {
    color: ${({ theme }) => theme.text3};
  }

  transition: border 100ms;

  :focus {
    border: 1px solid ${({ theme }) => theme.primary1};
    outline: none;
  }
`;

// const TextInput = (props: StyledComponentProps) => {
//   return <StyledTextInput {...props} />;
// };
