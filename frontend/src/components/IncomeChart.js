import React from 'react';
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useGlobalContext } from '../context/GlobalContext';

ChartJs.register(ArcElement, Tooltip, Legend);

function IncomeChart() {
  const { incomes } = useGlobalContext();

  // Aggregate incomes by description
  const incomeData = incomes.reduce((acc, income) => {
    acc[income.description] = (acc[income.description] || 0) + income.amount;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(incomeData),
    datasets: [
      {
        data: Object.values(incomeData),
        backgroundColor: ['#2ecc71', '#3498db', '#f1c40f', '#e74c3c', '#9b59b6'],
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

export default IncomeChart;