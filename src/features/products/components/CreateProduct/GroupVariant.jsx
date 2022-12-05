import React, { useEffect } from "react";
import { useWatch } from "react-hook-form";
import { RiCloseFill } from "react-icons/ri";
import InputVariant from "./InputVariant";

const GroupVariant = ({  index, register, errors, remove, control, handleSetProductItems    }) => {

  return (
    <div className="bg-gray-100 p-4 relative mb-4">
      <div className="flex flex-col gap-2 mb-6">
        <span className="text-lg">Group classification {index + 1}</span>
        <span className="text-sm  text-red-500 ">
          {errors?.variants?.[index]?.k?.message}
        </span>
        <input
          {...register(`variants[${index}].k`, {
            required: {
              value: true,
              message: "This field is required",
            },
          })}
          className={`outline-none  border !py-3 px-3 w-1/2 rounded-md text-sm ${
            errors?.variants?.[index]?.k?.message ? "border-red-500" : ""
          }`}
          placeholder="color, size..."
        />
      </div>
      <div className="">
        <InputVariant
          register={register}
          control={control}
          index={index}
          errors={errors}
          handleSetProductItems={handleSetProductItems}
        />
      </div>
      <button
        type="button"
        onClick={() => remove(index)}
        className="absolute top-0 right-0 p-4 text-2xl"
      >
        <RiCloseFill />
      </button>
    </div>
  );
};

export default GroupVariant;
