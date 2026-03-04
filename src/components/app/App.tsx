import { Header } from '../header/header';
import { Router } from '../router/router';

export function App() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Header></Header>
      <Router></Router>
    </div>
  );
}
