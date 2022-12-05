import { useState } from "react";
import { API, delImage, uploadSigleImage } from "../api";
import { delCategory, updateCategory } from "../features/products/api";

const useCategory = () => {
  const [methods, setMethods] = useState({
    errors: "",
    data: [],
  });

  const createCategory = async (dataCate, reset) => {
    try {
      let imageData;
      imageData = new FormData();
      imageData.append("single_image", dataCate.image[0]);
      const resImagData = await uploadSigleImage(imageData);
      await API.post("/category", {
        image: resImagData.data.data,
        name: dataCate.category,
      });
      getCategories();
      reset()
    } catch (error) {
      console.log(error);
      setMethods({
        ...methods,
        errors: error?.response?.data?.message
          ? error.response?.data?.message
          : "something went wrong!",
      });
    }
  };

  var getCategories = async () => {
    try {
      const { data } = await API.get("/category");
      setMethods({ ...methods, data: data?.data });
    } catch (error) {
      setMethods({
        ...methods,
        errors: error?.response?.data?.message
          ? error.response?.data?.message
          : "something went wrong!",
      });
    }
  };

  const delAsyncCategory = async (id) => {
    if (window.confirm("do you want to delete this category?")) {
      try {
        await delCategory(id);
        alert("delete category successfully");
        getCategories();
      } catch (error) {
        setMethods({
          ...methods,
          errors: error?.response?.data?.message
            ? error.response?.data?.message
            : "something went wrong!",
        });
      }
    }
  };

  const updateAsyncCategory = async (data, next = () => {}) => {
    try {
      if (data.image instanceof FileList && data.image.length > 0) {
        let imageData;
        imageData = new FormData();
        imageData.append("single_image", data.image[0]);
        const { data: resImagData } = await uploadSigleImage(imageData);
        await delImage(data.oldImage);
        await updateCategory(data._id, {
          image: resImagData.data,
          name: data.name,
        });
        window.confirm("update category successfully");
        getCategories()
        next()

      } else {
        await updateCategory(data._id, {
          name: data.name,
        });
        window.confirm("update category successfully");
        getCategories()
        next()
      }
    } catch (error) {
      console.error(error);
      setMethods({
        ...methods,
        errors: error?.response?.data?.message
          ? error.response?.data?.message
          : "something went wrong!",
      });
    }
  };

  return {
    ...methods,
    getCategories,
    createCategory,
    delAsyncCategory,
    updateAsyncCategory,
  };
};

export default useCategory;
