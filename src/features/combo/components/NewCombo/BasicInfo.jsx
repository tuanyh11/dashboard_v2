import JoditEditor from "jodit-react";
import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../../../../components";

const BasicInfo = () => {

    const {register, formState: {errors}} = useFormContext()

  return (
    <div>
      <Input
        label={"Name"}
        error={errors?.name?.message}
        register={{
          ...register("name", {
            required: {
              value: true,
              message: "This field is required",
            },
          }),
        }}
      />

      <div className="my-10">
        <label className="block text-sm text-gray-500 mb-4 dark:text-gray-400">
          {"Discription"}
        </label>
        <JoditEditor
        // ref={ref}
        // onChange={(newContent) => {
        //   setValue(name, newContent);
        // }}
        />
      </div>
      
    </div>
  );
};

export default BasicInfo;
