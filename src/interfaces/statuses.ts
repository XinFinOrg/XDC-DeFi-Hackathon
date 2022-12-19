export enum Status {
  INITIAL = 'initial',
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface StatusData<T> {
  status: Status;
  data: T;
}
