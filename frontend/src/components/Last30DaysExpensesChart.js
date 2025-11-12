import React from 'react';
import { Chart as ChartJs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useGlobalContext } from '../context/GlobalContext';
import moment from 'moment';

ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Last30DaysExpensesChart() {
  const { last30DaysExpenses } = useGlobalContext();
  const { labels, data: chartData } = last30DaysExpenses();

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Daily Expense',
        data: chartData,
        backgroundColor: '#e74c3c', // Red color for expenses
        borderColor: '#c0392b',
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
          color: '#ccc', // Text color for dark mode
        }
      },
      title: {
        display: true,
        text: 'Last 30 Days Expenses',
        color: '#fff', // Text color for dark mode
        font: {
          size: 16
        }
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#ccc', // X-axis text color
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Grid line color
        }
      },
      y: {
        ticks: {
          color: '#ccc', // Y-axis text color
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Grid line color
        }
      }
    }
  };

  // We add a wrapper with a specific height for the chart to render
  return (
    <div className="bg-dark-secondary p-6 rounded-lg shadow-lg h-[400px]">
      <Bar data={data} options={options} />
    </div>
  );
}

export default Last30DaysExpensesChart;