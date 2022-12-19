import { ICommonState } from '../../interfaces/common-state.interface';

export interface IModal<T = any> {
  data: T | null;
  coordinates?: { x: number; y: number };
  open: boolean;
}

export interface IUIData {
  wallet: IModal;
  isDark: boolean;
  modal: IModal;
}

export type IUIState = ICommonState & IUIData;
