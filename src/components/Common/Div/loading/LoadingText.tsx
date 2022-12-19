import { LoadingFigure, LoadingFigureType } from '.';
import { LoadingDiv, toLineProps, UniversalDivComponentProps } from '..';
import { DefaultFlex } from '../../Flex';

export interface LoadingTextProps extends LoadingFigure {
  type: LoadingFigureType.TEXT;
  lineCount: number;
  lineWidth?: string;
  lastLineWidth?: string;
}

interface LoadingTextComponentProps extends UniversalDivComponentProps {
  loadingProps: LoadingTextProps;
}

export function LoadingTextComponent({ loadingProps, ...rest }: LoadingTextComponentProps) {
  const { lineCount, lineWidth, lastLineWidth, ...loadingStyledProps } = loadingProps;
  const fullLineCount = lineCount - 1;

  const lineProps = toLineProps(loadingProps.fontSizePreset ?? rest.fontSizePreset);
  const fullLineProps = {
    width: lineWidth ?? '100%',
    height: lineProps?.height ?? '1rem',
  };
  const { keySeed = 0 } = loadingProps;
  const lines = [];
  for (let i = 0; i < fullLineCount; i++) {
    lines.push(<LoadingDiv key={`text-line-${i + keySeed}`} {...fullLineProps} />);
  }

  const lastLineProps = {
    ...fullLineProps,
    width: lastLineWidth ?? '30%',
  };
  lines.push(<LoadingDiv key={`text-line-${fullLineCount + keySeed}`} {...lastLineProps} />);

  const figureProps = {
    gap: lineProps?.lineGap ?? '0.5rem',
    ...loadingStyledProps,
  };

  return (
    <DefaultFlex {...rest} {...figureProps} flexDirection='column'>
      {lines}
    </DefaultFlex>
  );
}
