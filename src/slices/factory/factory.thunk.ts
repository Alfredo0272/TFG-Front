import { createAsyncThunk } from '@reduxjs/toolkit';
import { Factory } from '../../models/factory.model';
import { FactoriesRepo } from '../../services/factorys/api.repo.factorys';

export const createFactoryThunk = createAsyncThunk<
  Factory,
  {
    newFactory: Partial<Factory>;
    repo: FactoriesRepo;
  }
>('factories/register', async ({ newFactory, repo }, { rejectWithValue }) => {
  try {
    const result = await repo.createFactory(newFactory);
    return result;
  } catch (error) {
    console.error(error);
    return rejectWithValue('Error registering factory');
  }
});

export const loadFactoriesThunk = createAsyncThunk<
  Factory[],
  { repo: FactoriesRepo }
>('factories/load', async ({ repo }, { rejectWithValue }) => {
  try {
    const result = await repo.getAllFactories();
    return result;
  } catch (error) {
    console.error(error);
    return rejectWithValue('Error loading factories');
  }
});

export const loadFactoryByIdThunk = createAsyncThunk<
  Factory,
  {
    repo: FactoriesRepo;
    id: number;
  }
>('factories/loadById', async ({ repo, id }, { rejectWithValue }) => {
  try {
    const result = await repo.getFactoryById(id);
    return result;
  } catch (error) {
    console.error(error);
    return rejectWithValue('Error loading factory');
  }
});
