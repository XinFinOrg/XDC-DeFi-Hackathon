import { LoadingFigure, LoadingFigureType } from '.';
import { LoadingDiv, toLineProps, UniversalDivComponentProps } from '..';

export interface LoadingRectProps extends LoadingFigure {
  type: LoadingFigureType.RECT;
}

interface LoadingRectComponentProps extends UniversalDivComponentProps {
  loadingProps: LoadingRectProps;
  children?: React.ReactNode;
}

export function LoadingRectComponent({
  loadingProps,
  children,
  ...rest
}: LoadingRectComponentProps) {
  const lineProps = toLineProps(loadingProps.fontSizePreset ?? rest.fontSizePreset);
  const figureProps = {
    height: lineProps?.height ?? loadingProps.height ?? rest.height,
    ...loadingProps,
  };

  return (
    <LoadingDiv {...rest} {...figureProps}>
      {children}
    </LoadingDiv>
  );
}
