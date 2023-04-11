import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';
import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';
import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Auth
const SignIn = Loader(lazy(() => import('src/content/auth')));

// Dashboards
const Dashboard = Loader(lazy(() => import('src/content/dashboards/Dashboard/Dashboard')));
const EmployeeMgmt = Loader(lazy(() => import('src/content/dashboards/EmployeeMgmt')));

// Status
const Status404 = Loader(lazy(() => import('src/content/pages/Status/Status404')));

const routes: RouteObject[] = [
  
  // Auth Pages Routes
  {
    path: 'auth',
    element: <BaseLayout />,
    children: [
      { path: '/auth/sign-in', element: <SignIn /> },
    ]
  },
  // Dashboards Pages Routes
  {
    path: '/',
    element:<Navigate to="/dashboard" />,
  },
  {
    path: '/',
    element: <SidebarLayout />,   
    children: [
      { path: '', element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'employee-mgmt', element: <EmployeeMgmt /> }, 
      
    ]
  },
  //Not Found Page Routes
  { path: '*', element: <Status404 /> },
];

export default routes;
