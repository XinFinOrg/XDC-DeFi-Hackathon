import styled from 'styled-components/macro';
import { Flex } from '../Common/Flex';
import Div from '../Common/Div';
import { StyledCopy } from '../Common/Copy';
import React from 'react';

const CopyableStyled = styled(Flex)`
  align-items: flex-start;
  width: 100%;
`;

const Content = styled(Div)`
  background: ${({ theme }) => theme.bg3};
  padding: 7px 10px;
  border-radius: 5px;
  word-break: break-all;
`;

interface Props {
  content: string;
}
const Copyable = ({ content }: Props) => {
  return (
    <>
      <CopyableStyled>
        <Content>{content}</Content>
        <StyledCopy onClick={() => navigator.clipboard.writeText(content)} />
      </CopyableStyled>
    </>
  );
};

export default Copyable;
