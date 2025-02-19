import { useState } from "react";
import { EditExpenseModal, ExpenseCategory } from ".";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmationModal } from "../../../components/UI";
import { deleteExpense, editExpense } from "../../../features/expense/expenseSlice";

const ShowExpenses = () => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedExpense, setEditedExpense] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState({});
  const expenses = useSelector((state) => state.expense);

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
      {expenses.map(
        (category) =>
          category.item.length > 0 && (
            <ExpenseCategory key={category.id} category={category} handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} />
          )
      )}

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
