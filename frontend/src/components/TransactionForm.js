import React, { useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import EmojiPicker from 'emoji-picker-react'; // Import the library

function TransactionForm({ type }) {
  const { addTransaction } = useGlobalContext();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  
  // State for the selected emoji (Default based on type)
  const [categoryIcon, setCategoryIcon] = useState(type === 'income' ? '💰' : '💸');
  // State to show/hide the picker
  const [showPicker, setShowPicker] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) {
      alert('Please fill out all fields');
      return;
    }

    const finalAmount = type === 'income' ? parseFloat(amount) : -parseFloat(amount);

    // Pass the icon to the context
    addTransaction(description, finalAmount, categoryIcon);
    
    setDescription('');
    setAmount('');
    setShowPicker(false); // Hide picker after submit
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-dark-secondary p-6 rounded-lg shadow-lg mb-8 relative" // relative for absolute picker
    >
      <h3 className="text-xl font-medium mb-4">
        Add New {type === 'income' ? 'Income' : 'Expense'}
      </h3>

      {/* --- Emoji Picker Section --- */}
      <div className="mb-4">
        <label className="block mb-2 text-text-light">Icon</label>
        <div className="relative">
            <button
                type="button"
                onClick={() => setShowPicker(!showPicker)}
                className="text-2xl p-2 bg-dark-tertiary rounded-md border border-gray-700 hover:bg-gray-700 transition-colors"
            >
                {categoryIcon}
            </button>
            
            {showPicker && (
                <div className="absolute z-10 top-12 left-0">
                    <EmojiPicker 
                        onEmojiClick={(emojiObject) => {
                            setCategoryIcon(emojiObject.emoji);
                            setShowPicker(false);
                        }}
                        theme="dark" // Make it look good in your dark theme
                    />
                </div>
            )}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block mb-2 text-text-light">
          Description
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={type === 'income' ? 'e.g. Salary' : 'e.g. Coffee'}
          required
          className="w-full p-3 border border-gray-700 rounded-lg bg-dark-tertiary text-text-white"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="amount" className="block mb-2 text-text-light">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          required
          min="0.01"
          step="0.01"
          className="w-full p-3 border border-gray-700 rounded-lg bg-dark-tertiary text-text-white"
        />
      </div>
      <button 
        type="submit" 
        className="w-full p-3 rounded-lg bg-primary text-text-white font-bold transition-colors hover:bg-primary-hover"
      >
        Add {type === 'income' ? 'Income' : 'Expense'}
      </button>
    </form>
  );
}

export default TransactionForm;