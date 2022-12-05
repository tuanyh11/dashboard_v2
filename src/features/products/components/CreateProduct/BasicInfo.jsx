import React from "react";
import { DropdownCheckBox, Input, InputFile } from "../../../../components";
import { useFieldArray, useFormContext } from "react-hook-form";
import JoditEditor from "jodit-react";
import { useEffect } from "react";
import useCategory from "../../../../hooks/useCategories";

const BasicInfo = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { getCategories, data } = useCategory();

  useEffect(() => {
    getCategories();
  }, []);

  // console.log(data)

  return (
    <div>
      <div className="mb-2">
        <h3 className="text-xl text-gray-600">Basic Information</h3>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <Input
          inputProp={{ placeholder: " " }}
          label={"Name"}
          error={errors?.name?.message}
          register={{
            ...register("name", {
              required: {
                value: true,
                message: "Product name cannot be empty",
              },

              minLength: {
                value: 2,
                message: "Product name must be at least 2 characters",
              },
            }),
          }}
        />

        <Input
          inputProp={{ placeholder: " " }}
          label={"Unit"}
          error={errors?.unit?.message}
          register={{
            ...register("unit", {
              required: {
                value: true,
                message: "Product Unit cannot be empty",
              },

              minLength: {
                value: 2,
                message: "Product Unit should be 10 characters long",
              },
            }),
          }}
        />

        <div className="">
          <label className="block text-sm text-gray-500 mb-4 dark:text-gray-400">
            {"Discription"}
          </label>
          <JoditEditor
            // ref={ref}
            onChange={(newContent) => {
              setValue("description", newContent);
            }}
          />
        </div>

        <DropdownCheckBox
          label={"Categories"}
          data={data}
          register={{...register('categories')}}
          disPlayItem={(item) => item?.name}
          displayValue={item => item?._id}
        />
      </div>
    </div>
  );
};

export default BasicInfo;
