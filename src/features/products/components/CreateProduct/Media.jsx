import React from "react";
import { useFormContext } from "react-hook-form";
import { InputFile } from "../../../../components";
import { URL_API, URL_STATIC } from "../../../../config/CONST";

const Media = () => {
  const { register, watch, setValue, formState: {errors} } = useFormContext();

  const clearImg = () => {
    URL.revokeObjectURL(watch("image").preview)
    setValue("image", '')
  }

  return (
    <div>
      <div className="mb-2">
        <h3 className="text-xl text-gray-600">Media</h3>
      </div>
      <InputFile
        clearImg={() => clearImg()}
        imageSrc={watch("image")?.preview || URL_STATIC + watch("image")}
        error={errors?.image?.message}
        register={{
          ...register("image", {
            required: {
              value: watch("image") ? false : true,
              message: "Product image cannot be empty",
            },
            onChange: (e) => {
              if (e.target.files.length > 0) {
                const file = e.target.files;
                file.preview = URL.createObjectURL(file[0])
              }
            },
          }),
        }}
      />
    </div>
  );
};

export default Media;
