import { Dispatch } from '@reduxjs/toolkit';
import { setTheme } from './actions';

export const fetchSelectedTheme = () => async (dispatch: Dispatch) => {
  try {
    const isNotDark = localStorage.getItem('isDark') === 'false';
    if (isNotDark) {
      dispatch(setTheme({ isDark: false }));
    } else {
      dispatch(setTheme({ isDark: true }));
    }
  } catch (error) {
    console.error(error);
  }
};
