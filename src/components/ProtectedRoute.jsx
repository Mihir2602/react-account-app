import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // if Not logged in then, send the user to login page.
    return <Navigate to="/login" replace />;
  }

  // if Logged in then render the protected content.
  return children;
};

export default ProtectedRoute;
