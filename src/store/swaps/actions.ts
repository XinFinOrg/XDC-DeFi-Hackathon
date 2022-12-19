import { createAction } from '@reduxjs/toolkit';

export const setSelectedNetworks = createAction<{ from: number; to: number }>(
  'swaps/setSelectedNetworks',
);
