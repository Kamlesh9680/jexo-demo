import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuth = !!localStorage.getItem('token'); // Assuming token is stored in localStorage
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
