import { DialogContent, DialogOverlay } from '@reach/dialog';
import { useGesture } from '@use-gesture/react';
import React from 'react';
import { animated, useSpring, useTransition } from 'react-spring';
import styled from 'styled-components/macro';
import { isMobile } from '../../utils/userAgent';

const AnimatedDialogOverlay = animated(DialogOverlay);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledDialogOverlay = styled(AnimatedDialogOverlay)`
  &[data-reach-dialog-overlay] {
    z-index: 10;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: start;
    background-color: ${({ theme }) => theme.modalBG};
    height: 100%;
  }
`;

const AnimatedDialogContent = animated(DialogContent);
// destructure to not pass custom props to Dialog DOM element
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledDialogContent = styled(({ minHeight, maxHeight, mobile, isOpen, ...rest }) => (
  <AnimatedDialogContent {...rest} />
)).attrs({
  'aria-label': 'dialog',
})`
  overflow-y: auto;
  &[data-reach-dialog-content] {
    margin: 0 0 0 0;
    background-color: ${({ theme }) => theme.bg0};
    border: 1px solid ${({ theme }) => theme.bg1};
    padding: 0px;
    width: 15rem;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
`;

interface ModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  minHeight?: number | false;
  maxHeight?: number;
  initialFocusRef?: React.RefObject<any>;
  children?: React.ReactNode;
}

export default function LeftMenu({
  isOpen,
  onDismiss,
  minHeight = false,
  maxHeight = 90,
  initialFocusRef,
  children,
}: ModalProps) {
  const fadeTransition = useTransition(isOpen, {
    config: { duration: 250 },
    from: { left: -400 },
    enter: { left: 0 },
    leave: { left: -400 },
  });

  const [{ y }, set] = useSpring(() => ({ y: 0, config: { mass: 1, tension: 210, friction: 20 } }));
  const bind = useGesture({
    onDrag: (state) => {
      set({
        y: state.down ? state.movement[1] : 0,
      });
      if (state.movement[1] > 300 || (state.velocity[0] > 3 && state.direction[1] > 0)) {
        onDismiss();
      }
    },
  });

  return (
    <>
      {fadeTransition(
        (styles, item) =>
          item && (
            <StyledDialogOverlay
              style={styles}
              onDismiss={onDismiss}
              initialFocusRef={initialFocusRef}
              unstable_lockFocusAcrossFrames={false}
            >
              <StyledDialogContent
                {...(isMobile
                  ? {
                      ...bind(),
                      style: {
                        transform: y.interpolate(
                          (y) => `translateY(${(y as number) > 0 ? y : 0}px)`,
                        ),
                      },
                    }
                  : {})}
                aria-label='dialog content'
                minHeight={minHeight}
                maxHeight={maxHeight}
                mobile={isMobile}
              >
                {/* prevents the automatic focusing of inputs on mobile by the reach dialog */}
                {!initialFocusRef && isMobile ? <div tabIndex={1} /> : null}
                {children}
              </StyledDialogContent>
            </StyledDialogOverlay>
          ),
      )}
    </>
  );
}
