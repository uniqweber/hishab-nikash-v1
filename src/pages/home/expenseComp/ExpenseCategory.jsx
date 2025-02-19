import ExpenseItem from "./ExpenseItem";

const ExpenseCategory = ({ category, handleDeleteClick, handleEditClick }) => {
  return (
    <div>
      <div className="flex items-center justify-between gap-2 border-b border-gray-300 pb-0.5 mb-2 font-semibold">
        <h2>{category.categoryName}</h2>
        <span>{category.item.reduce((total, expense) => total + Number(expense.amount), 0)}</span>
      </div>
      {category.item.map((expense) => (
        <ExpenseItem key={expense.id} category={category} expense={expense} handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} />
      ))}
    </div>
  );
};

export default ExpenseCategory;
