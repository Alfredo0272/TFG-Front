import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import companieReducer from '../slices/company/company.slice';

export const appStore = configureStore({
  reducer: {
    companieState: companieReducer,
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
