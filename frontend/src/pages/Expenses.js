import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import TransactionForm from '../components/TransactionForm';
import TransactionItem from '../components/TransactionItem';
import ExpenseChart from '../components/ExpenseChart';

function Expenses() {
  const { expenses, totalExpense } = useGlobalContext();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Expenses</h1>
      <h2 className="bg-dark-secondary p-4 rounded-lg text-2xl font-medium mb-6 text-center text-danger">
        Total Expense: -₹{totalExpense}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Column 1: Form & Chart */}
        <div className="flex flex-col gap-8">
          <TransactionForm type="expense" />
          <ExpenseChart />
        </div>

        {/* Column 2: List of Expenses */}
        <div className="bg-dark-secondary p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-medium mb-4">Expense History</h3>
          <div className="flex flex-col gap-4">
            {expenses.length > 0 ? (
              expenses.map((expense) => (
                <TransactionItem key={expense._id} transaction={expense} />
              ))
            ) : (
      
                <p className="text-text-light text-center p-4">
                  No expenses added yet.
                </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expenses;