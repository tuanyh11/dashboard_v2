import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { URL_STATIC } from "../../../../config/CONST";
import useUser from "../../hooks/useUser";

const ListUser = () => {

    const {data, getAsyncUsers, deleteAsyncRolesUser} = useUser()

    useEffect(() => {
        getAsyncUsers()
    }, [])

  return (
    <div className="mt-10">
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Avatar
              </th>
              <th scope="col" className="py-3 px-6">
                Email
              </th>
              <th scope="col" className="py-3 px-6">
                User Name
              </th>
              <th scope="col" className="py-3 px-6">
                Position
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4 w-32">
                  <img src={URL_STATIC + item?.avatar} alt="Apple Watch" />
                </td>
                <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                  {item.email}
                </td>
                <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                  {item.userName}
                </td>
                <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                  {item?.userRole?.name}
                </td>
                <td className="py-4 px-6 flex flex-col ">
                  <button
                    onClick={() => deleteAsyncRolesUser(item?._id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline my-4 text-left"
                  >
                    Remove
                  </button>
                  <Link
                    to={`update-user/${item._id}`}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline my-4 text-left"
                  >
                    Update
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListUser;
