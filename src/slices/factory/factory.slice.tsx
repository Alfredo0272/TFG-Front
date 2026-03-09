import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Factory } from '../../models/factory.model';
import {
  createFactoryThunk,
  loadFactoriesThunk,
  loadFactoryByIdThunk,
} from './factory.thunk';

export type LoadState = 'idle' | 'loading' | 'error';

export type FactorieState = {
  currentFactoryItem: Factory | null;
  factoryState: LoadState;
  factories: Factory[];
};

const initialState: FactorieState = {
  currentFactoryItem: null,
  factoryState: 'idle',
  factories: [],
};

const factoriesSlice = createSlice({
  name: 'factories',
  initialState,
  reducers: {
    setCurrentFactoryItem(state, { payload }: PayloadAction<Factory>) {
      state.currentFactoryItem = payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(createFactoryThunk.pending, (state) => {
        state.factoryState = 'loading';
      })

      .addCase(loadFactoriesThunk.pending, (state) => {
        state.factoryState = 'loading';
      })

      .addCase(loadFactoryByIdThunk.pending, (state) => {
        state.factoryState = 'loading';
      })

      .addCase(loadFactoriesThunk.rejected, (state) => {
        state.factoryState = 'error';
      })

      .addCase(createFactoryThunk.rejected, (state) => {
        state.factoryState = 'error';
      })

      .addCase(loadFactoryByIdThunk.rejected, (state) => {
        state.factoryState = 'error';
      })

      .addCase(createFactoryThunk.fulfilled, (state, { payload }) => {
        state.currentFactoryItem = payload;
        state.factoryState = 'idle';
        state.factories.push(payload);
      })

      .addCase(loadFactoriesThunk.fulfilled, (state, { payload }) => {
        state.factories = payload;
        state.factoryState = 'idle';
      })

      .addCase(loadFactoryByIdThunk.fulfilled, (state, { payload }) => {
        state.currentFactoryItem = payload;

        const exists = state.factories.find((f) => f.id === payload.id);

        if (!exists) {
          state.factories.push(payload);
        }

        state.factoryState = 'idle';
      });
  },
});

export const { setCurrentFactoryItem } = factoriesSlice.actions;

export default factoriesSlice.reducer;
