import { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CompaniesRepo } from '../services/companies/api.repo.companies';
import { AppDispatch } from '../store/store';
import { LoginCompany } from '../models/company.model';
import {
  loginThunk,
  loginWithTokenThunk,
  registerCompanyThunk,
} from '../slices/company/company.thunk';
import { LocalStorage } from '../services/local.storage';
import { Company } from '../models/company.model';
import { logout } from '../slices/company/company.slice';
import { useNavigate, useLocation } from 'react-router-dom';

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

export function useCompanies() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch<AppDispatch>();
  const repo = useMemo(() => new CompaniesRepo(), []);

  const companyStore = useMemo(
    () =>
      new LocalStorage<{
        token: string;
        id: number;
        name: string;
        createdAt: number;
      }>('company'),
    [],
  );

  const login = useCallback(
    async (loginCompany: LoginCompany) => {
      setLoading(true);

      try {
        await dispatch(
          loginThunk({ loginCompany, repo, companyStore }),
        ).unwrap();
      } finally {
        setLoading(false);
      }
    },
    [dispatch, repo, companyStore],
  );

  const loginWithToken = useCallback(() => {
    const companyStoreData = companyStore.get();

    if (companyStoreData) {
      const { token } = companyStoreData;

      dispatch(
        loginWithTokenThunk({
          token,
          repo,
          companyStore,
        }),
      );
    }
  }, [dispatch, repo, companyStore]);

  const register = useCallback(
    async (newCompany: Partial<Company>) => {
      setLoading(true);

      try {
        await dispatch(registerCompanyThunk({ newCompany, repo })).unwrap();
      } finally {
        setLoading(false);
      }
    },
    [dispatch, repo],
  );

  const makeLogOut = useCallback(() => {
    dispatch(logout());
    companyStore.remove();
    navigate('/login');
  }, [dispatch, companyStore, navigate]);

  const checkSession = useCallback(() => {
    const company = companyStore.get();
    const expired = !company?.createdAt || Date.now() - company.createdAt > SEVEN_DAYS;

    if (!company?.token || expired) {
      companyStore.remove();
      if (location.pathname !== '/login' && location.pathname !== '/register') {
        navigate('/login');
      }
      return;
    }

    loginWithToken();

    if (location.pathname === '/login' || location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [companyStore, location.pathname, navigate, loginWithToken]);

  return {
    loading,
    login,
    loginWithToken,
    register,
    makeLogOut,
    checkSession,
  };
}
