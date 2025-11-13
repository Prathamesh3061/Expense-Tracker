import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const API_URL = `${BASE_URL}/api/users/login`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(API_URL, { email, password });
      localStorage.setItem('userToken', data.token);
      toast.success('Login successful!');
      
      window.location.href = '/'; // Simple reload to trigger context
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form 
        onSubmit={handleSubmit}
        className="bg-dark-secondary p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-center text-2xl font-bold mb-6 text-text-white">Login</h2>
        
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-text-light">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-700 rounded-lg bg-dark-tertiary text-text-white"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-text-light">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-700 rounded-lg bg-dark-tertiary text-text-white"
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full p-3 rounded-lg bg-primary text-text-white font-bold transition-colors hover:bg-primary-hover"
        >
          Login
        </button>
        
        <span className="block text-center mt-6 text-text-light">
          Don't have an account? 
          <Link to="/register" className="text-primary hover:underline ml-1">
            Register
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Login;