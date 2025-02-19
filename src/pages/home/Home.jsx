import { useDispatch } from "react-redux";
import { deleteAllExpenses } from "../../features/expense/expenseSlice";
import ShowExpenses from "./expenseComp/ShowExpenses";
import AddExpense from "./expenseComp/AddExpense";

const Home = () => {
  const dispatch = useDispatch();
  const handleDeleteAllExpenses = () => {
    const userConfirmation = prompt("Are you sure you want to delete all expenses? Please enter 'yes' to confirm.");
    if (userConfirmation.toLowerCase() !== "yes") return;
    dispatch(deleteAllExpenses());
  };

  return (
    <div className="h-full text-gray-800 text-sm flex items-start justify-between relative">
      <ShowExpenses />
      <div className="print:hidden  border-l border-gray-300 min-h-screen max-w-xs w-full px-5 py-4 flex flex-col justify-between">
        <AddExpense />
        <div>
          <button onClick={() => window.print()} className="border-button  hover:bg-primary border-gray-300 mb-2">
            Print Receipt
          </button>
          <button onClick={handleDeleteAllExpenses} className="border-button text-red-500 hover:bg-red-600 border-red-200">
            Remove All Expense
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
