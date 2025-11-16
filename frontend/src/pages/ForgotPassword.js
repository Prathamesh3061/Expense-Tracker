import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/users`;

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false); // State for visibility
  const navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/forgotpassword`, { email });
      toast.success('OTP sent to email!');
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to send OTP');
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/resetpassword`, { email, otp, password });
      toast.success('Password Reset Successfully! Login now.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to reset password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-dark-secondary p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-6 text-text-white">
            {step === 1 ? 'Forgot Password' : 'Reset Password'}
        </h2>

        {step === 1 ? (
            <form onSubmit={sendOtp}>
                <div className="mb-4">
                    <label className="block mb-2 text-text-light">Enter your Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-700 rounded-lg bg-dark-tertiary text-text-white"
                    />
                </div>
                <button type="submit" className="w-full p-3 rounded-lg bg-primary text-text-white font-bold hover:bg-primary-hover">
                    Send OTP
                </button>
            </form>
        ) : (
            <form onSubmit={resetPassword}>
                <div className="mb-4">
                    <label className="block mb-2 text-text-light">Enter OTP</label>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-700 rounded-lg bg-dark-tertiary text-text-white"
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block mb-2 text-text-light">New Password</label>
                    
                    {/* RELATIVE CONTAINER FOR EYE ICON */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"} // Toggle type
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-700 rounded-lg bg-dark-tertiary text-text-white pr-10"
                        />
                        
                        {/* EYE ICON BUTTON */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-light hover:text-white focus:outline-none"
                        >
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                <button type="submit" className="w-full p-3 rounded-lg bg-success text-text-white font-bold hover:bg-green-600">
                    Change Password
                </button>
            </form>
        )}
        <div className="mt-4 text-center">
            <Link to="/login" className="text-primary">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;