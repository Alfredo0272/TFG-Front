import { Revenue } from '../../models/revenue.model';
import { createSlice } from '@reduxjs/toolkit';
import {
  getTotalRevenueThunk,
  getRevenueByBeerThunk,
  getRevenueByFactoryThunk,
  getMonthlyRevenueThunk,
  getMonthlyRevenueByFactoryThunk,
  getRevenueBetweenDatesThunk,
  getTotalProfitThunk,
  getProfitByBeerThunk,
  getProfitByFactoryThunk,
  getTop5ProfitableBeersThunk,
  getMonthlyProfitByAllFactoriesThunk,
} from './revenue.thunk';

export type LoadState = 'idle' | 'loading' | 'error';

export type RevenueState = {
  totalRevenue: number | null;
  totalProfit: number | null;
  revenueBetweenDates: number | null;
  revenueByBeer: Revenue[];
  revenueByFactory: Revenue[];
  monthlyRevenue: Revenue[];
  monthlyRevenueByFactory: Revenue[];
  profitByBeer: Revenue[];
  profitByFactory: Revenue[];
  top5ProfitableBeers: Revenue[];
  loadState: LoadState;
  monthlyProfitByAllFactories: Revenue[];
};

const initialState: RevenueState = {
  totalRevenue: null,
  totalProfit: null,
  revenueBetweenDates: null,
  revenueByBeer: [],
  revenueByFactory: [],
  monthlyRevenue: [],
  monthlyRevenueByFactory: [],
  profitByBeer: [],
  profitByFactory: [],
  top5ProfitableBeers: [],
  loadState: 'idle',
  monthlyProfitByAllFactories: [],
};

const revenueSlice = createSlice({
  name: 'revenue',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const pending = (state: RevenueState) => {
      state.loadState = 'loading';
    };
    const rejected = (state: RevenueState) => {
      state.loadState = 'error';
    };

    builder
      .addCase(getTotalRevenueThunk.pending, pending)
      .addCase(getTotalRevenueThunk.rejected, rejected)
      .addCase(getTotalRevenueThunk.fulfilled, (state, { payload }) => {
        state.loadState = 'idle';
        state.totalRevenue = payload;
      })
      .addCase(getTotalProfitThunk.pending, pending)
      .addCase(getTotalProfitThunk.rejected, rejected)
      .addCase(getTotalProfitThunk.fulfilled, (state, { payload }) => {
        state.loadState = 'idle';
        state.totalProfit = payload;
      })
      .addCase(getRevenueByBeerThunk.fulfilled, (state, { payload }) => {
        state.loadState = 'idle';
        state.revenueByBeer = payload;
      })
      .addCase(getRevenueByFactoryThunk.fulfilled, (state, { payload }) => {
        state.loadState = 'idle';
        state.revenueByFactory = payload;
      })
      .addCase(getMonthlyRevenueThunk.fulfilled, (state, { payload }) => {
        state.loadState = 'idle';
        state.monthlyRevenue = payload;
      })
      .addCase(
        getMonthlyRevenueByFactoryThunk.fulfilled,
        (state, { payload }) => {
          state.loadState = 'idle';
          state.monthlyRevenueByFactory = payload;
        },
      )
      .addCase(getRevenueBetweenDatesThunk.fulfilled, (state, { payload }) => {
        state.loadState = 'idle';
        state.revenueBetweenDates = payload;
      })
      .addCase(getProfitByBeerThunk.fulfilled, (state, { payload }) => {
        state.loadState = 'idle';
        state.profitByBeer = payload;
      })
      .addCase(getProfitByFactoryThunk.fulfilled, (state, { payload }) => {
        state.loadState = 'idle';
        state.profitByFactory = payload;
      })
      .addCase(getTop5ProfitableBeersThunk.fulfilled, (state, { payload }) => {
        state.loadState = 'idle';
        state.top5ProfitableBeers = payload;
      })
      .addCase(
        getMonthlyProfitByAllFactoriesThunk.fulfilled,
        (state, { payload }) => {
          state.loadState = 'idle';
          state.monthlyProfitByAllFactories = payload;
        },
      );
  },
});

export default revenueSlice.reducer;
