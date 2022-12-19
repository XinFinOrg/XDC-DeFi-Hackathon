import { SetStateAction } from 'react';

//updater for useState
export function updateState<T, V>(field: keyof T, value: V): SetStateAction<T> {
  return (prev: T) => {
    if (!prev) return { [field]: value } as unknown as T;

    return {
      ...prev,
      [field]: value,
    } as T;
  };
}
