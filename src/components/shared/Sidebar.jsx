import { NavLink } from "react-router";
import { navData } from "../../utils/data/navData";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const expense = useSelector((state) => state.itemList);
  const allItem = expense.map((item) => item.item);
  const totalExpense = allItem.flat().reduce((sum, item) => sum + Number(item.amount), 0);

  return (
    <div className=" print:hidden w-full px-5 pt-5 pb-4 sticky top-0 h-screen flex flex-col justify-between border-r border-gray-300 ">
      <div>
        {navData.map(({ Icon, id, name, link }) => (
          <NavLink
            key={id}
            to={link}
            className={({ isActive }) =>
              ` ${
                isActive ? " border-gray-700 bg-primary text-white" : "border-transparent"
              } flex items-center text-sm rounded gap-2 px-4 h-8 border `
            }
          >
            <Icon />
            <span>{name}</span>
          </NavLink>
        ))}
      </div>

      <div className=" font-semibold space-y-2 text-lg ">
        <h2 className="flex items-center justify-between  text-red-400 ">
          <span>Expense:</span>
          <span>- {totalExpense}</span>
        </h2>
        <hr className="border-gray-300" />
        <h2 className="flex items-center justify-between  text-emerald-600 ">
          <span>Balance:</span>
          <span>+ {20000-totalExpense}</span>
        </h2>
      </div>
    </div>
  );
};

export default Sidebar;
