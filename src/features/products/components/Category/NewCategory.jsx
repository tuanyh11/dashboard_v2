import React from "react";
import { useForm } from "react-hook-form";
import { Input, InputFile } from "../../../../components";
import useCategory from "../../../../hooks/useCategories";

const NewCategory = ({createCategory}) => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    reset,
    setValue,
    unregister
  } = useForm({defaultValues: {image: '', category: ''}});


  const clearImg = () => {
    URL.revokeObjectURL(watch("image")?.[0]?.preview )
    setValue("image", '')
  }

  return (
    <div>
      <div>
        <Input
          error={errors?.category?.message}
          label={"Category"}
          register={{
            ...register("category", {
              required: {
                value: true,
                message: "Category name cannot be empty",
              },
            }),
          }}
        />
        <InputFile
          label="image"
          error={errors?.image?.message}
          imageSrc={watch("image")?.[0]?.preview || ''}
          clearImg={() => clearImg()}
          register={{
            ...register("image", {
              required: {
                value: true,
                message: "Image is required",
              },
              pattern: {
                value: /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i,
              },
              onChange: (e) => {
                if(e.target.files.length > 0)  {
                const file = e.target.files[0]
                file.preview = URL.createObjectURL(file)
                }
              },
            }),
          }}
        />
        <div className="flex  justify-center">
          <button onClick={handleSubmit(data => createCategory(data, reset))} className="uppercase text-base px-4 py-2 bg-slate-700 text-white rounded-md"> Create</button>
        </div>
      </div>
    </div>
  );
};

export default NewCategory;
