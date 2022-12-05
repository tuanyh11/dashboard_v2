import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input, InputFile } from "../../../../components";
import { URL_STATIC } from "../../../../config/CONST";
import useCategory from "../../../../hooks/useCategories";

const UpdateCategory = ({updateCategory, selectItem, onClick }) => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    setValue
  } = useForm({defaultValues: {image: '', name: ''}});


  const clearImg = () => {
    if(watch("image")?.[0]?.preview) {
        URL.revokeObjectURL(watch("image")?.[0]?.preview )
        setValue("image", '')
    }

  }

  useEffect(() => {
    Object.entries(selectItem).forEach(([k, v]) => {
        setValue(k, v)
    })
    setValue("oldImage", selectItem.image)
  }, [selectItem])


  return (
    <div>
      <div >
        <Input
          error={errors?.category?.message}
          label={"Category"}
          register={{
            ...register("name", {
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
          imageSrc={watch("image")?.[0]?.preview || URL_STATIC + watch("image")}
          clearImg={() => clearImg()}
          register={{
            ...register("image", {
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
          <button onClick={handleSubmit(data => updateCategory(data, onClick))} className="uppercase text-base px-4 py-2 bg-slate-700 text-white rounded-md"> Update</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategory;
