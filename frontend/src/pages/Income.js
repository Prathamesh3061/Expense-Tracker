import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import TransactionForm from '../components/TransactionForm';
import TransactionItem from '../components/TransactionItem';
import IncomeChart from '../components/IncomeChart';

// --- 1. CHANGED IMPORTS HERE ---
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // Import the function directly
import moment from 'moment';

function Income() {
  const { incomes, totalIncome } = useGlobalContext();

  const downloadPDF = () => {
    const doc = new jsPDF();
    
    doc.text('Income Report', 20, 10);
    
    const tableColumn = ["Date", "Description", "Amount"];
    const tableRows = [];

    incomes.forEach(income => {
      const incomeData = [
        moment(income.createdAt).format('YYYY-MM-DD'),
        income.description,
        `+${income.amount}`
      ];
      tableRows.push(incomeData);
    });

    // --- 2. CHANGED FUNCTION CALL HERE ---
    // Instead of doc.autoTable, we call autoTable(doc, options)
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    // calculate Y position for the total
    const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY : 10;

    doc.text(`Total Income: ${totalIncome}`, 20, finalY + 10);
    doc.save("income_report.pdf");
  };

  return (
    // ... (The rest of your JSX return code remains exactly the same)
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Incomes</h1>
        <button 
          onClick={downloadPDF}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover"
        >
          Download PDF
        </button>
      </div>

      <h2 className="bg-dark-secondary p-4 rounded-lg text-2xl font-medium mb-6 text-center text-success">
        Total Income: +₹{totalIncome}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-8">
          <TransactionForm type="income" />
          <IncomeChart />
        </div>

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