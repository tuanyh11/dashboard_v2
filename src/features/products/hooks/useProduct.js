import { useState } from "react";
import { RiContactsBookLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { API, uploadMultipleImage, uploadSigleImage } from "../../../api";
import {
  createProcuct,
  delProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../api";

const useProduct = () => {
  const [methods, setMethods] = useState({
    data: [],
    error: "",
  });

  const nav = useNavigate();

  const createAsyncProduct = async (dataForm) => {
    let { productItems, image, price } = dataForm;

    console.log(productItems);
    let formDataListImg = new FormData();

    let formDataProdImg = new FormData();

    formDataProdImg.append("single_image", image[0]);

    let itHasImage = false;
    let listPrice;
    let totalQuantity;
    let priceMax;
    let priceMin;

    const productItemsExisting = productItems.length > 0;
    if (productItemsExisting) {
      listPrice = productItems.map((element) => {
        if (element?.image?.[0]?.preview) {
          formDataListImg.append("multiple_image", element?.image?.[0]);
          itHasImage = true;
          // URL.revokeObjectURL(element?.image?.preview)
        }
        return element.price;
      });

      totalQuantity = productItems.reduce(function (accumulator, currentValue) {
        return accumulator + Number(currentValue.quantity);
      }, 0);

      priceMax = Math.max(...listPrice);
      priceMin = Math.min(...listPrice);
    }

    try {
      const { data: resImg } = await uploadSigleImage(formDataProdImg);
      if (itHasImage) {
        const { data } = await uploadMultipleImage(formDataListImg);

        productItems = productItems.map((element) => {
          const matchImg = data?.data?.find(
            (image) => image?.originalname === element.image?.[0]?.name
          );
          if (matchImg) return { ...element, image: matchImg.filename };
          return { ...element, image: null };
        });

        await createProcuct({
          ...dataForm,
          productItems,
          image: resImg?.data,
          priceMax,
          priceMin,
          price: priceMin,
          quantity: totalQuantity,
        });
        nav("/products");
        return;
      }

      if (productItemsExisting) {
        await createProcuct({
          ...dataForm,
          productItems,
          image: resImg?.data,
          priceMax,
          priceMin,
          price: priceMin,
          quantity: totalQuantity,
        });
        nav("/products");
        return;
      }

      await createProcuct({
        ...dataForm,
        image: resImg.data,
        priceMax: price,
        priceMin: price,
      });
      nav("/products");
    } catch (error) {
      console.log(error);
      setMethods({
        ...methods,
        error: error?.response?.data?.message
          ? error.response?.data?.message
          : "something went wrong!",
      });
    }
  };

  const getAsyncProducts = async () => {
    try {
      const { data } = await getProducts();
      setMethods({ ...methods, data: data?.data });
    } catch (error) {
      setMethods({
        ...methods,
        error: error?.response?.data?.message
          ? error.response?.data?.message
          : "something went wrong!",
      });
    }
  };

  const getAsyncProductById = async (id) => {
    try {
      const { data } = await getProduct(id);
      setMethods({ ...methods, data: data?.data });
    } catch (error) {
      setMethods({
        ...methods,
        error: error?.response?.data?.message
          ? error.response?.data?.message
          : "something went wrong!",
      });
    }
  };

  const delAsyncProdoct = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this product?")) {
        await delProduct(id);
        alert("delete product successfully");
        getAsyncProducts();
      }
    } catch (error) {
      setMethods({
        ...methods,
        error: error?.response?.data?.message
          ? error.response?.data?.message
          : "something went wrong!",
      });
    }
  };

  const updateAsyncProduct = async (dataForm, id) => {
    let { productItems, image, price } = dataForm;
    let formDataListImg = new FormData();

    let formDataProdImg = new FormData();

    let itHasImage = false;
    let listPrice;
    let totalQuantity;
    let priceMax;
    let priceMin;

    console.log(dataForm)

    const productItemsExisting = productItems.length > 0;
    if (productItemsExisting) {
      listPrice = productItems.map((element) => {
        if (element?.image?.[0]?.preview) {
          formDataListImg.append("multiple_image", element?.image?.[0]);
          itHasImage = true;
        }
        return element.price;
      });

      totalQuantity = productItems.reduce(function (accumulator, currentValue) {
        return accumulator + Number(currentValue.quantity);
      }, 0);

      priceMax = Math.max(...listPrice);
      priceMin = Math.min(...listPrice);
    }

    try {
      let resImg;
      if (image?.[0]?.preview) {
        formDataProdImg.append("single_image", image?.[0]);
        resImg = await uploadSigleImage(formDataProdImg);
      }

      if (itHasImage) {
        const { data } = await uploadMultipleImage(formDataListImg);
        productItems = productItems.map((element) => {
          const matchImg = data?.data?.find(
            (image) => image?.originalname === element.image?.[0]?.name
          );
          if (matchImg) return { ...element, image: matchImg.filename };
          return element;
        });

        console.log(productItems)
        await updateProduct(id, {
          ...dataForm,
          productItems,
          image: resImg?.data.data,
          priceMax,
          priceMin,
          price: priceMin,
          quantity: totalQuantity,
        });
        nav("/products");
        return;
      }

      if (productItemsExisting) {
        await updateProduct(id, {
          ...dataForm,
          productItems,
          image: resImg?.data.data,
          priceMax,
          priceMin,
          price: priceMin,
          quantity: totalQuantity,
        });
        nav("/products");
        return;
      }

      await updateProduct(id, {
        ...dataForm,
        image: resImg?.data.data,
        priceMax: price,
        priceMin: price,
      });

      nav("/products");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    ...methods,
    createAsyncProduct,
    getAsyncProducts,
    delAsyncProdoct,
    updateAsyncProduct,
    getAsyncProductById,
  };
};

export default useProduct;
