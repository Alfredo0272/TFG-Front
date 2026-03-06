import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Router } from '../router/router';
import { Register } from '../register/register';

export function App() {
  return (
    <div className="flex min-h-screen flex-col bg-primary text-primary-foreground">
      <Header />

      <main className="flex-1 bg-primary text-primary-foreground">
        <Router />
      </main>

      <Register />

      <Footer />
    </div>
  );
}
