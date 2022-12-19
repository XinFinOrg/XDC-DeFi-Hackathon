import { LoadingFigure, LoadingFigureType } from '.';
import { LoadingDiv, UniversalDivComponentProps } from '..';

export interface LoadingCircleProps extends LoadingFigure {
  type: LoadingFigureType.CIRCLE;
  diameter?: string;
}

interface LoadingCircleComponentProps extends UniversalDivComponentProps {
  loadingProps: LoadingCircleProps;
}

export function LoadingCircleComponent({
  loadingProps,
  children,
  ...rest
}: LoadingCircleComponentProps) {
  const diameterProps = loadingProps.diameter
    ? { width: loadingProps.diameter, height: loadingProps.diameter }
    : {};
  const figureProps = {
    borderRadius: '50%',
    ...loadingProps,
    ...diameterProps,
  };

  return <LoadingDiv {...rest} {...figureProps} />;
}
