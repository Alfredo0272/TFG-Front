import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Beer } from '../../models/beer.model';
import {
  deleteBeerThunk,
  loadAllBeersThunk,
  loadBeerByFactoriesThunk,
  loadBeerByIdThunk,
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
      .addCase(loadBeerByIdThunk.pending, (state) => {
        state.beerState = 'loading';
      })
      .addCase(loadBeerByFactoriesThunk.pending, (state) => {
        state.beerState = 'loading';
      })
      .addCase(deleteBeerThunk.pending, (state) => {
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
      .addCase(loadBeerByIdThunk.rejected, (state) => {
        state.beerState = 'error';
      })
      .addCase(deleteBeerThunk.rejected, (state) => {
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
      .addCase(loadBeerByIdThunk.fulfilled, (state, { payload }) => {
        state.currentBeerItem = payload;
        state.beerState = 'idle';
      })
      .addCase(loadBeerByFactoriesThunk.fulfilled, (state, { payload }) => {
        state.beers = payload;
        state.beerState = 'idle';
      })
      .addCase(deleteBeerThunk.fulfilled, (state, { payload }) => {
        state.beers = state.beers.filter((b) => b.id !== payload);
        state.beerState = 'idle';
      });
  },
});

export const { setCurrentBeerItem } = beerSlices.actions;
export default beerSlices.reducer;
