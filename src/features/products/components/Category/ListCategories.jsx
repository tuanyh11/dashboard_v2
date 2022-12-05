import React from "react";
import { URL_STATIC } from "../../../../config/CONST";

const ListCategories = ({ categories = [], hanleUpdale, hanleDelete }) => {
  return (
    <div>
      {" "}
      <div className="overflow-x-auto relative shadow-md ">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                CreatedAt
              </th>
              <th scope="col" className="py-3 px-6">
                UpadatedAt
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((item) => (
              <tr
                key={item._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4 w-32">
                  <img src={URL_STATIC + item?.image} alt="Apple Watch" />
                </td>
                <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                  {item.name}
                </td>
                <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                  {item.createdAt}
                </td>
                <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">{item.updatedAt}</td>
                <td className="py-4 px-6">
                  <div className="grid grid-cols-2 gap-6">
                    <button
                      onClick={() => hanleDelete(item._id)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline my-4"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => hanleUpdale(item)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline my-4"
                    >
                      Update
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListCategories;
