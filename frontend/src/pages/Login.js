import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useGlobalContext } from '../context/GlobalContext';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const API_URL = `${BASE_URL}/api/users/login`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // 1. Add State for Visibility
  const [showPassword, setShowPassword] = useState(false); 
  
  const navigate = useNavigate();
  const { setAuthToken } = useGlobalContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(API_URL, { email, password });
      setAuthToken(data.token);
      toast.success('Login successful!');
      navigate('/');
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
          
          {/* 2. Wrap Input in Relative Div */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} // 3. Toggle Type
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-700 rounded-lg bg-dark-tertiary text-text-white pr-10" // Added pr-10 for space
            />
            
            {/* 4. The Eye Button */}
            <button
              type="button" // Important: prevents form submission
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-light hover:text-white cursor-pointer"
            >
              {showPassword ? (
                 // Eye Open Icon (SVG)
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                   <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                 </svg>
              ) : (
                 // Eye Closed Icon (SVG)
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                 </svg>
              )}
            </button>
          </div>
        </div>
        
        <button 
          type="submit" 
          className="w-full p-3 rounded-lg bg-primary text-text-white font-bold transition-colors hover:bg-primary-hover"
        >
          Login
        </button>
        
        <div className="text-right mt-4">
             <Link to="/forgot-password" class="text-sm text-primary hover:underline">Forgot Password?</Link>
        </div>

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