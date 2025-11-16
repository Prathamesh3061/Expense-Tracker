import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/users`;

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1); // Step 1: Send Email, Step 2: Reset
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
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-700 rounded-lg bg-dark-tertiary text-text-white"
                    />
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