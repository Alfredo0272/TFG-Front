import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Stock } from '../../models/stock.model';
import {
  addNewStockThunk,
  addStockThunk,
  getStockByBeerIdThunk,
  getStockByIdThunk,
} from './stock.thunk';

export type LoadState = 'idle' | 'loading' | 'error';

export type StockState = {
  currentStockItem: Stock | null;
  stockState: LoadState;
  stocks: Stock[];
};

const initialState: StockState = {
  currentStockItem: null,
  stockState: 'idle',
  stocks: [],
};

const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    setCurrentStockItem(state, { payload }: PayloadAction<Stock>) {
      state.currentStockItem = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addStockThunk.pending, (state) => {
        state.stockState = 'loading';
      })
      .addCase(getStockByIdThunk.pending, (state) => {
        state.stockState = 'loading';
      })
      .addCase(addNewStockThunk.pending, (state) => {
        state.stockState = 'loading';
      })
      .addCase(getStockByBeerIdThunk.pending, (state) => {
        state.stockState = 'loading';
      })
      .addCase(addStockThunk.rejected, (state) => {
        state.stockState = 'error';
      })
      .addCase(getStockByIdThunk.rejected, (state) => {
        state.stockState = 'error';
      })
      .addCase(addNewStockThunk.rejected, (state) => {
        state.stockState = 'error';
      })
      .addCase(getStockByBeerIdThunk.rejected, (state) => {
        state.stockState = 'error';
      })
      .addCase(addStockThunk.fulfilled, (state, { payload }) => {
        state.stockState = 'idle';
        state.currentStockItem = payload;
      })
      .addCase(getStockByIdThunk.fulfilled, (state, { payload }) => {
        state.currentStockItem = payload;
        state.stockState = 'idle';
      })
      .addCase(getStockByBeerIdThunk.fulfilled, (state, { payload }) => {
        state.stockState = 'idle';
        const incomingIds = new Set(payload.map((s) => s.beerId));
        const filtered = state.stocks.filter((s) => !incomingIds.has(s.beerId));
        state.stocks = [...filtered, ...payload];
      })
      .addCase(addNewStockThunk.fulfilled, (state, { payload }) => {
        state.stockState = 'idle';
        const index = state.stocks.findIndex((s) => s.id === payload.id);
        if (index !== -1) {
          state.stocks[index] = payload;
        } else {
          state.stocks.push(payload);
        }
      });
  },
});

export const { setCurrentStockItem } = stockSlice.actions;
export default stockSlice.reducer;
