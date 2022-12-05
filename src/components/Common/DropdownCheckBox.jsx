import React from "react";
import { useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";

const DropdownCheckBox = ({ label, data = [], disPlayItem, displayValue, register, type="multiple" }) => {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button
        className="text-white bg-blue-600 hover:bg-blue-700 focus:bg-blue-800  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => setOpen(!open)}
      >
        {label}
        <RiArrowDownSLine />
      </button>

      <div
        className={`z-10 w-48 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 ${
          open ? "" : "hidden"
        }`}
      >
        <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200">
          {}
          {data.map((item, i) => (
            <li key={i}>
              <div className="flex items-center">
                <input
                  id={`checkbox-item-${i}`}
                  type={type !== 'multiple' ? "radio": 'checkbox'}
                  value={displayValue ? displayValue(item) : ""}
                  {...register}
                  className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 "
                />
                <label
                  htmlFor={`checkbox-item-${i}`}
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {disPlayItem(item)}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownCheckBox;
