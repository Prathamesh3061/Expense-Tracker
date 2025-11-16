import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import TransactionForm from '../components/TransactionForm';
import TransactionItem from '../components/TransactionItem';
import ExpenseChart from '../components/ExpenseChart';

// --- 1. CHANGED IMPORTS HERE ---
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // Import directly
import moment from 'moment';

function Expenses() {
  const { expenses, totalExpense } = useGlobalContext();

  const downloadPDF = () => {
    const doc = new jsPDF();
    
    doc.text('Expense Report', 20, 10);
    
    const tableColumn = ["Date", "Description", "Amount"];
    const tableRows = [];

    expenses.forEach(expense => {
      const expenseData = [
        moment(expense.createdAt).format('YYYY-MM-DD'),
        expense.description,
        `${expense.amount}`
      ];
      tableRows.push(expenseData);
    });

    // --- 2. CHANGED FUNCTION CALL HERE ---
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY : 10;

    doc.text(`Total Expense: -${totalExpense}`, 20, finalY + 10);
    doc.save("expense_report.pdf");
  };

  return (
    // ... (Rest of JSX remains the same)
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Expenses</h1>
        <button 
          onClick={downloadPDF}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover"
        >
          Download PDF
        </button>
      </div>

      <h2 className="bg-dark-secondary p-4 rounded-lg text-2xl font-medium mb-6 text-center text-danger">
        Total Expense: -₹{totalExpense}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-8">
          <TransactionForm type="expense" />
          <ExpenseChart />
        </div>

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