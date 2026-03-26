import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import companieReducer from '../slices/company/company.slice';
import factoryReducer from '../slices/factory/factory.slice';
import beerReducer from '../slices/beer/beer.slice';
import stockReducer from '../slices/stock/stock.slice';
import saleReducer from '../slices/sale/sale.slice';

export const appStore = configureStore({
  reducer: {
    companieState: companieReducer,
    factoryState: factoryReducer,
    beerState: beerReducer,
    stockState: stockReducer,
    saleState: saleReducer,
  },
});

export type AppDispatch = typeof appStore.dispatch;
export type RootState = ReturnType<typeof appStore.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
