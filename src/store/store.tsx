import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import companieReducer from '../slices/company/company.slice';
import factoryReducer from '../slices/factory/factory.slice';

export const appStore = configureStore({
  reducer: {
    companieState: companieReducer,
    factoryState: factoryReducer,
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
