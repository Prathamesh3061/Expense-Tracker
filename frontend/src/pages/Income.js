import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import TransactionForm from '../components/TransactionForm';
import TransactionItem from '../components/TransactionItem';
import IncomeChart from '../components/IncomeChart';

function Income() {
  const { incomes, totalIncome } = useGlobalContext();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Incomes</h1>
      <h2 className="bg-dark-secondary p-4 rounded-lg text-2xl font-medium mb-6 text-center text-success">
        {/* Changed $ to ₹ */}
          Total Income: +₹{totalIncome}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Column 1: Form & Chart */}
        <div className="flex flex-col gap-8">
          <TransactionForm type="income" />
          <IncomeChart />
        </div>

        {/* Column 2: List of Incomes */}
        <div className="bg-dark-secondary p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-medium mb-4">Income History</h3>
          <div className="flex flex-col gap-4">
            {incomes.length > 0 ? (
              incomes.map((income) => (
                <TransactionItem key={income._id} transaction={income} />
              ))
            ) : (
              <p className="text-text-light text-center p-4">
                No income added yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Income;