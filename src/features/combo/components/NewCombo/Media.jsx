import React from "react";
import { useFormContext } from "react-hook-form";
import { InputFile } from "../../../../components";

const Media = () => {
  const { register, formState: {errors}, setValue, watch } = useFormContext();

  const clearImg = () => {
    URL.revokeObjectURL(watch("image").preview)
    setValue("image", '')
  }

  return (
    <div>
      <InputFile
        label="image"
        imageSrc={watch("image")?.preview || ''}
        error={errors?.image?.message}
        clearImg = {() => clearImg()}
        register = {{...register("image", {
          required: {
            value: true,
            message: "Image is required",
          },
          pattern: {
            value: /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i,
          },
          onChange: (e) => {
            if(e.target.files.length > 0) {
                const file = e.target.files;
                file.preview = URL.createObjectURL(file[0])
            }
          },
        })}}
      />
    </div>
  ); 
};

export default Media;
