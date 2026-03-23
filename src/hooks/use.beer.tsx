import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BeerRepo } from '../services/beers/api.repo.beers';
import { AppDispatch, RootState } from '../store/store';
import {
  deleteBeerThunk,
  loadAllBeersThunk,
  loadBeerByFactoriesThunk,
  loadBeerByIdThunk,
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
      try {
        const createdBeer = await dispatch(
          registerBeerThunk({ newBeer, repo }),
        ).unwrap();
        return createdBeer;
      } catch (error) {
        console.error('Error registering beer:', error);
      }
    },
    [dispatch, repo],
  );
  const loadAllBeers = useCallback(() => {
    dispatch(loadAllBeersThunk({ repo }));
  }, [dispatch, repo]);

  const loadBeerById = useCallback(
    (beerId: number) => {
      dispatch(loadBeerByIdThunk({ beerId, repo }));
    },
    [dispatch, repo],
  );

  const loadBeersByFactory = useCallback(
    (factoryId: number) => {
      dispatch(loadBeerByFactoriesThunk({ repo, factoryId }));
    },
    [dispatch, repo],
  );

  const deleteBeers = useCallback(
    (beerId: number) => {
      dispatch(deleteBeerThunk({ repo, beerId }));
    },
    [dispatch, repo],
  );

  return {
    beers,
    registerBeer,
    loadAllBeers,
    loadBeerById,
    deleteBeers,
    currentBeerItem,
    loadBeersByFactory,
  };
}
