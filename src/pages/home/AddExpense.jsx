import { bazarItems } from "../../utils/data/bajarItems";
import { useState } from "react";
import { ItemsSelectDropdown } from "./ItemsSelectDropdown";
import { useDispatch } from "react-redux";
import { addExpense } from "../../features/itemList/itemListSlice";
import ConfirmationModal from "../../components/UI/ConfirmationModal";

const AddExpense = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [selectCategoryName, setSelectCategoryName] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = () => {
    if (!selectedItem || !amount) return;
    setShowModal(false);
    dispatch(addExpense({ category: selectCategoryName?.trim(), name: selectedItem?.trim(), amount: amount?.trim() }));
  };

  return (
    <div className=" space-y-2">
      <h2 className="font-medium">Expenses</h2>
      <ItemsSelectDropdown
        id="dropdown-1"
        mapItems={bazarItems}
        childrenShow={true}
        placeholderTitle={"Select Item"}
        setSelectedItem={setSelectedItem}
        selectedItem={selectedItem}
        setSelectCategoryName={setSelectCategoryName}
      />
      <input type="number" placeholder="Enter Amount" className="input" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button onClick={() => selectedItem && amount && setShowModal(true)} className="button-primary w-full">
        Submit
      </button>
      <ConfirmationModal
        isConfirm={showModal}
        setIsConfirm={setShowModal}
        onConfirm={handleSubmit}
        title="Confirmation"
        subtitle={
          <>
            You spend <span className="font-semibold text-red-600">{amount}</span> ৳ on{" "}
            <span className="font-semibold text-gray-700">{selectedItem}</span>?
          </>
        }
      />
    </div>
  );
};

export default AddExpense;
