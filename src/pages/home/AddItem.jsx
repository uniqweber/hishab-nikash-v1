import { useState } from "react";
import { ItemsSelectDropdown } from "../../components/UI/ItemsSelectDropdown";
import { bazarItems } from "../../utils/data/bajarItems";
import ConfirmationModal from "../../components/UI/ConfirmationModal";

const AddItem = () => {
  const [selectCategoryName, setSelectCategoryName] = useState("");
  const [itemName, setItemName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = () => {
    if (!selectCategoryName || !itemName) return;
    setShowModal(false);
    console.log(selectCategoryName, itemName);
  };

  return (
    <div>
      <div className="space-y-2">
        <ItemsSelectDropdown
          mapItems={bazarItems}
          id="dropdown-2"
          placeholderTitle={"Select Category"}
          childrenShow={false}
          selectedItem={selectCategoryName}
          setSelectCategoryName={setSelectCategoryName}
        />
        <input required type="text" className="input" placeholder="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} />
        <button
          onClick={() => {
            if (selectCategoryName && itemName) setShowModal(true);
          }}
          className="button-primary w-full"
        >
          Add
        </button>
      </div>
      <ConfirmationModal
        show={showModal}
        setShow={setShowModal}
        onConfirm={handleSubmit}
        title="Confirmation"
        subtitle={
          <>
            You added <span className="font-semibold text-blue-500">{itemName}</span> in{" "}
            <span className="font-semibold text-gray-700">{selectCategoryName}</span> category?
          </>
        }
      />
    </div>
  );
};

export default AddItem;
