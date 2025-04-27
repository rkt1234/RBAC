import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { isAuthenticated, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/">Blogs</Link>

      {!isAuthenticated && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}

      {isAuthenticated && (
        <>
          {role === 'ADMIN' && <Link to="/create-blog">Create Blog</Link>}
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
