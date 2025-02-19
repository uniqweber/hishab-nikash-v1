const DropdownList = ({ showItem, filteredItems, handleSelectItem }) => {
  return (
    <div
      className={`w-full bg-white border h-[50vh] overflow-y-auto border-gray-300 rounded z-30 duration-300 absolute left-0 top-9.5 px-3.5 pt-2 pb-4 ${
        showItem ? " translate-y-0 opacity-100 visible" : "translate-y-2 invisible opacity-0"
      }`}
    >
      {filteredItems.map((items) => (
        <div key={items.id} className="">
          <h4 className="font-semibold">{items.category}</h4>
          <div className="pl-2 border-l border-gray-200">
            {items.items.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelectItem(items.category, item.name)}
                className={`cursor-pointer rounded text-xs px-1 text-gray-500 hover:text-gray-300 duration-300 hover:bg-primary `}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DropdownList;
