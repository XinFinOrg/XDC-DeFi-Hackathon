import styled from 'styled-components';
import { StyledComponentProps } from '../../../../interfaces/styled-component-props.interface';
import { Span } from '../../Span';

export const StyledTooltip = styled(Span)`
  color: ${({ theme }) => theme.primaryText1};
  cursor: help;
  font-size: 12px;
`;

export const PaymentTooltipWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.primaryText1};
  border-radius: 50%;
  display: inline-flex;
  padding: 1px 3px;
  margin: 0 0.2rem 0 0.2rem;
`;

interface PaymentTooltipProps extends StyledComponentProps {
  discount?: number;
  content?: string;
  tooltip?: string;
}

export default function PaymentTooltip({
  discount,
  content,
  tooltip,
  children,
  ...props
}: PaymentTooltipProps) {
  return (
    <StyledTooltip
      data-tooltip={
        tooltip ||
        (discount ? `By paying in XTT you get ${discount}% discount` : 'Loading discount...')
      }
      {...props}
    >
      {children || content || '?'}
    </StyledTooltip>
  );
}
