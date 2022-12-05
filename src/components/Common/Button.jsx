import React from "react";

const Button = ({label,...props}) => {
  return (
    <button
      type="button"
      {...props}
      className="text-white bg-gradient-to-r shadow-blue-500/20 from-blue-600  to-blue-400 hover:bg-gradient-to-br  focus:outline-none font-medium rounded-md text-sm px-5 py-2.5 text-center mr-2 mb-2"
    >
      {label}
    </button>
  );
};

export default Button;
