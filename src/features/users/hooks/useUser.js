import { useState } from "react";
import { delImage, uploadSigleImage } from "../../../api";
import { createUser, getUser, getUsers, updateUser, delUser } from "../../products/api";
import {
  createUserRole,
  delUserRole,
  getUserRoles,
  getUserStats,
  updateUserRole,
} from "../api";

const useUser = () => {
  const [methods, setMethods] = useState({
    data: [],
    error: "",
  });

  const getAsyncUsers = async () => {
    try {
      const res = await getUsers();
      setMethods({ ...methods, data: res.data.data });
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

  const getAsyncUserById = async (id) => {
    try {
      const res = await getUser(id);
      setMethods({ ...methods, data: res.data.data });
    } catch (error) {
      setMethods({
        ...methods,
        error: error?.response?.data?.message
          ? error.response?.data?.message
          : "something went wrong!",
      });
    }
  };
  const createAsyncUser = async (data, reset) => {
    try {
      const formData = new FormData();
      formData.append("single_image", data.avatar[0]);
      const res = await uploadSigleImage(formData);
      data.avatar = res.data.data;
      await createUser({ ...data });
      window.confirm("create user successfully");
      reset();
    } catch (error) {
      setMethods({
        ...methods,
        error: error?.response?.data?.message
          ? error.response?.data?.message
          : "something went wrong!",
      });
    }
  };

  const deleteAsyncRolesUser = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this role?")) {
        await delUser(id);
        getAsyncUsers();
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

  const updateAsyncUser = async (data, nav) => {
    try { 

      if (data?.newImage?.[0]?.preview) {

        const formData = new FormData();
        formData.append("single_image", data.newImage?.[0]);
        data.avatar && (await delImage(data.avatar));
        const res = await uploadSigleImage(formData);

        data.avatar = res.data.data;
        await updateUser(data._id, { ...data });
        nav("/users");
        return;
      }
      
      const {newImage, ...rest} = data


      await updateUser(data._id, { ...rest });
      nav("/users");
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

  const getAsyncUserStats = async () => {
    try {
      const res = await getUserStats()
      setMethods({ ...methods, data: res.data.data });
    } catch (error) {
      setMethods({
        ...methods,
        error: error?.response?.data?.message
          ? error.response?.data?.message
          : "something went wrong!",
      });
    }
  }

  return {
    ...methods,
    getAsyncUsers,
    createAsyncUser,
    getAsyncUserById,
    updateAsyncUser,
    getAsyncUserStats,
    deleteAsyncRolesUser
  };
};

export default useUser;
