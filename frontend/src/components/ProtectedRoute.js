import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, requiredUserType }) {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const token = localStorage.getItem('token');

  if (!user || !token) {
    return <Navigate to="/signin" replace />;
  }

  if (requiredUserType && user.userType !== requiredUserType) {
    const redirectPath = user.userType === 'FARMER' ? '/farmer' : '/apartment';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}

export default ProtectedRoute;
