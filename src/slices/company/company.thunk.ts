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
    companyStore: LocalStorage<{
      token: string;
      id: number;
      name: string;
      createdAt: number;
    }>;
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
        createdAt: Date.now(),
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }

    if (typeof error === 'object' && error !== null && 'message' in error) {
      return rejectWithValue((error as { message: string }).message);
    }

    return rejectWithValue('Unknown error');
  }
});

export const loginWithTokenThunk = createAsyncThunk<
  LoginResponse,
  {
    token: string;
    repo: CompaniesRepo;
    companyStore: LocalStorage<{ token: string; id: number; name: string; createdAt: number }>;
  }
>(
  'auth/loginWithToken',
  async ({ token, repo, companyStore }, { rejectWithValue }) => {
    try {
      const result = await repo.loginWithToken(token);
      const existing = companyStore.get();
      companyStore.set({
        token: result.token,
        id: result.id,
        name: result.name,
        createdAt: existing?.createdAt ?? Date.now(),
      });
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      if (typeof error === 'object' && error !== null && 'message' in error) {
        return rejectWithValue((error as { message: string }).message);
      }

      return rejectWithValue('Unknown error');
    }
  },
);
