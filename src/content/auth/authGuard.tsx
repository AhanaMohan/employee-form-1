import { Navigate, useLocation } from 'react-router-dom';

export const AuthGuard = ({ children }) => {
  
  const { pathname } = useLocation();
  const token = localStorage.getItem('admin-token');


  if (!token && pathname !== '/auth/sign-in') {
    return <Navigate to="/auth/sign-in" />;
  }
  return children;
};
