import { useState } from "react";
import { createUserRole, delUserRole, getUserRoles, updateUserRole } from "../api";

const useRoleUser = () => {
  const [methods, setMethods] = useState({
    data: [],
    error: "",
  });

  const getAsyncRolesUser = async () => {
    try {
      const res = await getUserRoles();
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

  const createAsyncRolesUser = async (data, reset) => {
    try {
      await createUserRole(data);
      getAsyncRolesUser();
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
        await delUserRole(id);
        getAsyncRolesUser();
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

  
  const updateAsyncRolesUser = async (data, setIsUpdating) => {
    try {
      await updateUserRole(data._id, data);
      setIsUpdating(false);
      getAsyncRolesUser()
    } catch (error) {
      setMethods({
        ...methods,
        error: error?.response?.data?.message
          ? error.response?.data?.message
          : "something went wrong!",
      });
    }
  };



  return {
    ...methods,
    getAsyncRolesUser,
    createAsyncRolesUser,
    deleteAsyncRolesUser,
    updateAsyncRolesUser
  };
};

export default useRoleUser;
