import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FactoriesRepo } from '../services/factorys/api.repo.factorys';
import { AppDispatch, RootState } from '../store/store';
import {
  createFactoryThunk,
  loadFactoriesThunk,
  loadFactoryByIdThunk,
} from '../slices/factory/factory.thunk';
import { Factory } from '../models/factory.model';
import { setCurrentFactoryItem } from '../slices/factory/factory.slice';

export function useFactories() {
  const dispatch = useDispatch<AppDispatch>();
  const repo = useMemo(() => new FactoriesRepo(), []);

  const { currentFactoryItem, factories } = useSelector(
    (state: RootState) => state.factoryState,
  );

  const registerFactory = useCallback(
    async (newFactory: Partial<Factory>) => {
      await dispatch(createFactoryThunk({ newFactory, repo })).unwrap();
    },
    [dispatch, repo],
  );

  const loadFactories = useCallback(() => {
    dispatch(loadFactoriesThunk({ repo }));
  }, [dispatch, repo]);

  const loadFactoryById = useCallback(
    (id: number) => {
      dispatch(loadFactoryByIdThunk({ id, repo }));
    },
    [dispatch, repo],
  );

  const handleFactoryDetails = useCallback(
    (factory: Factory) => {
      dispatch(setCurrentFactoryItem(factory));
    },
    [dispatch],
  );

  return {
    factories,
    currentFactoryItem,
    registerFactory,
    loadFactories,
    loadFactoryById,
    handleFactoryDetails,
  };
}
