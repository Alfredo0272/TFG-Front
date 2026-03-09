import { useEffect } from 'react';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Router } from '../router/router';
import { useCompanies } from '../../hooks/use.companies';

export function App() {
  const { loginWithToken } = useCompanies();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      loginWithToken();
    }
  }, [loginWithToken]);

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
