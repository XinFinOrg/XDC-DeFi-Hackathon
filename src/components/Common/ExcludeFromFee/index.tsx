import Div from '../Div';
import { Span } from '../Span';

interface IProps {
  margin?: string;
}

const ExcludeFromFee = ({ margin }: IProps) => {
  return (
    <Div border='1px solid red' padding='0.5rem' borderRadius='1rem' margin={margin}>
      <Span themeColor='error' fontSize='12.5px'>
        If you have internal commission in your token, exclude presale contract address from fee.
        You can find presale address in “Token Sale Details” section or copy from URL path.
      </Span>
    </Div>
  );
};

export default ExcludeFromFee;
