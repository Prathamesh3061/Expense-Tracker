import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import Last30DaysExpensesChart from '../components/Last30DaysExpensesChart';
import FinancialOverviewChart from '../components/FinancialOverviewChart';

function Dashboard() {
  const {
    user,
    totalBalance,
    totalIncome,
    totalExpense,
    recentIncomes,
    recentExpenses,
  } = useGlobalContext();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <h2 className="text-xl text-text-light mb-6">Welcome, {user?.name || 'User'}!</h2>

      {/* --- Summary Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SummaryBox title="Total Balance" amount={totalBalance} isBalance={true} />
        <SummaryBox title="Total Income" amount={totalIncome} isIncome={true} />
        <SummaryBox title="Total Expense" amount={totalExpense} isExpense={true} />
      </div>

      {/* --- Main Dashboard Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3 width) - Chart & Incomes */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* 30 Day Expenses Chart */}
          <Last30DaysExpensesChart />

          {/* Recent Incomes List */}
          <MiniTransactionList
            title="Recent Incomes"
            transactions={recentIncomes}
          />
        </div>

        {/* Right Column (1/3 width) - Pie Chart & Expenses */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Financial Overview Chart */}
          <FinancialOverviewChart />

          {/* Recent Expenses List */}
          <MiniTransactionList
            title="Recent Expenses"
            transactions={recentExpenses}
          />
        </div>
      </div>
    </div>
  );
}

// --- Helper Component: Summary Box ---
const SummaryBox = ({ title, amount, isBalance, isIncome, isExpense }) => {
  let amountClass = 'text-text-white';
  let formattedAmount = `₹${amount}`; // Rupee Symbol

  if (isIncome) {
    amountClass = 'text-success';
    formattedAmount = `+${formattedAmount}`;
  } else if (isExpense) {
    amountClass = 'text-danger';
    formattedAmount = `-${formattedAmount}`;
  }

  return (
    <div className="bg-dark-secondary p-6 rounded-lg shadow-lg">
      <h4 className="text-text-light mb-2 font-medium">{title}</h4>
      <p className={`text-3xl font-bold ${amountClass}`}>{formattedAmount}</p>
    </div>
  );
};

// --- Helper Component: Mini List (Incomes/Expenses) ---
const MiniTransactionList = ({ title, transactions }) => {
  const isIncome = title.includes('Incomes');
  
  return (
    <div className="bg-dark-secondary p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-medium mb-4">{title}</h3>
      <div className="flex flex-col gap-4">
        {transactions.length > 0 ? (
          transactions.map((t) => (
            <div key={t._id} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
              
              {/* Icon + Description */}
              <div className="flex items-center gap-3">
                 {/* Show the Emoji here */}
                <span className="text-xl">{t.categoryIcon || '⭕'}</span>
                <span className="capitalize text-text-light font-medium">{t.description}</span>
              </div>

              {/* Amount */}
              <span className={isIncome ? 'text-success' : 'text-danger'}>
                {isIncome ? '+' : '-'}₹{Math.abs(t.amount).toFixed(2)}
              </span>
            </div>
          ))
        ) : (
          <p className="text-text-light italic">No recent transactions.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;