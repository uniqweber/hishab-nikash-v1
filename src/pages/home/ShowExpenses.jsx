import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt, BiEdit } from "../../assets/icons/icon";
import { useState } from "react";
import { deleteExpense, editExpense } from "../../features/itemList/itemListSlice";
import EditExpenseModal from "./EditExpenseModal";
import ConfirmationModal from "../../components/UI/ConfirmationModal";

const ShowExpenses = () => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedExpense, setEditedExpense] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState({});
  const expenses = useSelector((state) => state.itemList);


  const handleUpdateExpense = () => {
    dispatch(editExpense(editedExpense));
    setIsEditing(false);
  };

  const handleEditClick = (category, expense) => {
    setEditedExpense({ ...expense, category: category.categoryName });
    setIsEditing(true);
  };

  const handleDeleteClick = (category, expense) => {
    setExpenseToDelete({ ...expense, category: category.categoryName });
    setIsDeleting(true);
  };

  const handleDeleteExpense = () => {
    dispatch(deleteExpense(expenseToDelete));
    setIsDeleting(false);
  };

  return (
    <div className="h-full space-y-5 w-full px-5 pt-4 pb-5">
      {expenses.map((category) => {
        if (category.item.length === 0) return null;

        return (
          <div key={category.id}>
            <div className="flex items-center justify-between gap-2 border-b border-gray-300 pb-0.5 mb-2 font-semibold">
              <h2>{category.categoryName}</h2>
              <span>{category.item.reduce((total, expense) => total + Number(expense.amount), 0)}</span>
            </div>
            {category.item.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between gap-2 relative group">
                <span className="text-gray-600">{expense.name}</span>
                <span className="text-red-600">{-expense.amount}</span>
                <div className="duration-300 flex items-center justify-center bg-gray-300 absolute right-0 left-0 top-1/2 -translate-y-1/2 cursor-pointer opacity-0 group-hover:opacity-100">
                  <div
                    onClick={() => handleDeleteClick(category, expense)}
                    className="bg-red-600 text-white w-full flex items-center justify-center gap-2"
                  >
                    <span>Delete</span> <FaTrashAlt className="text-xs" />
                  </div>
                  <div
                    onClick={() => handleEditClick(category, expense)}
                    className="bg-primary text-white w-full flex items-center justify-center gap-2"
                  >
                    <span>Edit</span> <BiEdit />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}

      <EditExpenseModal
        onUpdateExpense={handleUpdateExpense}
        editedExpense={editedExpense}
        isEditing={isEditing}
        setEditedExpense={setEditedExpense}
        setIsEditing={setIsEditing}
      />

      <ConfirmationModal
        isConfirm={isDeleting}
        setIsConfirm={setIsDeleting}
        onConfirm={handleDeleteExpense}
        title="Confirmation"
        subtitle={
          <>
            You want to delete <span className="text-red-600 font-bold">{expenseToDelete.name}</span>?
          </>
        }
      />
    </div>
  );
};

export default ShowExpenses;
