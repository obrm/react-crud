import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children, user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/not-found');
    }
  }, [user, navigate]);

  return children;
};
export default ProtectedRoute;