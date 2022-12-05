import React, { useState } from "react";
import { RiArrowDownSLine, RiShoppingBag3Line } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import { sideData } from "../../data/sidebar";

const Sidebar = () => {
  const [slectItem, setSelectItem] = useState([]);

  const handleSelectItem = (item) => {
    const isExiting = slectItem.some((feature) => feature.name === item.name);
    if (isExiting) {
      const newItems = slectItem.filter(
        (feature) => feature.name !== item.name
      );
      setSelectItem(newItems);
      return;
    }

    setSelectItem((pre) => [...pre, item]);
  };

  return (
    <div>
      <div className="flex items-center gap-2 py-4 justify-center border-b border-white/20">
        <RiShoppingBag3Line className="text-4xl" />
        <h2 className="text-md ">Food Dashboard</h2>
      </div>
      <ul className="py-4 px-4">
        {sideData.map((item, i) => {
          const isSelecting = slectItem.some(
            (feature) => feature.name === item.name
          );

          return (
            <li key={i} className="relative">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center  gap-2 relative capitalize text-lg text-white font-semibold  p-3 rounded-lg ${
                    isActive
                      ? "from-blue-600 shadow-md shadow-blue-500/20  to-blue-400 bg-gradient-to-tr"
                      : ""
                  }`
                }
              >
                <div className="">{item.icon}</div>
                <span className="">{item.name}</span>
              </NavLink>
              {isSelecting && (
                <div className=" top-full left-0 my-2 capitalize rounded-md w-full  bg-blue-500/20 shadow-sm  shadow-blue-200/10">
                  {item?.features?.map((feature, i) => (
                    <NavLink
                      key={i}
                      to={feature.path}
                      className="text-sm block !py-4  px-8 text-white"
                    >
                      {feature.name}
                    </NavLink>
                  ))}
                </div>
              )}
              {item?.features && (
                <div
                  onClick={() => handleSelectItem(item)}
                  className={`flex ml-auto cursor-pointer text-2xl justify-end absolute right-0 top-0 -translate-x-1/2 z-30 translate-y-2/3 transition-all ${
                    isSelecting ? "rotate-180" : ""
                  }`}
                >
                  <RiArrowDownSLine />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
