import { useEffect } from 'react';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Router } from '../router/router';
import { useCompanies } from '../../hooks/use.companies';

export function App() {
  const { checkSession } = useCompanies();

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return (
    <div className="flex min-h-screen flex-col bg-primary text-primary-foreground">
      <Header />
      <main className="flex-1 bg-primary text-primary-foreground pt-16 pb-16">
        <Router />
      </main>
      <Footer />
    </div>
  );
}
