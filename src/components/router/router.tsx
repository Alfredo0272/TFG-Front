import { Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Register } from '../register/register';

const Dashboard = lazy(() => import('../dashboard/dashboard'));
const Login = lazy(() => import('../login/login'));
const CreateFacotry = lazy(() => import('../factories/factories.form'));

export function Router() {
  return (
    <main>
      <Suspense fallback={<p>Cargando...</p>}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-factory" element={<CreateFacotry />}></Route>
        </Routes>
      </Suspense>
    </main>
  );
}
