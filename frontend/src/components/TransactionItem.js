import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import moment from 'moment';

function TransactionItem({ transaction }) {
  const { deleteTransaction } = useGlobalContext();
  
  // Destructure categoryIcon
  const { _id, description, amount, type, createdAt, categoryIcon } = transaction;

  return (
    <div className="bg-dark-tertiary p-4 rounded-lg shadow-lg flex items-center justify-between mb-4">
      <div className="flex items-center gap-4">
        
        {/* --- Display the Icon --- */}
        <div className="w-12 h-12 rounded-full bg-dark-primary flex items-center justify-center text-2xl border border-gray-700">
             {categoryIcon || '⭕'}
        </div>

        <div>
          <h4 className="font-medium capitalize">{description}</h4>
          <p className="text-sm text-text-light">
            {moment(createdAt).format('MMMM Do YYYY')}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className={`font-medium ${type === 'income' ? 'text-success' : 'text-danger'}`}>
          {type === 'income' ? '+' : '-'}₹{Math.abs(amount).toFixed(2)}
        </span>
        <button 
          onClick={() => deleteTransaction(_id)}
          className="bg-danger text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-danger-hover"
        >
          X
        </button>
      </div>
    </div>
  );
}

export default TransactionItem;