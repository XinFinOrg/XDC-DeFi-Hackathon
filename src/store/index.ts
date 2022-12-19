import { configureStore } from '@reduxjs/toolkit';
import walletReducer from './wallet';
import usersReducer from './users';
import loginReducer from './login';

// Centralized state management for housekeeping

export const store = configureStore({
  reducer: {
    login: loginReducer,
    wallet: walletReducer,
    // Demonstrates Async Thunk
    // This could be your issue w redux
    users: usersReducer,
  }
}); 

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;