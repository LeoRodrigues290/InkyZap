/* eslint-disable react-refresh/only-export-components */
import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, Outlet, Navigate } from 'react-router-dom';

import MainLayout from '../layouts/main-layout';
import AuthLayout from '../layouts/auth-layout';
import Splash    from '../components/loader/Splash';
import PageLoader from '../components/loader/PageLoader';
import { useAuth } from '../components/hooks/useAuth';

const Dashboard = lazy(() => import('../pages/dashboard'));
const Signin   = lazy(() => import('../pages/authentication/Signin'));
const Signup   = lazy(() => import('../pages/authentication/Signup'));

// Guard para admin (exemplo)
function AdminGuard({ children }: { children: JSX.Element }) {
  const { user, claims } = useAuth();
  if (!user || !claims?.admin) {
    // se não for admin, manda pra login de cliente
    return <Navigate to="/auth/signin" replace />;
  }
  return children;
}

// Guard para cliente (exemplo)
function ClientGuard({ children }: { children: JSX.Element }) {
  const { user, claims } = useAuth();
  if (!user || claims?.admin) {
    // se for admin ou não logado, manda pra admin ou signin
    return <Navigate to="/admin" replace />;
  }
  return children;
}

const router = createBrowserRouter(
    [
      // rota base que carrega o App "slot"
      {
        element: (
            <Suspense fallback={<Splash />}>
              {/* aqui poderia ser um <App /> se você tiver um componente wrapper */}
              <Outlet />
            </Suspense>
        ),
        children: [
          // === Área Admin (/admin/*) ===
          {
            path: '/admin',
            element: (
                <AdminGuard>
                  <MainLayout />
                </AdminGuard>
            ),
            children: [
              {
                index: true,
                element: <Dashboard />,
              },
              // outras rotas de admin (ex: /admin/clientes, /admin/planos, etc.)
            ],
          },

          // === Área de Autenticação (/auth/*) ===
          {
            path: '/auth',
            element: (
                <AuthLayout>
                  <Outlet />
                </AuthLayout>
            ),
            children: [
              {
                path: 'signin',
                element: (
                    <Suspense fallback={<PageLoader />}>
                      <Signin />
                    </Suspense>
                ),
              },
              {
                path: 'signup',
                element: (
                    <Suspense fallback={<PageLoader />}>
                      <Signup />
                    </Suspense>
                ),
              },
            ],
          },

          // === Área Cliente (/app/*) ===
          {
            path: '/app',
            element: (
                <ClientGuard>
                  <MainLayout />
                </ClientGuard>
            ),
            children: [
              {
                index: true,
                element: <Dashboard />,
              },
              // demais rotas de cliente (ex: /app/mensagens, /app/templates, etc.)
            ],
          },

          // qualquer outra URL cai aqui
          { path: '*', element: <Navigate to="/auth/signin" replace /> },
        ],
      },
    ],
    {
      // basename padrão "/"
    }
);

export default router;
