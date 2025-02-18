import { FaXmark } from "react-icons/fa6";

const EditExpense = ({ showEdit, setShowEdit, editedItem, setEditedItem, onUpdateExpense }) => {
  const handleOnChange = (e) => {
    setEditedItem((prev) => ({ ...prev, amount: e.target.value }));
  };
  return (
    <div
      className={`h-full w-full inset-0 fixed bg-black/50 flex duration-300 justify-center items-center ${
        showEdit ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className={`bg-white p-5 w-full max-w-xs rounded-md space-y-2 relative duration-300 ${showEdit ? "scale-100" : "scale-75"}`}>
        <div
          onClick={() => setShowEdit(false)}
          className="flex absolute -top-3 -right-3 cursor-pointer bg-rose-500 w-8 h-8 rounded-full items-center justify-center text-white text-base"
        >
          <FaXmark />
        </div>
        <h5 className="input flex items-center cursor-not-allowed">{editedItem.name}</h5>
        <input type="number" className="input" placeholder="Enter Amount" value={editedItem.amount || ""} onChange={(e) => handleOnChange(e)} />
        <button onClick={onUpdateExpense} className="button-primary w-full">
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditExpense;
