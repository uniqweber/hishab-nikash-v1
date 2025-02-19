import { BiEdit } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";

 const ExpenseItem = ({ category, expense, handleDeleteClick, handleEditClick }) => {
  return (
    <div className="flex items-center justify-between gap-2 relative group">
      <span className="text-gray-600">{expense.name}</span>
      <span className="text-red-600">{-expense.amount}</span>
      <div className="duration-300 flex items-center justify-center bg-gray-300 absolute right-0 left-0 top-1/2 -translate-y-1/2 cursor-pointer opacity-0 group-hover:opacity-100">
        <div onClick={() => handleDeleteClick(category, expense)} className="bg-red-600 text-white w-full flex items-center justify-center gap-2">
          <span>Delete</span> <FaTrashAlt className="text-xs" />
        </div>
        <div onClick={() => handleEditClick(category, expense)} className="bg-primary text-white w-full flex items-center justify-center gap-2">
          <span>Edit</span> <BiEdit />
        </div>
      </div>
    </div>
  );
};


export default ExpenseItem