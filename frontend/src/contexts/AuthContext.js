import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    setIsAuthenticated(!!token);
    setRole(userRole);
    setLoading(false);
  }, []);

  const login = (token, userRole) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', userRole);
    setIsAuthenticated(true);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
