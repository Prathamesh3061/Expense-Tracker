import React from 'react';
import { NavLink } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';

const avatar = 'https://placehold.co/100x100/3498db/white?text=User'; 

function Navigation() {
  const { user, logout } = useGlobalContext();

  const handleLogout = () => {
    logout();
  };

  // Base classes for NavLink
  const navLinkClasses = 'block p-3 px-4 rounded-md text-text-light transition-colors hover:bg-dark-tertiary';
  // Classes to add when NavLink is active
  const activeLinkClasses = 'bg-primary text-text-white font-medium';

  return (
    <nav className="p-4 md:p-6 bg-dark-secondary border-r-2 border-gray-800 flex flex-col justify-between
                   md:border-r-2 md:border-b-0 border-b-2"> {/* Responsive border */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <img src={avatar} alt="User" className="w-20 h-20 rounded-full border-2 border-primary" />
          <div className="text">
            <h2 className="text-lg font-medium">{user?.name || 'User'}</h2>
            <p className="text-sm text-text-light">Your Money</p>
          </div>
        </div>
        
        <ul className="flex flex-col gap-4">
          <li>
            <NavLink 
              to="/" 
              end
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
              className={({ isActive }) => 
                isActive ? `${navLinkClasses} ${activeLinkClasses}` : navLinkClasses
              }
            >
              Expenses
            </NavLink>
          </li>
        </ul>
      </div>
      
      <div className="mt-6">
        <button 
          onClick={handleLogout}
          className="w-full p-3 rounded-md bg-danger text-text-white font-bold transition-colors hover:bg-danger-hover"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navigation;