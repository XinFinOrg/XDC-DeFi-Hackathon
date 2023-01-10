import { useMemo, useState } from 'react';
import { BaseButton, ButtonOutlined } from '../../components/Common/Button';
import Div from '../../components/Common/Div';
import { Flex } from '../../components/Common/Flex';
import Checkbox from '../../components/Common/Inputs/Checkbox';
import { ChainId } from '../../interfaces/connection-config.interface';
import { CreateData } from './types';

interface IProps {
  data: CreateData;
  needToApprove: boolean;
  approve: () => void;
  createPresale: () => void;
  needToSwitch: ChainId | null;
}

const Confirm = ({ needToApprove, approve, createPresale }: IProps) => {
  const [conditions, setConditions] = useState({
    first: false,
    second: false,
    third: false,
    fourth: false,
    fifth: false,
    sixth: false,
  });
  const allIsAgree = useMemo(() => {
    return Object.values(conditions).includes(false);
  }, [conditions]);

  const handleCheckboxChange = (e: any) => {
    // @ts-ignore
    setConditions((s) => ({ ...s, [e.target.id]: !conditions[e.target.id] }));
  };

  const agreeAll = () => {
    const res = Object.keys(conditions).reduce(
      (prev, current) => ({ ...prev, [current]: true }),
      {},
    );

    // @ts-ignore
    setConditions(res);

    console.log(res);
  };
  return (
    <Div display='flex' flexDirection='column' gap='1rem' minWidth='10rem' padding='2rem'>
      <Div fontSizePreset='large' fontWeightPreset='bold'>
        VALIDATE AND CONFIRM
      </Div>
      <Checkbox
        checked={conditions.first}
        onChange={handleCheckboxChange}
        id='first'
        label='I am aware that platform is not responsible for swaps and can’t refund any assets as it is fully decentralized.'
      />

      <Checkbox
        checked={conditions.second}
        onChange={handleCheckboxChange}
        id='second'
        label='I don’t need and will not share secret key to anyone including counterparty'
      />
      <Checkbox
        checked={conditions.third}
        onChange={handleCheckboxChange}
        id='third'
        label='I will save secret key additionally'
      />
      <Checkbox
        checked={conditions.fourth}
        onChange={handleCheckboxChange}
        id='fourth'
        label='I understand that time locks should be enough for both sides'
      />
      <Checkbox
        checked={conditions.fifth}
        onChange={handleCheckboxChange}
        id='fifth'
        label='I have read how atomic swap works'
      />
      <Checkbox
        checked={conditions.sixth}
        onChange={handleCheckboxChange}
        id='sixth'
        label='I will check all parameters of counterparty swap properly'
      />
      <Checkbox
        checked={!allIsAgree}
        onChange={agreeAll}
        id='all'
        label='Agree to all'
        color='red'
      />
      <Flex justify='start' gap='0.3rem' flexWrap='wrap'>
        {needToApprove && <ButtonOutlined onClick={approve}>APPROVE</ButtonOutlined>}
        <BaseButton bg='black' color='white' disabled={needToApprove} onClick={createPresale}>
          CREATE SWAP
        </BaseButton>
      </Flex>
    </Div>
  );
};

export default Confirm;
