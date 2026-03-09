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

export function useCompanies() {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const repo = useMemo(() => new CompaniesRepo(), []);

  const companyStore = useMemo(
    () =>
      new LocalStorage<{
        token: string;
        id: number;
        name: string;
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
          userStore: companyStore,
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

  return {
    loading,
    login,
    loginWithToken,
    register,
  };
}
