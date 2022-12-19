import styled, { DefaultTheme } from 'styled-components';

interface StyledLabelLinkProps {
  themeColor?: keyof DefaultTheme;
  fontSize?: string;
  borderColor?: string;
  padding?: string;
  color?: string;
}

const StyledLabelLink = styled.a<StyledLabelLinkProps>`
  display: block;
  padding: ${({ padding }) => padding || '0.5rem 1rem'};
  border: 1px solid
    ${({ theme, themeColor = 'primary1', borderColor }) =>
      borderColor ? borderColor : theme[themeColor]};
  color: ${({ theme, themeColor = 'primary1', color }) => (color ? color : theme[themeColor])};
  font-size: ${({ fontSize }) => fontSize || ''};
  border-radius: 1rem;
`;

interface LabelLinkProps extends StyledLabelLinkProps {
  content: string;
  href?: string;
  target?: string;
  rel?: string;
}

export function LabelLink({ content, ...rest }: LabelLinkProps) {
  return <StyledLabelLink {...rest}>{content}</StyledLabelLink>;
}

export type PresaleLabelLinkData = {
  title: string;
  href?: string;
  color: keyof DefaultTheme;
};

type PresaleLabelLinkProps = {
  labelLink: PresaleLabelLinkData;
};

export function PresaleLabelLink({ labelLink }: PresaleLabelLinkProps) {
  return (
    <LabelLink
      content={labelLink.title}
      href={labelLink.href}
      target='_blank'
      rel='noreferrer'
      themeColor={labelLink.color}
      fontSize='small'
      padding='0.3rem 0.8rem'
    />
  );
}
