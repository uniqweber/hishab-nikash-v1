import { NavLink } from "react-router";
import { navData } from "../../utils/data/navData";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const expense = useSelector((state) => state.expense);
  const allItem = expense.map((item) => item.item).flat();
  const totalExpense = allItem.flat().reduce((sum, item) => sum + Number(item.amount), 0);

  return (
    <div className=" print:hidden w-full px-5 pt-5 pb-4 sticky top-0 h-screen flex flex-col justify-between border-r border-gray-300 ">
      <div>
        {navData.map(({ Icon, id, name, link }) => (
          <NavLink key={id} to={link} className={({ isActive }) => ` ${isActive ? " active-route-button" : "route-button"}  `}>
            <Icon />
            <span>{name}</span>
          </NavLink>
        ))}
      </div>

      <div className=" space-y-2 ">
        <h2 className="flex items-center justify-between  ">
          <span className="font-medium">Expense:</span>
          <span className="text-xl font-semibold  text-red-500">- {totalExpense}</span>
        </h2>
        <hr className="border-gray-300" />
        <h2 className="flex items-center justify-between   ">
          <span className="font-medium">Balance:</span>
          <span className="text-xl font-semibold  text-emerald-600">+ {20000 - totalExpense}</span>
        </h2>
      </div>
    </div>
  );
};

export default Sidebar;
