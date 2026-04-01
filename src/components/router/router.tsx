import { Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Register } from '../register/register';

const Dashboard = lazy(() => import('../dashboard/dashboard'));
const Login = lazy(() => import('../login/login'));
const CreateFactory = lazy(() => import('../factories/factories.form'));
const FactoryDetails = lazy(() => import('../details/factoryDetails'));
const CrearCerveza = lazy(() => import('../beers/beer.form'));
const BeerList = lazy(() => import('../lists/beerList'));
const Analytics = lazy(() => import('../analytics/analytics'));

export function Router() {
  return (
    <main>
      <Suspense fallback={<p>Cargando...</p>}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-factory" element={<CreateFactory />} />
          <Route path="/factories/:id" element={<FactoryDetails />} />
          <Route path="/factories/beer-register" element={<CrearCerveza />} />
          <Route path="/beer" element={<BeerList />}></Route>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Suspense>
    </main>
  );
}
