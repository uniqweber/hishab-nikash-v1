import { FaAngleDown } from "react-icons/fa";

const DropdownInput = ({ id, showItem, setShowItems, selectedItem, setSelectedItem, placeholderTitle }) => {
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
      />
      <FaAngleDown className={`absolute  right-2 duration-300 text-base ${showItem ? "rotate-180" : "rotate-0"}`} />
    </div>
  );
};

export default DropdownInput;
