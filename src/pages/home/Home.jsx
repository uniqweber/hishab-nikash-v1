import { useDispatch, useSelector } from "react-redux";
import AddExpense from "./AddExpense";
import AddItem from "./AddItem";
import { BiEdit } from "react-icons/bi";
import { useState } from "react";
import EditExpense from "../../components/UI/EditExpense";
import { deleteAllExpenses, deleteExpense, editExpense } from "../../features/itemList/itemListSlice";
import { FaTrashAlt } from "react-icons/fa";
import ConfirmationModal from "../../components/UI/ConfirmationModal";

const Home = () => {
  const expenses = useSelector((state) => state.itemList);
  const dispatch = useDispatch();
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [currentEditedItem, setCurrentEditedItem] = useState({});
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentDeleteItem, setCurrentDeleteItem] = useState({});

  const handleEditClick = (category, item) => {
    setCurrentEditedItem({ ...item, category: category.categoryName });
    setEditModalVisible(true);
  };

  const handleUpdateExpense = () => {
    dispatch(editExpense(currentEditedItem));
    setEditModalVisible(false);
  };

  const handleDeleteClick = (category, item) => {
    setCurrentDeleteItem({ ...item, category: category.categoryName });
    setDeleteModalVisible(true);
  };

  const handleDeleteExpense = () => {
    dispatch(deleteExpense(currentDeleteItem));
    setDeleteModalVisible(false);
  };

  const handleDeleteAllExpenses = () => {
    const isConfirmed = window.confirm("Are you sure you want to delete all expenses?");
    if (!isConfirmed) return;
    dispatch(deleteAllExpenses());
  };

  return (
    <div className="h-full text-gray-800 text-sm flex items-start justify-between relative">
      <div className="h-full w-full relative space-y-5 px-5 pt-4">
        {expenses.map(
          (category) =>
            category.item.length > 0 && (
              <div key={category.id}>
                <div className="flex items-center justify-between gap-2 border-b border-gray-300 pb-0.5 mb-2 font-semibold">
                  <h2>{category.categoryName}</h2>
                  <span>{category.item.reduce((total, item) => total + Number(item.amount), 0)}</span>
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
            )
        )}
        <EditExpense
          onUpdateExpense={handleUpdateExpense}
          editedItem={currentEditedItem}
          showEdit={isEditModalVisible}
          setEditedItem={setCurrentEditedItem}
          setShowEdit={setEditModalVisible}
        />
        <ConfirmationModal
          show={isDeleteModalVisible}
          setShow={setDeleteModalVisible}
          onConfirm={handleDeleteExpense}
          title="Confirmation"
          subtitle={
            <>
              Are you sure you want to delete <span className="text-red-600 font-bold">{currentDeleteItem.name}</span>?
            </>
          }
        />
      </div>
      <div className="print:hidden space-y-5 border-l border-gray-300 min-h-screen max-w-xs w-full px-5 py-4 flex flex-col justify-between">
        <div>
          <div>
            <h2 className="font-medium mb-2">Expenses</h2>
            <AddExpense />
          </div>
          <div>
            <h2 className="font-medium mb-2">Items</h2>
            <AddItem />
          </div>
        </div>
        <div>
          <button onClick={()=> window.print()} className="h-8 border border-gray-300 hover:bg-primary cursor-pointer duration-300 hover:text-white rounded w-full">
            Print Receipt
          </button>
          <button
            onClick={handleDeleteAllExpenses}
            className="h-8 border border-red-200 mt-2 text-red-600 cursor-pointer duration-300  w-full hover:bg-red-600 hover:text-white rounded"
          >
            Remove All Expense
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
