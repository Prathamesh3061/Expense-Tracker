import React from 'react';
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useGlobalContext } from '../context/GlobalContext';

ChartJs.register(ArcElement, Tooltip, Legend);

function ExpenseChart() {
  const { expenses } = useGlobalContext();

  // Aggregate expenses by description
  const expenseData = expenses.reduce((acc, expense) => {
    // Note: amount is already negative, so we use Math.abs
    acc[expense.description] = (acc[expense.description] || 0) + Math.abs(expense.amount);
    return acc;
  }, {});

  const data = {
    labels: Object.keys(expenseData),
    datasets: [
      {
        data: Object.values(expenseData),
        backgroundColor: ['#e74c3c', '#f1c40f', '#9b59b6', '#3498db', '#2ecc71'],
      },
    ],
  };

  return (
    <div className="bg-dark-secondary p-6 rounded-lg shadow-lg h-full flex justify-center items-center">
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <Pie data={data} />
      </div>
    </div>
  );
}

export default ExpenseChart;