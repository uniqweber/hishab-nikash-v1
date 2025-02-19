import { useState } from "react";
import { useHandleClickOutside } from "../../../hooks/useHandleClickOutside";
import DropdownInput from "./DropdownInput";
import DropdownList from "./DropdownList";

const ItemsSelectDropdown = ({ mapItems, setSelectedItem, selectedItem, placeholderTitle, id, setSelectCategoryName }) => {
  const [showItem, setShowItems] = useState(false);
  useHandleClickOutside(setShowItems, id);

  const handleSelectItem = (categoryName, itemName) => {
    setSelectCategoryName(categoryName);
    setSelectedItem(itemName);
    setShowItems(false);
  };

  const filteredItems = mapItems
    .map((category) => {
      const matchItem = category.items.filter((item) => item.name.toLowerCase().includes(selectedItem.toLowerCase()));
      if (matchItem.length > 0) return { ...category, items: matchItem };
    })
    .filter(Boolean);

  return (
    <div className="relative">
      <DropdownInput
        id={id}
        showItem={showItem}
        setShowItems={setShowItems}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        placeholderTitle={placeholderTitle}
      />
      <DropdownList filteredItems={filteredItems} showItem={showItem} handleSelectItem={handleSelectItem} />
    </div>
  );
};
export default ItemsSelectDropdown;
