import styled, { css, keyframes } from 'styled-components/macro';

export const loadingAnimation = keyframes`
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const LoadingRows = styled.div`
  display: grid;

  & > div {
    animation: ${loadingAnimation} 1.5s infinite;
    animation-fill-mode: both;
    background: linear-gradient(
      to left,
      ${({ theme }) => theme.bg1} 25%,
      ${({ theme }) => theme.bg2} 50%,
      ${({ theme }) => theme.bg1} 75%
    );
    background-size: 400%;
    border-radius: 12px;
    height: 2.4em;
    will-change: background-position;
  }
`;

export const loadingOpacityMixin = css<{ $loading: boolean }>`
  filter: ${({ $loading }) => ($loading ? 'grayscale(1)' : 'none')};
  opacity: ${({ $loading }) => ($loading ? '0.4' : '1')};
  transition: opacity 0.2s ease-in-out;
`;

export const LoadingOpacityContainer = styled.div<{ $loading: boolean }>`
  ${loadingOpacityMixin}
`;

const LoadingCircleWrapper = styled(LoadingRows)<{ size?: string }>`
  & > div {
    width: ${({ size }) => size ?? '8rem'};
    height: ${({ size }) => size ?? '8rem'};
    border-radius: 50%;
  }
`;

export function LoadingCircle({ size = '8rem' }: { size?: string }) {
  return (
    <LoadingCircleWrapper size={size}>
      <div />
    </LoadingCircleWrapper>
  );
}
