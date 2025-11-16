import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

// Base URL for your backend
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const API_URL = `${BASE_URL}/api/`;
const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('userToken') || '');

  // --- Axios instance with Auth Header ---
  const api = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // --- Update token in state and localStorage ---
  const setAuthToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('userToken', newToken);
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  };

  // --- Fetch User Profile ---
  const fetchUserProfile = async () => {
    try {
      const { data } = await api.get('users/profile');
      setUser(data.data);
    } catch (err) {
      console.error('Failed to fetch user profile', err);
      // If token is invalid, log out
      logout();
    }
  };

  // --- Fetch All Transactions ---
  const fetchTransactions = async () => {
    try {
      const { data } = await api.get('transactions');
      setTransactions(data.data);
    } catch (err) {
      setError('Failed to fetch transactions');
      toast.error('Failed to fetch transactions');
    }
  };

  // --- Fetch data on initial load ---
  useEffect(() => {
    if (token) {
      setLoading(true);
      Promise.all([fetchUserProfile(), fetchTransactions()])
        .catch((err) => {
          setError('Failed to load data.');
          toast.error('Failed to load data.');
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false); // No token, not loading
    }
     // eslint-disable-next-line
  }, [token]); 
  
  // Re-run if token changes

  // --- Add Transaction ---
const addTransaction = async (description, amount, categoryIcon) => {
    try {
      // Send categoryIcon in the body
      const { data } = await api.post('transactions', { 
        description, 
        amount, 
        categoryIcon 
      });
      
      setTransactions([data.data, ...transactions]);
      toast.success('Transaction added!');
    } catch (err) {
      setError('Failed to add transaction');
      toast.error(err.response?.data?.error || 'Failed to add transaction');
    }
  };

  // --- Delete Transaction ---
  const deleteTransaction = async (id) => {
    try {
      await api.delete(`transactions/${id}`);
      setTransactions(transactions.filter((t) => t._id !== id));
      toast.success('Transaction deleted!');
    } catch (err) {
      setError('Failed to delete transaction');
      toast.error(err.response?.data?.error || 'Failed to delete transaction');
    }
  };

  // --- Logout User ---
  const logout = () => {
    setUser(null);
    setToken('');
    setTransactions([]);
    localStorage.removeItem('userToken');
    toast.info('You have been logged out.');
  };

  // --- Delete User Account ---
  const deleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This will PERMANENTLY delete all your income and expense data. This cannot be undone.");
    
    if (confirmDelete) {
      try {
        await api.delete('users/delete-me');
        toast.success('Account deleted successfully');
        logout(); // Log them out and clear the token
      } catch (err) {
        toast.error(err.response?.data?.error || 'Failed to delete account');
      }
    }
  };

  // --- Calculations ---
  // (DELETE THE OLD CALCULATIONS AND REPLACE WITH THIS)
  
  const incomes = transactions.filter((t) => t.type === 'income');
  const expenses = transactions.filter((t) => t.type === 'expense');

  const totalIncome = incomes
    .reduce((acc, item) => (acc += item.amount), 0)
    .toFixed(2);

  const totalExpense = Math.abs(
    expenses.reduce((acc, item) => (acc += item.amount), 0)
  ).toFixed(2);

  const totalBalance = (totalIncome - totalExpense).toFixed(2);

  // --- Data for Dashboard ---
  const recentIncomes = incomes.slice(0, 3);
  const recentExpenses = expenses.slice(0, 3);

  // Data for 30-Day Bar Chart
  const last30DaysExpenses = () => {
    const today = moment();
    const labels = [];
    const data = [];

    // Get last 30 days
    for (let i = 29; i >= 0; i--) {
      const date = today.clone().subtract(i, 'days');
      labels.push(date.format('MMM DD'));
      
      const dailyTotal = expenses
        .filter((exp) => moment(exp.createdAt).isSame(date, 'day'))
        .reduce((acc, exp) => acc + Math.abs(exp.amount), 0);
        
      data.push(dailyTotal);
    }
    
    return { labels, data };
  };

  // Data for Financial Overview Pie Chart
  const financialOverviewData = () => {
    // Ensure values are not negative for the chart
    const income = parseFloat(totalIncome);
    const expense = parseFloat(totalExpense);
    // const balance = parseFloat(totalBalance);
    
    // We only want to chart income and expenses
    const total = income + expense;
    if (total === 0) {
      // Return default data if no transactions
      return {
        labels: ['No Data'],
        data: [1]
      };
    }
    
    return {
      labels: ['Total Income', 'Total Expenses'],
      data: [income, expense],
    };
  };

return (
    <GlobalContext.Provider
      value={{
        user,
        transactions,
        loading,
        error,
        token,
        setAuthToken,
        logout,
        deleteAccount,
        addTransaction,
        deleteTransaction,
        
        // Main calculations
        totalBalance,
        totalIncome,
        totalExpense,
        incomes,
        expenses,
        
        // Data for Dashboard
        recentIncomes,
        recentExpenses,
        last30DaysExpenses,
        financialOverviewData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// --- Custom Hook to use the context ---
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};