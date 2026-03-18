import { createAsyncThunk } from '@reduxjs/toolkit';
import { Stock } from '../../models/stock.model';
import { StockRepo } from '../../services/stock/api.repo.stock';

export const addStockThunk = createAsyncThunk<
  Stock,
  {
    newStock: Partial<Stock>;
    repo: StockRepo;
  },
  {
    rejectValue: string;
  }
>('NewStock', async ({ newStock, repo }, { rejectWithValue }) => {
  try {
    const result = await repo.registerStock(newStock);
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

export const getStockByIdThunk = createAsyncThunk<
  Stock,
  {
    id: number;
    repo: StockRepo;
  },
  {
    rejectValue: string;
  }
>('StockById/load', async ({ id, repo }, { rejectWithValue }) => {
  try {
    const result = await repo.getStockById(id);
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

export const getStockByBeerIdThunk = createAsyncThunk<
  Stock[],
  { beerId: number; repo: StockRepo },
  { rejectValue: string }
>('Stock/getByBeerId', async ({ beerId, repo }, { rejectWithValue }) => {
  try {
    const result = await repo.getStockByBeerId(beerId);
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

export const addNewStockThunk = createAsyncThunk<
  Stock,
  {
    id: number;
    newStock: Partial<Stock>;
    repo: StockRepo;
  },
  {
    rejectValue: string;
  }
>('AddNewStock', async ({ id, newStock, repo }, { rejectWithValue }) => {
  try {
    const result = await repo.addNewStock(id, newStock);
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
