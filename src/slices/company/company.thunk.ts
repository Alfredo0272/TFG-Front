import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginResponse } from '../../types/company.login';
import { Company, LoginCompany } from '../../models/company.model';
import { CompaniesRepo } from '../../services/companies/api.repo.companies';
import { LocalStorage } from '../../services/local.storage';

export const loginThunk = createAsyncThunk<
  LoginResponse,
  {
    loginCompany: LoginCompany;
    repo: CompaniesRepo;
    userStore: LocalStorage<{ token: string; id: number; name: string }>;
  }
>(
  'auth/login',
  async ({ loginCompany, repo, userStore }, { rejectWithValue }) => {
    try {
      const result = await repo.login(loginCompany);

      userStore.set({
        token: result.token,
        id: result.company.id,
        name: result.company.name,
      });

      return result;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Invalid credentials');
    }
  },
);

export const registerCompanyThunk = createAsyncThunk<
  Company,
  {
    newCompany: Partial<Company>;
    repo: CompaniesRepo;
  }
>('companies/register', async ({ newCompany, repo }, { rejectWithValue }) => {
  try {
    const result = await repo.registerCompany(newCompany);
    return result;
  } catch (error) {
    console.error(error);
    return rejectWithValue('Error registering company');
  }
});

export const loginWithTokenThunk = createAsyncThunk<
  LoginResponse,
  {
    token: string;
    repo: CompaniesRepo;
    userStore: LocalStorage<{ token: string; id: number; name: string }>;
  }
>(
  'auth/loginWithToken',
  async ({ token, repo, userStore }, { rejectWithValue }) => {
    try {
      const result = await repo.loginWithToken(token);
      userStore.set({
        token: result.token,
        id: result.company.id,
        name: result.company.name,
      });
      return result;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Error registering company');
    }
  },
);
