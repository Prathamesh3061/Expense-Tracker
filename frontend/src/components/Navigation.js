import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';

// Placeholder Avatar
const avatar = 'https://placehold.co/100x100/3498db/white?text=User'; 

function Navigation() {
  const { user, logout } = useGlobalContext();
  const [isOpen, setIsOpen] = useState(false); // State to toggle menu on mobile

  const handleLogout = () => {
    logout();
  };

  // Base classes for NavLink
  const navLinkClasses = 'block p-3 px-4 rounded-md text-text-light transition-colors hover:bg-dark-tertiary';
  const activeLinkClasses = 'bg-primary text-text-white font-medium';

  return (
    <nav className="p-4 md:p-6 bg-dark-secondary border-b-2 md:border-r-2 md:border-b-0 border-gray-800 flex flex-col justify-between md:h-screen">
      
      {/* --- Mobile Header & Toggle Button --- */}
      <div className="flex items-center justify-between mb-4 md:mb-8">
        
        {/* User Info */}
        <div className="flex items-center gap-4">
          <img src={avatar} alt="User" className="w-12 h-12 md:w-20 md:h-20 rounded-full border-2 border-primary" />
          <div className="text">
            <h2 className="text-lg font-medium">{user?.name || 'User'}</h2>
            <p className="text-sm text-text-light">Your Money</p>
          </div>
        </div>

        {/* Hamburger Button (Visible ONLY on Mobile) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-text-white text-3xl focus:outline-none"
        >
          {isOpen ? '✖' : '☰'} {/* X to close, Hamburger to open */}
        </button>
      </div>
      
      {/* --- Menu Items (Links + Logout) --- */}
      {/* On Mobile: Hidden by default, shown if isOpen is true. On Desktop: Always flex/block */}
      <div className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col justify-between flex-1 transition-all duration-300 ease-in-out`}>
        
        <ul className="flex flex-col gap-4">
          <li>
            <NavLink 
              to="/" 
              end
              onClick={() => setIsOpen(false)} // Close menu when clicked
              className={({ isActive }) => 
                isActive ? `${navLinkClasses} ${activeLinkClasses}` : navLinkClasses
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/income"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => 
                isActive ? `${navLinkClasses} ${activeLinkClasses}` : navLinkClasses
              }
            >
              Incomes
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/expenses"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => 
                isActive ? `${navLinkClasses} ${activeLinkClasses}` : navLinkClasses
              }
            >
              Expenses
            </NavLink>
          </li>
        </ul>
        
        <div className="mt-6">
          <button 
            onClick={handleLogout}
            className="w-full p-3 rounded-md bg-danger text-text-white font-bold transition-colors hover:bg-danger-hover"
          >
            Logout
          </button>
        </div>
      </div>

    </nav>
  );
}

export default Navigation;