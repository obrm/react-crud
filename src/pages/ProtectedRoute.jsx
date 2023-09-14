import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children, user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/not-found');
    }
  }, [user, navigate]);

  // if (!user) {
  //   return <Navigate to={'/not-found'} replace />;
  // }

  return children;
};
export default ProtectedRoute;