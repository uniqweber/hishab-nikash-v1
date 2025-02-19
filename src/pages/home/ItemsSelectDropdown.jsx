import { useCallback, useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";

export const ItemsSelectDropdown = ({ mapItems, setSelectedItem, selectedItem, placeholderTitle,  id, setSelectCategoryName }) => {
  const [showItem, setShowItems] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const newFilteredItems = mapItems
      .map((category) => {
        const matchItem = category.items.filter((item) => item.name.toLowerCase().includes(selectedItem.toLowerCase()));
        if (matchItem.length > 0) {
          return { ...category, items: matchItem };
        }
        return null;
      })
      .filter(Boolean);
    setFilteredItems(newFilteredItems);
    setSelectedIndex(-1);
  }, [selectedItem, mapItems]);

  const handleSelectItem = (categoryName, itemName) => {
    setSelectCategoryName(categoryName);
    setSelectedItem(itemName);
    setShowItems(false);
  };

  const handleClickOutside = useCallback(
    (e) => {
      if (e.target.id !== id) {
        setShowItems(false);
      }
    },
    [id]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleKeyDown = (e) => {
    if (filteredItems.length === 0) return;
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && selectedIndex !== -1) {
      const selectedCategory = filteredItems[selectedIndex];
      if (selectedCategory.items.length > 0) {
        setSelectedItem(selectedCategory.items[0].name);
        setSelectCategoryName(selectedCategory.category);
        setShowItems(false);
      }
    }
  };

  return (
    <div className="relative w-full flex items-center">
      <input
        autoComplete="off"
        id={id}
        type="text"
        placeholder={placeholderTitle}
        className="input cursor-pointer"
        value={selectedItem}
        onChange={(e) => setSelectedItem(e.target.value)}
        onClick={() => setShowItems(!showItem)}
        onKeyDown={handleKeyDown} // ✅ Keyboard navigation
      />
      <FaAngleDown className={`absolute  right-2 duration-300 text-base ${showItem ? "rotate-180" : "rotate-0"}`} />
      <div
        className={`w-full bg-white border h-[50vh] overflow-y-auto border-gray-300 rounded z-30 duration-300 absolute left-0 top-9.5 px-3.5 pt-2 pb-4 ${
          showItem ? " translate-y-0 opacity-100 visible" : "translate-y-2 invisible opacity-0"
        }`}
      >
        {filteredItems.map((items, index) => (
          <div key={items.id} className="">
            <h4 className="font-semibold">{items.category}</h4>
            <div className="pl-2 border-l border-gray-200">
              {items.items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectItem(items.category, item.name)}
                  className={`cursor-pointer rounded text-xs px-1 text-gray-500 hover:text-gray-300 duration-300 hover:bg-primary ${
                    selectedIndex === index ? "bg-primary text-white" : ""
                  }`}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
