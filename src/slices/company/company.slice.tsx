import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loginThunk, loginWithTokenThunk } from './company.thunk';
import { LoginResponse } from '../../types/company.login';

type LoginState = 'logout' | 'logging' | 'error' | 'logged';

export interface AuthCompany {
  id: number;
  name: string;
  email: string;
}

export type CompanyState = {
  loggedCompany: AuthCompany | null;
  loginLoadState: LoginState;
  token: string;
};

const initialState: CompanyState = {
  loggedCompany: null,
  loginLoadState: 'logout',
  token: '',
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    logout(state) {
      state.loggedCompany = null;
      state.token = '';
      state.loginLoadState = 'logout';
    },

    setCurrentCompany(state, { payload }: PayloadAction<AuthCompany>) {
      state.loggedCompany = payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loginLoadState = 'logging';
      })

      .addCase(loginThunk.rejected, (state) => {
        state.loginLoadState = 'error';
      })

      .addCase(
        loginThunk.fulfilled,
        (state, { payload }: PayloadAction<LoginResponse>) => {
          state.loggedCompany = {
            id: payload.id,
            name: payload.name,
            email: payload.email,
          };

          state.token = payload.token;
          state.loginLoadState = 'logged';
        },
      )

      .addCase(
        loginWithTokenThunk.fulfilled,
        (state, { payload }: PayloadAction<LoginResponse>) => {
          state.loggedCompany = {
            id: payload.id,
            name: payload.name,
            email: payload.email,
          };

          state.token = payload.token;
          state.loginLoadState = 'logged';
        },
      );
  },
});

export const { logout, setCurrentCompany } = companySlice.actions;
export default companySlice.reducer;
