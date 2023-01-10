import { ALL_SUPPORTED_CHAIN_IDS, CHAIN_INFO } from '../../constants/chains';
import Select from '../../components/Common/Inputs/Select';
import { useAppDispatch } from '../../store';
import { ChainId } from '../../interfaces/connection-config.interface';
import { SwapType } from '../../store/swaps/interfaces/data.interface';
import { useSelectedNetwork } from '../../store/swaps/hooks';
import { updateSelectedNetworks } from '../../store/swaps/actions';

interface Props {
  swapType: SwapType;
}
export const SelectNetwork = ({ swapType }: Props) => {
  const dispatch = useAppDispatch();
  const selectedChainId = useSelectedNetwork(swapType);
  const handleChange = (v: ChainId) => {
    dispatch(updateSelectedNetworks({ [swapType]: v }));
  };
  return (
    <Select
      label='Select Network'
      value={selectedChainId}
      change={(v) => handleChange(v)}
      options={ALL_SUPPORTED_CHAIN_IDS.map((id) => ({
        label: CHAIN_INFO[id].label,
        value: id,
      }))}
    />
  );
};
