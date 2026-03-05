import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Company } from '../../models/company.model';
import { loginThunk, loginWithTokenThunk } from './company.thunk';
import { LoginResponse } from '../../types/company.login';

type LoginState = 'logout' | 'logging' | 'error' | 'logged';

export type CompanyState = {
  loggedCompany: Company | null;
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

    setCurrentCompany(state, { payload }: PayloadAction<Company>) {
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
          state.loggedCompany = payload.company;
          state.token = payload.token;
          state.loginLoadState = 'logged';
        },
      )
      .addCase(
        loginWithTokenThunk.fulfilled,
        (state, { payload }: PayloadAction<LoginResponse>) => {
          state.loggedCompany = payload.company;
          state.token = payload.token;
          state.loginLoadState = 'logged';
        },
      );
  },
});

export const { logout, setCurrentCompany } = companySlice.actions;
export default companySlice.reducer;
