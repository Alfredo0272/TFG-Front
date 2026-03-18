import { Beer } from '../../models/beer.model';
import { BeerRepo } from '../../services/beers/api.repo.beers';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadAllBeersThunk = createAsyncThunk<
  Beer[],
  { repo: BeerRepo },
  { rejectValue: string }
>('AllBeers/load', async ({ repo }, { rejectWithValue }) => {
  try {
    const result = await repo.getAllBeers();
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

export const registerBeerThunk = createAsyncThunk<
  Beer,
  { newBeer: Partial<Beer>; repo: BeerRepo },
  { rejectValue: string }
>('RegisterNewBeer', async ({ newBeer, repo }, { rejectWithValue }) => {
  try {
    const result = await repo.registerBeers(newBeer);
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

export const loadBeerByIdThunk = createAsyncThunk<
  Beer,
  { repo: BeerRepo; beerId: number },
  { rejectValue: string }
>('BeerById/load', async ({ repo, beerId }, { rejectWithValue }) => {
  try {
    const result = await repo.getBeerById(beerId);
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

export const loadBeerByFactoriesThunk = createAsyncThunk<
  Beer[],
  { repo: BeerRepo; factoryId: number },
  { rejectValue: string }
>('BeerByFactory/load', async ({ repo, factoryId }, { rejectWithValue }) => {
  try {
    const result = await repo.getBeerByFactory(factoryId);
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
