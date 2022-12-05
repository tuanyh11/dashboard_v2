import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { RiDeleteBinLine, RiFileAddFill } from "react-icons/ri";
import { Input } from "../../../../components";
import { URL_API, URL_STATIC } from "../../../../config/CONST";

const TableVariant = ({ control, data }) => {
  const {
    register,
    setValue,
    formState: { errors },
    watch,
    unregister,
  } = useFormContext();
  return (
    <div>
      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Option
              </th>
              <th scope="col" className="py-3 px-6">
                Price
              </th>
              <th scope="col" className="py-3 px-6">
                image
              </th>
              <th scope="col" className="py-3 px-6">
                quantity
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, i) => {
              const errorPrice = errors?.productItems?.[i]?.price?.message;
              const errorQuantity =
                errors?.productItems?.[i]?.quantity?.message;
              const image = watch(`productItems.[${i}].image`);
              return (
                <tr
                  key={i}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="py-8 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.option}
                  </th>
                  <td className="py-8 px-6">
                    <div className="flex flex-col gap-2 relative">
                      <Input
                        error={errorPrice}
                        label="Price"
                        inputProp={{ style: { marginBottom: "0px" } }}
                        register={{
                          ...register(`productItems.[${i}.price]`, {
                            onChange: (e) => {
                              setValue(
                                `productItems.[${i}].price`,
                                e.target.value
                              );
                            },
                            required: {
                              value: true,
                              message: "This field is required",
                            },
                            pattern: {
                              value: /^[0-9]*$/,
                              message: "This field should be mumber",
                            },
                            min: {
                              value: 1000,
                              message:
                                "This field must be greater than or equal 1.000",
                            },
                          }),
                        }}
                      />
                    </div>
                  </td>
                  <td className="py-8 px-6">
                    {image?.[0]?.preview ? (
                      <div className="relative w-16 h-16 group ">
                        <img
                          src={image?.[0]?.preview}
                          alt=""
                          className="border w-full h-full object-contain "
                        />
                        <div className="absolute bottom-0 py-1 hidden group-hover:flex bg-gray-200  justify-center text-lg  left-0 right-0">
                          <RiDeleteBinLine
                            onClick={() => {
                              setValue(`productItems.[${i}].image`, "");
                            }}
                            className="cursor-pointer hover:text-gray-900"
                          />
                        </div>
                      </div>
                    ) : image?.length ? (
                      <div className="relative w-16 h-16 group ">
                        <img
                          src={URL_STATIC + image}
                          alt=""
                          className="border w-full h-full object-contain "
                        />
                        <div className="absolute bottom-0 py-1 hidden group-hover:flex bg-gray-200  justify-center text-lg  left-0 right-0">
                          <RiDeleteBinLine
                            onClick={() => {
                              setValue(`productItems.[${i}].image`, "");
                            }}
                            className="cursor-pointer hover:text-gray-900"
                          />
                        </div>
                      </div>
                    ) : (
                      <label
                        className="text-4xl  text-primary cursor-pointer"
                        htmlFor={`idfile-${i}`}
                      >
                        <RiFileAddFill />
                      </label>
                    )}
                    <input
                      type="file"
                      id={`idfile-${i}`}
                      {...register(`productItems.[${i}].image`, {
                        onChange: (e) => {
                          if (e.target.files.length > 0) {
                            const file = e.target.files[0];
                            file.preview = URL.createObjectURL(file);
                          }
                        },
                      })}
                      className="hidden"
                    />
                  </td>
                  <td className="py-8 px-6">
                    <div className="flex flex-col gap-2 relative ">
                      <Input
                        error={errorQuantity}
                        label={"Quantity"}
                        register={{
                          ...register(`productItems.[${i}.quantity]`, {
                            onChange: (e) => {
                              setValue(
                                `productItems.[${i}].quantity`,
                                e.target.value
                              );
                            },
                            required: {
                              value: true,
                              message: "This field is required",
                            },
                            pattern: {
                              value: /^[0-9]*$/,
                              message: "This field should be mumber",
                            },
                            min: {
                              value: 1,
                              message: "This field must be greater than 0",
                            },
                          }),
                        }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableVariant;
