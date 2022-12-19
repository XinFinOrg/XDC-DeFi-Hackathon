export type FontSizePreset = 'large' | 'medium' | 'small' | 'extra-small';
export type FontWeightPreset = 'bold' | 'normal';

//any styled component can have this props
export interface UniversalStyledComponentProps {
  fontSizePreset?: FontSizePreset;
  fontWeightPreset?: FontWeightPreset;
}

const getFontSize = ({ fontSizePreset }: UniversalStyledComponentProps) => {
  if (!fontSizePreset) return '';

  switch (fontSizePreset) {
    case 'large':
      return `
    font-size: 1.25rem;
    line-height: 1.75rem;
    `;
    case 'medium':
      return `
    font-size: 1rem;
    line-height: 1.5rem;
    `;
    case 'small':
      return `
    font-size: 0.875rem;
    line-height: 1.25rem;
    `;
    case 'extra-small':
      return `
    font-size: 0.75rem;
    line-height: 1rem;
    `;
  }
};

const getFontWeight = ({ fontWeightPreset }: UniversalStyledComponentProps) => {
  if (!fontWeightPreset) return '';

  switch (fontWeightPreset) {
    case 'bold':
      return `
        font-weight: 600;
      `;
    case 'normal':
      return `
          font-weight: 300;
        `;
  }
};

export const getUniversalStyles = (props: UniversalStyledComponentProps) => {
  return getFontSize(props) + getFontWeight(props);
};

export const smallWidth = '(max-width: 800px)';
export const mediumWidth = '(min-width: 801px) and (max-width: 1200px)';
export const largeWidth = '(min-width: 1201px)';

export const getUniversalAttrs = () => ({
  smallWidth,
  mediumWidth,
  largeWidth,
});
