import React from 'react';
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useGlobalContext } from '../context/GlobalContext';

ChartJs.register(ArcElement, Tooltip, Legend);

function FinancialOverviewChart() {
  const { financialOverviewData } = useGlobalContext();
  const { labels, data: chartData } = financialOverviewData();

  const data = {
    labels: labels,
    datasets: [
      {
        data: chartData,
        backgroundColor: ['#2ecc71', '#e74c3c'], // Green for Income, Red for Expense
        borderColor: ['#27ae60', '#c0392b'],
        borderWidth: 1,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#ccc' // Text color for dark mode
        }
      },
      title: {
        display: true,
        text: 'Income vs. Expense',
        color: '#fff', // Text color for dark mode
        font: {
          size: 16
        }
      }
    }
  };

  return (
    <div className="bg-dark-secondary p-6 rounded-lg shadow-lg h-[400px] flex justify-center items-center">
      <div className="w-full h-full max-w-[350px] max-h-[350px]">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}

export default FinancialOverviewChart;