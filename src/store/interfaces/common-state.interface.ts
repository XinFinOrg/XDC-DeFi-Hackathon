import { Status } from '../../interfaces/statuses';

export interface ICommonState {
  status: Status;
  error: Error | null;
}

export const initialCommonState: ICommonState = {
  status: Status.INITIAL,
  error: null,
};
