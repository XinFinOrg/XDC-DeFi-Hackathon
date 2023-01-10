import { isAddress } from '@ethersproject/address';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import { useEffect, useState } from 'react';
import Editor from 'react-simple-code-editor';
import styled from 'styled-components';
import useIsContractAddress, { ICheckContract } from '../../../../hooks/useIsContractAddress';
import { Status } from '../../../../interfaces/statuses';
import Div from '../../Div';
import { Flex } from '../../Flex';
import { Span } from '../../Span';
import { FileInput } from '../FileInput';
import './index.css';

const TextAreaScrollbar = styled(Div)`
  padding: 10px;
  background-color: ${({ theme }) => theme.bg1};
  border-radius: 20px;
  margin: 1rem 0 0 0;
  border: 1px solid ${({ theme }) => theme.bg3};
  overflow: auto;
  height: ${(props) => props.minHeight || '20.1rem'};

  transition: border 100ms;
  :focus {
    border: 1px solid ${({ theme }) => theme.primary1};
    outline: none;
  }

  &::-webkit-scrollbar-track {
    background-color: #121212;
  }

  &::-webkit-scrollbar-thumb {
    background-image: linear-gradient(0deg, #0080ff, #004277);
    border-radius: 10px;
  }

  &::-webkit-scrollbar {
    width: 2px;
  }

  ${({ theme }) => theme.flexColumnNoWrap};
`;

interface Props {
  placeholder: string;
  numbersAmount: number;
  getValidatedAddresses: (addresses: string[], isValid: { [address: string]: boolean }) => void;
  minHeight?: string;
  maxHeight?: string;
  clean?: boolean;
  onlyIds?: boolean;
  onlyContracts?: boolean;
}

interface IInitialNotValidArray {
  address: number[];
  syntax: number[];
}

const initialNotValidArray: IInitialNotValidArray = {
  address: [],
  syntax: [],
};

export const CSVTextArea = ({
  placeholder,
  numbersAmount,
  getValidatedAddresses,
  minHeight,
  maxHeight,
  clean,
  onlyIds,
  onlyContracts,
}: Props) => {
  const [notValidArray, setNotValidArray] = useState(initialNotValidArray);
  const [file, setFile] = useState();
  const fileReader = new FileReader();
  const [textAreaValue, setTextAreaValue] = useState('');
  const isContractChecker = useIsContractAddress();

  const highlightWithLineNumbers = (input: any, language: any) =>
    // @ts-ignore
    highlight(input, language)
      .split('\n')
      .map((line: any, i: number) => `<span class='csvTextareaLineNumber'>${i + 1}</span>${line}`)
      .join('\n');

  const handleOnChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const validateReceiver = async (value: string) => {
    setTextAreaValue(value);
    setFile(undefined);
    setNotValidArray(initialNotValidArray);
    if (!value) return;

    const validatedAddresses: { addresses: string[]; isValid: { [address: string]: boolean } } = {
      addresses: [],
      isValid: {},
    };
    const notValidAddress: IInitialNotValidArray = {
      address: [],
      syntax: [],
    };
    const csvRows = value.split('\n');

    let array: any[] = [];

    switch (numbersAmount) {
      case 0:
        array = csvRows.map((i) =>
          i
            .split(',')
            .map((j) => j.replace('\r', '').replaceAll(' ', ''))
            .filter((v) => !!v),
        );
        break;
      case 1:
        array = csvRows.map((i) =>
          i
            .split(',')
            .map((j) => j.replace('\r', '').replaceAll(' ', ''))
            .filter((v) => !!v),
        );
        break;
      case 2:
        array = csvRows.map((i) =>
          i
            .split(',')
            .map((j) => j.replace('\r', '').replaceAll(' ', ''))
            .filter((v) => !!v),
        );
        break;
    }

    array = array.filter((v) => v.length);

    const validated: ICheckContract[] = await Promise.all(
      array.map((v) => {
        if (v.length === numbersAmount + 1 && (onlyIds ? true : isAddress(v[0]))) {
          if (!onlyContracts) {
            return {
              status: Status.SUCCESS,
              error: '',
            };
          }
          return isContractChecker(v[0]);
        }

        return {
          status: Status.ERROR,
          error: '',
        };
      }),
    );

    array.forEach((v, i) => {
      validatedAddresses.addresses.push(v);
      if (v.length === numbersAmount + 1) {
        const isValid = onlyIds ? true : isAddress(v[0]);
        if (!isValid) {
          notValidAddress.address.push(i + 1);
        }
      } else {
        notValidAddress.syntax.push(i + 1);
      }

      validatedAddresses.isValid = {
        ...validatedAddresses.isValid,
        [v]: validated[i].status === Status.SUCCESS,
      };
    });

    setNotValidArray(notValidAddress);
    getValidatedAddresses(validatedAddresses.addresses, validatedAddresses.isValid);
  };

  useEffect(() => {
    if (file) {
      fileReader.onload = function (event: any) {
        const text = event.target.result;
        validateReceiver(text).then();
      };

      fileReader.readAsText(file);
    }
  }, [file]);

  useEffect(() => {
    if (!clean) return;
    setTextAreaValue('');
  }, [clean]);

  useEffect(() => {
    validateReceiver(textAreaValue).then();
  }, [textAreaValue, numbersAmount]);

  return (
    <Flex display='block'>
      <FileInput id={'csvFileInput'} accept={'.csv'} onChange={handleOnChange} />
      <TextAreaScrollbar minHeight={minHeight} maxHeight={maxHeight}>
        <Div height='1000rem'>
          <Editor
            value={textAreaValue}
            onValueChange={(value) => setTextAreaValue(value)}
            highlight={(value) => highlightWithLineNumbers(value, languages.js)}
            padding={10}
            textareaId='codeArea'
            className='csvTextArea'
            style={{
              fontSize: 13,
              height: '100%',
            }}
            placeholder={placeholder}
          />
        </Div>
      </TextAreaScrollbar>
      {(!!notValidArray.address.length || !!notValidArray.syntax.length) && (
        <Flex display='block' padding='16px'>
          {!!notValidArray.address.length && (
            <div>
              <Span fontSize='14px' themeColor='error'>
                Address error on lines:
              </Span>
              <br />
              <div style={{ fontSize: '13px' }}>
                <Span>{notValidArray.address.map((line) => `${line}, `)}</Span>
              </div>
            </div>
          )}
          {!!notValidArray.syntax.length && (
            <div>
              <Span fontSize='14px' themeColor='error'>
                Syntax error on lines:
              </Span>
              <br />
              <div style={{ fontSize: '13px' }}>
                <Span>{notValidArray.syntax.map((line) => `${line}, `)}</Span>
              </div>
            </div>
          )}
        </Flex>
      )}
    </Flex>
  );
};
