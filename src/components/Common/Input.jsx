import React from "react";
import Message from "./Message";

const Input = ({ label, inputProp, register, error, Tag = "input" }) => {
  return (
    <div >
      <div className="relative z-0 mb-6  w-full group">
        <Tag
          className={`block py-2.5  px-0 w-full text-sm text-gray-900 bg-transparent border-0 !border-b-2 ${
            error ? "border-red-500" : "border-gray-300"
          } appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
          placeholder=" "
          {...inputProp}
          {...register}
        />
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          {label}
        </label>
        {error && <Message text={error} />}
      </div>
    </div>
  );
};

export default Input;
