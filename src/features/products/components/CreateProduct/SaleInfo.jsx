import React, { useEffect, useState } from "react";
import { useFieldArray, useForm, useFormContext, useWatch } from "react-hook-form";
import { RiContactsBookLine } from "react-icons/ri";
import { Input } from "../../../../components";
import GroupVariant from "./GroupVariant";
import TableVariant from "./TableVariant";

const SaleInfo = () => {
  const {
    control,
    register,
    formState: { errors },
    setValue,
    getValues
  } = useFormContext();

  const { append, fields, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const [dataVariants, setDataVariants] = useState([])

  const variants = useWatch({
    control,
    name: "variants",
  });

  const {
    formState: { errors: errorsApply },
    register: registerApply,
    handleSubmit: handleSubmitApply,
  } = useForm({
    defaultValues: {
      price: 1000,
      quantity: 1,
    },
    mode: "onBlur",
  });

  const handleApplyAll = (data) => {
    getValues("productItems")?.forEach((_, i) => {
      setValue(`productItems[${i}].price`, data.price);
      setValue(`productItems[${i}].quantity`, data.quantity);
    });
  };

  const handleSetProductItems = () => {

    if (variants?.length > 0) {
      const attributes = variants.reduce(
        (acc, { v: val }) => {
          return acc
            ?.map((el) => {
              return val?.map((element) => {
                return el.concat([element]);
              });
            })
            .reduce((acc, val) => acc.concat(val), []);
        },
        [[]]
      );

      const flatAttributes = attributes?.map((val) => {
        return val.map((item) => item.text);
      });


      const newProductItems = flatAttributes.reduce(
        (acc, val, i) =>{
      console.log(getValues("productItems")?.[i])

          return acc.concat({
            ...getValues("productItems")?.[i],
            option: val.join("-"),
            unique: val.sort().join("").replaceAll(" ", ""),
          })},
        []
      );

      setValue("productItems", newProductItems);
      // console.log(newProductItems)
      setDataVariants(newProductItems)

    }
  };

  useEffect(() => {
    handleSetProductItems()
  }, [variants])


  return (
    <div>
      <div className="mb-2">
        <h3 className="text-xl text-gray-600">Sale Information</h3>
      </div>

      <div>
        {fields.length === 0 ? (
          <>
            <Input
              label={"Price"}
              error={errors?.price?.message}
              register={{
                ...register("price", {
                  required: {
                    value: true,
                    message: "Product price is required",
                  },
                  maxLength: {
                    value: 20,
                    message: "Product price less than 20 characters long",
                  },
                  min: {
                    value: 1000,
                    message:
                      "Product price at least equal or greater than 1.000",
                  },
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Product price is should be mumber",
                  },
                }),
              }}
            />
            <Input
              label={"Quantity"}
              error={errors?.quantity?.message}
              register={{
                ...register("quantity", {
                  required: {
                    value: true,
                    message: "Product quantity is required",
                  },
                  maxLength: {
                    value: 20,
                    message: "Product quantity less than 20 characters long",
                  },
                  min: {
                    value: 0,
                    message: "Product quantity must greater than or equal zero",
                  },
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Product quantity is should be mumber",
                  },
                }),
              }}
            />
          </>
        ) : (
          fields.map((field, index) => {
            return (
              <GroupVariant
                key={index}
                index={index}
                field={field}
                register={register}
                errors={errors}
                remove={remove}
                setValue={setValue}
                variants={variants}
                handleSetProductItems={handleSetProductItems}
              />
            );
          })
        )}
      </div>

      <div>
        <div className="">
          <button
            type="button"
            onClick={() => append({ k: "", v: [{ text: "" }] })}
            className="flex items-center py-2 px-3 text-sm font-medium active:bg-blue-600 bg-blue-500 text-white rounded-lg"
          >
            Add Variant
          </button>
        </div>
      </div>

      {fields.length > 0 && (
        <div className="mt-10">
          <div className="flex items-center gap-4 my-8">
            <div className="flex flex-col gap-2 relative">
              <span className="text-sm  text-red-500 absolute -top-1/2">
                {errorsApply?.price?.message}
              </span>
              <input
                className={`outline-none  border !py-3 px-3  rounded-md text-sm appearance-none ${
                  errorsApply?.price?.message ? "border-red-500" : ""
                }`}
                placeholder="Price"
                {...registerApply(`price`, {
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "This field should be mumber",
                  },
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                  min: {
                    value: 1000,
                    message: "This field must be greater than or equal 1.000",
                  },
                })}
              />
            </div>
            <div className="flex flex-col gap-2 relative">
              <span className="text-sm  text-red-500 absolute -top-1/2">
                {errorsApply?.quantity?.message}
              </span>
              <input
                className={`outline-none  border !py-3 px-3  rounded-md text-sm appearance-none ${
                  errorsApply?.quantity?.message ? "border-red-500" : ""
                }`}
                placeholder="Quantity"
                {...registerApply("quantity", {
                  min: {
                    value: 1,
                    message: "this field should be greater than 0",
                  },
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Product price is should be mumber",
                  },
                })}
              />
            </div>
            <button
              // disabled={true}
              onClick={handleSubmitApply(handleApplyAll)}
              className="  py-2 px-3 text-base  font-bold bg-blue-500 text-white rounded-lg"
            >
              Apply All
            </button>
          </div>

          <TableVariant control={control} data={dataVariants} />
        </div>
      )}
    </div>
  );
};

export default SaleInfo;
