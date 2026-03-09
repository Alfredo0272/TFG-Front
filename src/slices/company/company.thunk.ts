import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginResponse } from '../../types/company.login';
import { Company, LoginCompany } from '../../models/company.model';
import { CompaniesRepo } from '../../services/companies/api.repo.companies';
import { LocalStorage } from '../../services/local.storage';

const getErrorMessage = (error: unknown, fallback: string): string => {
  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }

  return fallback;
};

export const loginThunk = createAsyncThunk<
  LoginResponse,
  {
    loginCompany: LoginCompany;
    repo: CompaniesRepo;
    companyStore: LocalStorage<{ token: string; id: number; name: string }>;
  }
>(
  'auth/login',
  async (
    { loginCompany, repo, companyStore: companyStore },
    { rejectWithValue },
  ) => {
    try {
      const result = await repo.login(loginCompany);

      companyStore.set({
        token: result.token,
        id: result.id,
        name: result.name,
      });
      return result;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Invalid credentials'));
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
    return rejectWithValue(getErrorMessage(error, 'Error registering company'));
  }
});

export const loginWithTokenThunk = createAsyncThunk<
  LoginResponse,
  {
    token: string;
    repo: CompaniesRepo;
    companyStore: LocalStorage<{ token: string; id: number; name: string }>;
  }
>(
  'auth/loginWithToken',
  async ({ token, repo, companyStore }, { rejectWithValue }) => {
    try {
      const result = await repo.loginWithToken(token);
      companyStore.set({
        token: result.token,
        id: result.id,
        name: result.name,
      });
      return result;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, 'Error validating company session'),
      );
    }
  },
);
