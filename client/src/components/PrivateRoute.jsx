import { Navigate, Route } from 'react-router-dom';
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ roles, ...props }) => {
  const { isAuthenticated, role } = useAuth();

  // Check if the user is authenticated and has the required role
  if (!isAuthenticated || (roles && !roles.includes(role))) {
    return <Navigate to="/login" />;
  }

  return <Route {...props} />;
};

export default PrivateRoute;
