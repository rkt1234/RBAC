import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Blogs from './pages/Blogs';
import CreateBlog from './pages/CreateBlog';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import AdminRoute from './components/AdminRoute';
import Navbar from './components/Navbar';
import EditBlog from './pages/EditBlog';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-center" autoClose={3000} />
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Blogs />
            </ProtectedRoute>
          } />
          <Route path="/create-blog" element={
            <AdminRoute>
              <CreateBlog />
            </AdminRoute>
          } />
          <Route path="/edit-blog/:id" element={
            <AdminRoute>
              <EditBlog />
            </AdminRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
