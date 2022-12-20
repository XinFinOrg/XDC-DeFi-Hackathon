import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Thunk
interface LoginData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  loggedIn: boolean,
  guest: boolean,
  loading: boolean
}

export const backendLogin = createAsyncThunk('login/backendLogin', async () => {
  const response = await fetch('https://reqres.in/api/users?delay=1');
  console.log('Trying to log user in on backend')
  return (await response.json()).data as LoginData[];
});

export const loginAdapter = createEntityAdapter<LoginData>();


// Use the Thunk
const loginSlice = createSlice({
  name: 'login',

  initialState: {
    loading: false,
    loggedIn: false,
    guest: true
  },

  reducers: {
    setLogin(state, action: PayloadAction<boolean>) {
      state.loggedIn = action.payload;
      state.loading = false,
      state.guest = !action.payload;
    },

    setGuest(state, action: PayloadAction<boolean>) {
      state.guest = action.payload;
      state.loading = false,
      state.loggedIn = !action.payload;
    },

    setLogout(state, action: PayloadAction<boolean>) {
      state.loggedIn = action.payload;
      state.loading = false,
      state.guest = false;
    }
  }

});

export const { setLogin, setLogout, setGuest } = loginSlice.actions;
export default loginSlice.reducer;