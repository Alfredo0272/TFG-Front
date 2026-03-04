import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const Dashboard = lazy(() => import('../dashboard/dashboard'));

export function Router() {
  return (
    <main>
      <Suspense fallback={<p>Cargando...</p>}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </main>
  );
}
