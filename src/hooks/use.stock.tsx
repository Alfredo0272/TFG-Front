import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { StockRepo } from '../services/stock/api.repo.stock';
import {
  addNewStockThunk,
  addStockThunk,
  getStockByBeerIdThunk,
  getStockByIdThunk,
} from '../slices/stock/stock.thunk';
import { Stock } from '../models/stock.model';

export function useStock() {
  const dispatch = useDispatch<AppDispatch>();
  const repo = useMemo(() => new StockRepo(), []);

  const { currentStockItem, stocks } = useSelector(
    (state: RootState) => state.stockState,
  );

  const getStockById = useCallback(
    (id: number) => {
      dispatch(getStockByIdThunk({ id, repo }));
    },
    [dispatch, repo],
  );

  const getStockByBeerId = useCallback(
    (beerId: number) => {
      dispatch(getStockByBeerIdThunk({ beerId, repo }));
    },
    [dispatch, repo],
  );

  const addStock = useCallback(
    (newStock: Partial<Stock>) => {
      dispatch(addStockThunk({ newStock, repo }));
    },
    [dispatch, repo],
  );

  const addNewStock = useCallback(
    (id: number, newStock: Partial<Stock>) => {
      dispatch(addNewStockThunk({ id, newStock, repo }));
    },
    [dispatch, repo],
  );

  return {
    currentStockItem,
    stocks,
    getStockById,
    getStockByBeerId,
    addStock,
    addNewStock,
  };
}
