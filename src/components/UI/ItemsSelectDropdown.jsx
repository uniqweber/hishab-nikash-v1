import { useCallback, useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";

export const ItemsSelectDropdown = ({ mapItems, setSelectedItem, selectedItem, placeholderTitle, childrenShow, id, setSelectCategoryName }) => {
  const [showItem, setShowItems] = useState(false);

  const handleSelectItem = (categoryName, itemName) => {
    setSelectCategoryName(categoryName);
    setSelectedItem(itemName);
  };

  const handleCategoryName = (category) => {
    setSelectCategoryName(category);
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

  return (
    <div className="relative w-full flex items-center">
      <input
        readOnly
        id={id}
        type="text"
        placeholder={placeholderTitle}
        className="input cursor-pointer"
        value={selectedItem}
        onChange={(e) => setSelectedItem(e.target.value)}
        onClick={() => setShowItems(!showItem)}
      />
      <FaAngleDown className={`absolute  right-2 duration-300 text-base ${showItem ? "rotate-180" : "rotate-0"}`} />
      <div
        className={`w-full bg-white border h-[50vh] overflow-y-auto border-gray-300 rounded z-30 duration-300 absolute left-0 top-9.5 px-3.5 pt-2 pb-4 ${
          showItem ? " translate-y-0 opacity-100 visible" : "translate-y-2 invisible opacity-0"
        }`}
      >
        {childrenShow
          ? mapItems.map((items) => (
              <div key={items.id} className="">
                <h4 className="font-semibold">{items.category}</h4>
                <div className="pl-2 border-l border-gray-200">
                  {childrenShow &&
                    items.items.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleSelectItem(items.category, item.name)}
                        className="cursor-pointer rounded text-xs px-1 text-gray-500 hover:text-gray-300 duration-300 hover:bg-primary"
                      >
                        {item.name}
                      </div>
                    ))}
                </div>
              </div>
            ))
          : mapItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleCategoryName(item.category)}
                className="cursor-pointer rounded space-y-1 px-1 -ml-1 text-gray-500 hover:text-gray-300 duration-300 hover:bg-primary"
              >
                <h2 className="">{item.category}</h2>
              </div>
            ))}
      </div>
    </div>
  );
};
