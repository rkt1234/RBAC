import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function AdminRoute({ children }) {
  const { isAuthenticated, role, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || role !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;
