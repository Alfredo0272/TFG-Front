import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Beer } from '../../models/beer.model';
import {
  loadAllBeersThunk,
  loadBeerByFactoriesThunk,
  registerBeerThunk,
} from './beer.thunk';

export type LoadState = 'idle' | 'loading' | 'error';

export type Beerstate = {
  currentBeerItem: Beer | null;
  beerState: LoadState;
  beers: Beer[];
};

const initialState: Beerstate = {
  currentBeerItem: null,
  beerState: 'idle',
  beers: [],
};

const beerSlices = createSlice({
  name: 'beers',
  initialState,
  reducers: {
    setCurrentBeerItem(state, { payload }: PayloadAction<Beer>) {
      state.currentBeerItem = payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(loadAllBeersThunk.pending, (state) => {
        state.beerState = 'loading';
      })
      .addCase(registerBeerThunk.pending, (state) => {
        state.beerState = 'loading';
      })
      .addCase(loadBeerByFactoriesThunk.pending, (state) => {
        state.beerState = 'loading';
      })
      .addCase(loadAllBeersThunk.rejected, (state) => {
        state.beerState = 'error';
      })
      .addCase(registerBeerThunk.rejected, (state) => {
        state.beerState = 'error';
      })
      .addCase(loadBeerByFactoriesThunk.rejected, (state) => {
        state.beerState = 'error';
      })
      .addCase(loadAllBeersThunk.fulfilled, (state, { payload }) => {
        state.beers = payload;
        state.beerState = 'idle';
      })
      .addCase(registerBeerThunk.fulfilled, (state, { payload }) => {
        state.currentBeerItem = payload;
        state.beerState = 'idle';
        state.beers.push(payload);
      })
      .addCase(loadBeerByFactoriesThunk.fulfilled, (state, { payload }) => {
        state.beers = payload;
        state.beerState = 'idle';
      });
  },
});

export const { setCurrentBeerItem } = beerSlices.actions;
export default beerSlices.reducer;
