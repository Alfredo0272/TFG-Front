import { useEffect } from 'react';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Router } from '../router/router';
import { useCompanies } from '../../hooks/use.companies';
import { useNavigate, useLocation } from 'react-router-dom';
import { LocalStorage } from '../../services/local.storage';

export function App() {
  const { loginWithToken } = useCompanies();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const companyStore = new LocalStorage<{
      token: string;
      id: number;
      name: string;
    }>('company');

    const company = companyStore.get();

    if (!company?.token) {
      if (location.pathname !== '/login' && location.pathname !== '/register') {
        navigate('/login');
      }
      return;
    }

    loginWithToken();
  }, [loginWithToken, navigate, location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-primary text-primary-foreground">
      <Header />
      <main className="flex-1 bg-primary text-primary-foreground">
        <Router />
      </main>
      <Footer />
    </div>
  );
}
