import { Sale } from '../../models/sale.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createSaleThunk,
  getAllSalesThunk,
  getSalesByFactoryThunk,
} from './sale.thunk';

export type LoadState = 'idle' | 'loading' | 'error';

export type SalesState = {
  currentSaleItem: Sale | null;
  saleState: LoadState;
  sales: Sale[];
};

const initialState: SalesState = {
  currentSaleItem: null,
  saleState: 'idle',
  sales: [],
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    setCurrentSaleItem(state, { payload }: PayloadAction<Sale>) {
      state.currentSaleItem = payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(createSaleThunk.pending, (state) => {
        state.saleState = 'loading';
      })
      .addCase(getAllSalesThunk.pending, (state) => {
        state.saleState = 'loading';
      })
      .addCase(getSalesByFactoryThunk.pending, (state) => {
        state.saleState = 'loading';
      })
      .addCase(createSaleThunk.rejected, (state) => {
        state.saleState = 'error';
      })
      .addCase(getAllSalesThunk.rejected, (state) => {
        state.saleState = 'error';
      })
      .addCase(getSalesByFactoryThunk.rejected, (state) => {
        state.saleState = 'error';
      })
      .addCase(createSaleThunk.fulfilled, (state, { payload }) => {
        state.currentSaleItem = payload;
        state.saleState = 'idle';
        state.sales.push(payload);
      })
      .addCase(getAllSalesThunk.fulfilled, (state, { payload }) => {
        state.sales = payload;
        state.saleState = 'idle';
      })
      .addCase(getSalesByFactoryThunk.fulfilled, (state, { payload }) => {
        state.sales = payload;
        state.saleState = 'idle';
      });
  },
});

export const { setCurrentSaleItem } = salesSlice.actions;
export default salesSlice.reducer;
