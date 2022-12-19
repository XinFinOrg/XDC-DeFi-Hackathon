import { Flex } from '../Common/Flex';
import Loader from '../Loader';

const PageLoading = () => {
  return (
    <Flex align='center' height='90vh'>
      <Loader size='30px' />
    </Flex>
  );
};

export default PageLoading;
