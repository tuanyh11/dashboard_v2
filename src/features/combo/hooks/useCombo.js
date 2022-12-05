import { useState } from "react";
import { getCombos } from "../api";

const useCombo = () => {
  const [methods, setMethods] = useState({
    data: [],
    error: "",
  });

  var getAsyncCombo = async () => {
    try {
      const res = await getCombos();
      setMethods({...methods, data: res.data.data})
    } catch (error) {
      setMethods({
        ...methods,
        error: error?.response?.data?.message
          ? error.response?.data?.message
          : "something went wrong!",
      });
    }
  };

  return { ...methods, getAsyncCombo };
};

export default useCombo;
