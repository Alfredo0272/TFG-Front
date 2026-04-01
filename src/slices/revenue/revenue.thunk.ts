import { createAsyncThunk } from '@reduxjs/toolkit';
import { RevenueRepo } from '../../services/revenue/api.repo.revenue';
import { Revenue } from '../../models/revenue.model';

export const getTotalRevenueThunk = createAsyncThunk<
  number,
  {
    repo: RevenueRepo;
  }
>('revenue/getTotalRevenue', async ({ repo }, { rejectWithValue }) => {
  try {
    const result = await repo.getTotalRevenue();
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

export const getRevenueByBeerThunk = createAsyncThunk<
  Revenue[],
  {
    repo: RevenueRepo;
  }
>('revenue/getRevenueByBeer', async ({ repo }, { rejectWithValue }) => {
  try {
    const result = await repo.getRevenueByBeer();
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

export const getRevenueByFactoryThunk = createAsyncThunk<
  Revenue[],
  {
    repo: RevenueRepo;
  }
>('revenue/getRevenueByFactory', async ({ repo }, { rejectWithValue }) => {
  try {
    const result = await repo.getRevenueByFactory();
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

export const getMonthlyRevenueThunk = createAsyncThunk<
  Revenue[],
  {
    repo: RevenueRepo;
  }
>('revenue/getMonthlyRevenue', async ({ repo }, { rejectWithValue }) => {
  try {
    const result = await repo.getMonthlyRevenue();
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

export const getMonthlyRevenueByFactoryThunk = createAsyncThunk<
  Revenue[],
  {
    repo: RevenueRepo;
    factoryId: number;
  }
>(
  'revenue/getMonthlyRevenueByFactory',
  async ({ repo, factoryId }, { rejectWithValue }) => {
    try {
      const result = await repo.getMonthlyRevenueByFactory(factoryId);
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

export const getRevenueBetweenDatesThunk = createAsyncThunk<
  number,
  {
    repo: RevenueRepo;
    start: string;
    end: string;
  }
>('revenue/range', async ({ repo, start, end }, { rejectWithValue }) => {
  try {
    const result = await repo.getRevenueBetweenDates(start, end);
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

export const getTotalProfitThunk = createAsyncThunk<
  number,
  {
    repo: RevenueRepo;
  }
>('revenue/getTotalProfit', async ({ repo }, { rejectWithValue }) => {
  try {
    const result = await repo.getTotalProfit();
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

export const getProfitByBeerThunk = createAsyncThunk<
  Revenue[],
  {
    repo: RevenueRepo;
  }
>('revenue/getProfitByBeer', async ({ repo }, { rejectWithValue }) => {
  try {
    const result = await repo.getProfitByBeer();
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

export const getProfitByFactoryThunk = createAsyncThunk<
  Revenue[],
  {
    repo: RevenueRepo;
  }
>('revenue/getProfitByFactory', async ({ repo }, { rejectWithValue }) => {
  try {
    const result = await repo.getProfitByFactory();
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

export const getTop5ProfitableBeersThunk = createAsyncThunk<
  Revenue[],
  {
    repo: RevenueRepo;
  }
>('revenue/getTop5ProfitableBeers', async ({ repo }, { rejectWithValue }) => {
  try {
    const result = await repo.getTop5ProfitableBeers();
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

export const getMothlyProfitByAllFactoriesThunk = createAsyncThunk<
  Revenue[],
  { repo: RevenueRepo }
>(
  'revenue/getMothlyProfitByAllFactories',
  async ({ repo }, { rejectWithValue }) => {
    try {
      const result = await repo.getMothlyProfitByAllFactories();
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
