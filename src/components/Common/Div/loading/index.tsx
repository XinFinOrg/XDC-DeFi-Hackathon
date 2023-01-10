import { UniversalDivComponentProps } from '..';
import { LoadingCircleComponent, LoadingCircleProps } from './LoadingCircle';
import { LoadingRectComponent, LoadingRectProps } from './LoadingRect';
import { LoadingTextComponent, LoadingTextProps } from './LoadingText';

export enum LoadingFigureType {
  RECT = 'RECT',
  CIRCLE = 'CIRCLE',
  TEXT = 'TEXT',
}

export interface LoadingFigure extends UniversalDivComponentProps {
  type: LoadingFigureType;
  keySeed?: number;
}

export type LoadingProps = LoadingRectProps | LoadingCircleProps | LoadingTextProps;

interface LoadingFigureProps extends UniversalDivComponentProps {
  loadingProps: LoadingProps;
  children?: React.ReactNode;
}

export function LoadingFigureComponent({ loadingProps, ...rest }: LoadingFigureProps) {
  switch (loadingProps.type) {
    case LoadingFigureType.RECT:
      return (
        <LoadingRectComponent loadingProps={loadingProps} {...rest}>
          {rest.children}
        </LoadingRectComponent>
      );
    case LoadingFigureType.CIRCLE:
      return <LoadingCircleComponent loadingProps={loadingProps} {...rest} />;
    case LoadingFigureType.TEXT:
      return <LoadingTextComponent loadingProps={loadingProps} {...rest} />;
  }
}
