import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Stock } from '../../models/stock.model';
import {
  addNewStockThunk,
  addStockThunk,
  getStockByIdThunk,
} from './stock.thunk';

export type LoadState = 'idle' | 'loading' | 'error';

export type StockState = {
  currentStockItem: Stock | null;
  stockState: LoadState;
};

const initialState: StockState = {
  currentStockItem: null,
  stockState: 'idle',
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
      .addCase(addStockThunk.rejected, (state) => {
        state.stockState = 'error';
      })
      .addCase(getStockByIdThunk.rejected, (state) => {
        state.stockState = 'error';
      })
      .addCase(addNewStockThunk.rejected, (state) => {
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
      .addCase(addNewStockThunk.fulfilled, (state, { payload }) => {
        state.currentStockItem = payload;
        state.stockState = 'idle';
      });
  },
});

export const { setCurrentStockItem } = stockSlice.actions;
export default stockSlice.reducer;
