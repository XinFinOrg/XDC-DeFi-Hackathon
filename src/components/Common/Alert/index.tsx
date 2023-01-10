import styled from 'styled-components';
import { Status } from '../../../interfaces/statuses';

interface IProps {
  status: Status;
  text: string;
  width?: string;
}

const AlertRoot = styled.div<{ width?: string; color: string }>`
  width: ${(props) => props.width || '100%'};
  border: 3px solid ${(props) => props.color};
  color: ${(props) => props.color};
  background-color: transparent;
  font-size: 16px;
  border-radius: 12px;
  padding: 16px;
`;

export const Alert = ({ status, text, width }: IProps) => {
  const getStatusColor = (status: Status) => {
    switch (status) {
      case Status.SUCCESS:
        return ' #339900';
      case Status.ERROR:
        return ' #cc3300';
      case Status.INITIAL:
        return ' #077E8C';
      case Status.PENDING:
        return ' #ffcc00';
    }
  };

  return (
    <AlertRoot color={getStatusColor(status)} width={width}>
      {text}
    </AlertRoot>
  );
};
