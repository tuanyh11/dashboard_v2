import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { URL_API, URL_STATIC } from "../../../../config/CONST";
import useProduct from "../../hooks/useProduct";

const index = () => {

    const {data, getAsyncProducts, delAsyncProdoct} = useProduct()

    useEffect(() => {
        getAsyncProducts()
    }, [])

  return (
    <div className="mt-10">
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="py-3 px-6">
                Product
              </th>
              <th scope="col" className="py-3 px-6">
                Qty
              </th>
              <th scope="col" className="py-3 px-6">
                Price
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => ( 
              <tr
                key={product._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4 w-32">
                  <img src={`${URL_STATIC}${product.image}`} className="w-24 h-24 max-h-24 max-w-24 object-scale-down" alt="Apple Watch" />
                </td>
                <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                  {product.name}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    {product.quantity}
                  </div>
                </td>
                <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                  {product.price}
                </td>
                <td className="py-4 px-6 text-start">
                  <button
                    onClick={() => delAsyncProdoct(product._id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline mr-4"
                  >
                    Remove
                  </button>
                  <Link
                    to={"update-product/" + product._id}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-4"
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

export default index;
