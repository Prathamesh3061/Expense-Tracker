import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGlobalContext } from './context/GlobalContext';
import ForgotPassword from './pages/ForgotPassword';

// Import Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Income from './pages/Income';
import Expenses from './pages/Expenses';

// Import Protected Route
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { token } = useGlobalContext();

  return (
    <Router>
      <ToastContainer position="top-center" autoClose={3000} />
      
      <Routes>
        {/* --- Public Routes (Login/Register) --- */}
        <Route 
          path="/login" 
          element={token ? <Navigate to="/" /> : <Login />} 
        />
        <Route 
          path="/register" 
          element={token ? <Navigate to="/" /> : <Register />} 
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* --- Protected Routes (App) --- */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expenses" element={<Expenses />} />
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;