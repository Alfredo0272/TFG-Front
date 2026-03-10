import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BeerRepo } from '../services/beers/api.repo.beers';
import { AppDispatch, RootState } from '../store/store';
import {
  loadAllBeersThunk,
  loadBeerByFactoriesThunk,
  registerBeerThunk,
} from '../slices/beer/beer.thunk';
import { Beer } from '../models/beer.model';

export function useBeers() {
  const dispatch = useDispatch<AppDispatch>();
  const repo = useMemo(() => new BeerRepo(), []);

  const { currentBeerItem, beers } = useSelector(
    (state: RootState) => state.beerState,
  );

  const registerBeer = useCallback(
    async (newBeer: Partial<Beer>) => {
      await dispatch(registerBeerThunk({ newBeer, repo })).unwrap();
    },
    [dispatch, repo],
  );

  const loadAllBeers = useCallback(() => {
    dispatch(loadAllBeersThunk({ repo }));
  }, [dispatch, repo]);

  const loadBeersByFactory = useCallback(
    (factoryId: number) => {
      dispatch(loadBeerByFactoriesThunk({ repo, factoryId }));
    },
    [dispatch, repo],
  );

  return {
    beers,
    registerBeer,
    loadAllBeers,
    currentBeerItem,
    loadBeersByFactory,
  };
}
