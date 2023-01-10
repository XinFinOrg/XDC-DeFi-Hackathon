import React from 'react';
import { generate } from '@wcj/generate-password';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { ButtonOutlined } from '../../components/Common/Button';
import { StyledCopy } from '../../components/Common/Copy';
import Div from '../../components/Common/Div';
import { Flex } from '../../components/Common/Flex';
import { useWindowSize } from '../../hooks/useWindowSize';
import Copyable from '../../components/Copyable';
import id from 'date-fns/esm/locale/id/index.js';

interface IProps {
  change: (v: string) => void;
  getSecretKey: (v: string) => void;
}

export function GenerateHash({ change, getSecretKey }: IProps) {
  const [secretKey, setSecretKey] = useState('');
  const [publicHash, setPublicHash] = useState('');
  const { width } = useWindowSize();

  const generateHex = () => {
    const secret = generate({ length: 32, numeric: true, lowerCase: true, special: false });
    const bytes = ethers.utils.toUtf8Bytes(secret);
    const hex = ethers.utils.hexlify(bytes);
    setSecretKey(hex);
    setPublicHash(ethers.utils.sha256(hex));
  };

  function shorten(value: string, chars = 4): string {
    if (!value) return value;
    return `${value.substring(0, chars + 2)}...${value.substring(65 - chars)}`;
  }

  useEffect(() => {
    generateHex();
  }, []);
  useEffect(() => {
    if (!publicHash) return;
    change(publicHash);
  }, [publicHash]);

  useEffect(() => {
    if (!secretKey) return;
    getSecretKey(secretKey);
  }, [secretKey]);
  return (
    <Flex
      flexDirection='column'
      gap='1rem'
      align='flex-start'
      border='1px dashed black'
      padding='1rem'
    >
      <Div>
        <Div fontSizePreset='large' fontWeightPreset='bold'>
          SECRET KEY <span style={{ color: 'red' }}>(DO NOT SHARE)</span>
        </Div>
        <Copyable content={secretKey} />
      </Div>
      <Div>
        <Div fontSizePreset='large' fontWeightPreset='bold'>
          PUBLIC HASH
        </Div>
        <Copyable content={publicHash} />
      </Div>
      <ButtonOutlined onClick={generateHex}>GENERATE NEW KEY</ButtonOutlined>
    </Flex>
  );
}
