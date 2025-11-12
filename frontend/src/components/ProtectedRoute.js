import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';

import Navigation from './Navigation'; // Your Sidebar

const ProtectedRoute = () => {
  const { token, loading } = useGlobalContext();

  if (loading) {
    // Show a loading spinner or text while checking auth
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, render the main app layout
  return (
    // This is the 2-column layout from the video
    // Mobile: 1 column. Desktop: 250px sidebar + main content
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] h-screen bg-dark-primary">
      <Navigation />
      
      {/* Makes only the main content scrollable */}
      <main className="overflow-y-auto p-4 md:p-8">
        <Outlet /> {/* Renders Dashboard, Income, etc. */}
      </main>
    </div>
  );
};

export default ProtectedRoute;