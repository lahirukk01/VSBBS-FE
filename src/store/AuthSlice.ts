import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '~/store/store.ts';

type TOtp = {
  ownerIdentifier: string;
  eat: string;
};

type TAuthState = {
  otp: TOtp | null;
  email: string;
  mobile: string;
  userId: number;
  role: string;
}

type TState = {
  auth: TAuthState;
};

const initialState: TState = {
  auth: {
    otp: null,
    email: '',
    mobile: '',
    userId: 0,
    role: '',
  },
};

// type TAction = {
//   type: string;
//   payload: any;
// };

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setOtp: (state, action: PayloadAction<TOtp>) => {
      state.auth.otp = action.payload;
    },
    removeOtp: (state) => {
      state.auth.otp = null;
    },
  },
});

export const { setOtp, removeOtp } = authSlice.actions;

export const selectOtp = (state: RootState) => state.auth.auth.otp;

export default authSlice.reducer;
