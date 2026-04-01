import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { RevenueRepo } from '../services/revenue/api.repo.revenue';
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
  getMothlyProfitByAllFactoriesThunk,
} from '../slices/revenue/revenue.thunk';

export function useRevenue() {
  const dispatch = useDispatch<AppDispatch>();
  const repo = useMemo(() => new RevenueRepo(), []);

  const {
    totalRevenue,
    totalProfit,
    revenueBetweenDates,
    revenueByBeer,
    revenueByFactory,
    monthlyRevenue,
    monthlyRevenueByFactory,
    profitByBeer,
    profitByFactory,
    top5ProfitableBeers,
    loadState,
    monthlyProfitByAllFactories,
  } = useSelector((state: RootState) => state.revenueState);

  const getTotalRevenue = useCallback(
    () => dispatch(getTotalRevenueThunk({ repo })),
    [dispatch, repo],
  );
  const getTotalProfit = useCallback(
    () => dispatch(getTotalProfitThunk({ repo })),
    [dispatch, repo],
  );
  const getRevenueByBeer = useCallback(
    () => dispatch(getRevenueByBeerThunk({ repo })),
    [dispatch, repo],
  );
  const getRevenueByFactory = useCallback(
    () => dispatch(getRevenueByFactoryThunk({ repo })),
    [dispatch, repo],
  );
  const getMonthlyRevenue = useCallback(
    () => dispatch(getMonthlyRevenueThunk({ repo })),
    [dispatch, repo],
  );
  const getMonthlyRevenueByFactory = useCallback(
    (factoryId: number) =>
      dispatch(getMonthlyRevenueByFactoryThunk({ repo, factoryId })),
    [dispatch, repo],
  );
  const getRevenueBetweenDates = useCallback(
    (start: string, end: string) =>
      dispatch(getRevenueBetweenDatesThunk({ repo, start, end })),
    [dispatch, repo],
  );
  const getProfitByBeer = useCallback(
    () => dispatch(getProfitByBeerThunk({ repo })),
    [dispatch, repo],
  );
  const getProfitByFactory = useCallback(
    () => dispatch(getProfitByFactoryThunk({ repo })),
    [dispatch, repo],
  );
  const getTop5ProfitableBeers = useCallback(
    () => dispatch(getTop5ProfitableBeersThunk({ repo })),
    [dispatch, repo],
  );
  const getMothlyProfitByAllFactories = useCallback(
    () => dispatch(getMothlyProfitByAllFactoriesThunk({ repo })),
    [dispatch, repo],
  );

  return {
    totalRevenue,
    totalProfit,
    revenueBetweenDates,
    revenueByBeer,
    revenueByFactory,
    monthlyRevenue,
    monthlyRevenueByFactory,
    profitByBeer,
    profitByFactory,
    top5ProfitableBeers,
    loadState,
    getTotalRevenue,
    getTotalProfit,
    getRevenueByBeer,
    getRevenueByFactory,
    getMonthlyRevenue,
    getMonthlyRevenueByFactory,
    getRevenueBetweenDates,
    getProfitByBeer,
    getProfitByFactory,
    getTop5ProfitableBeers,
    getMothlyProfitByAllFactories,
    monthlyProfitByAllFactories,
  };
}
