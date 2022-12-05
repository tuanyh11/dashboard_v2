import React from "react";

const Message = ({text}) => {
  return (
    <div
      className="py-2 mb-4 text-sm text-red-500 rounded-lg dark:bg-red-200 dark:text-red-800"
    >
      {text}
    </div>
  );
};

export default Message;
