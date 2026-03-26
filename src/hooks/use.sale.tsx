import { useCallback, useMemo } from 'react';
import { AppDispatch, RootState } from '../store/store';
import { SalesRepo } from '../services/sale/api.repo.sale';
import { useDispatch, useSelector } from 'react-redux';
import { Sale, SaleRegister } from '../models/sale.model';
import { setCurrentSaleItem } from '../slices/sale/sale.slice';
import {
  createSaleThunk,
  getAllSalesThunk,
  getSalesByFactoryThunk,
} from '../slices/sale/sale.thunk';

export function useSales() {
  const dispatch = useDispatch<AppDispatch>();
  const repo = useMemo(() => new SalesRepo(), []);

  const { currentSaleItem, sales } = useSelector(
    (state: RootState) => state.saleState,
  );

  const registerSale = useCallback(
    async (newSale: SaleRegister) => {
      await dispatch(createSaleThunk({ newSale, repo })).unwrap();
      dispatch(getAllSalesThunk({ repo }));
    },
    [dispatch, repo],
  );

  const getAllSales = useCallback(() => {
    dispatch(getAllSalesThunk({ repo }));
  }, [dispatch, repo]);

  const getSalesByFactory = useCallback(
    (factoryId: number) => {
      return dispatch(getSalesByFactoryThunk({ repo, factoryId }));
    },
    [dispatch, repo],
  );

  const handleSaleDetails = useCallback(
    (sale: Sale) => {
      dispatch(setCurrentSaleItem(sale));
    },
    [dispatch],
  );

  return {
    sales,
    currentSaleItem,
    handleSaleDetails,
    registerSale,
    getAllSales,
    getSalesByFactory,
  };
}
