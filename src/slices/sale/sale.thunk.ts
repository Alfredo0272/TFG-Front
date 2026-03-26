import { createAsyncThunk } from '@reduxjs/toolkit';
import { Sale, SaleRegister } from '../../models/sale.model';
import { SalesRepo } from '../../services/sale/api.repo.sale';

export const createSaleThunk = createAsyncThunk<
  Sale,
  {
    newSale: SaleRegister;
    repo: SalesRepo;
  }
>('sale/register', async ({ newSale, repo }, { rejectWithValue }) => {
  try {
    const result = await repo.createSale(newSale);
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

export const getAllSalesThunk = createAsyncThunk<
  Sale[],
  {
    repo: SalesRepo;
  }
>('sale/load', async ({ repo }, { rejectWithValue }) => {
  try {
    const result = await repo.getAllSales();
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

export const getSalesByFactoryThunk = createAsyncThunk<
  Sale[],
  {
    repo: SalesRepo;
    factoryId: number;
  }
>('sale/loadByFactory', async ({ repo, factoryId }, { rejectWithValue }) => {
  try {
    const result = await repo.getSalesByFactory(factoryId);
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
