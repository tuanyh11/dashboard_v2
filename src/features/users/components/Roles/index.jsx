import React, { useState } from "react";
import { Message } from "../../../../components";
import useRoleUser from "../../hooks/useRoleUser";
import ListRoles from "./ListRoles";
import NewRoles from "./NewRoles";
import UpdateRoles from "./UpdateRoles";

const index = () => {
  const {
    data,
    getAsyncRolesUser,
    createAsyncRolesUser,
    deleteAsyncRolesUser,
    updateAsyncRolesUser,
    error,
  } = useRoleUser();

  const [isUpdating, setIsUpdating] = useState(false);

  const [selectItem, setSelectItem] = useState();

  const handleUpdate = (item) => {
    setIsUpdating(true);
    setSelectItem(item);
  };

  return (
    <div>
      <div className="grid grid-cols-2 bg-white shadow-md w-full rounded-xl px-4 py-10 mt-40 gap-8">
        <div>
          {isUpdating ? (
            <UpdateRoles
              role={selectItem}
              updateAsyncRolesUser={(data, reset) => updateAsyncRolesUser(data, setIsUpdating, reset)}
            />
          ) : (
            <NewRoles createAsyncRolesUser={createAsyncRolesUser} />
          )}
          <div className="mt-2">
            <Message text={error} />
          </div>
        </div>
        <ListRoles
          roles={data}
          getAsyncRolesUser={getAsyncRolesUser}
          deleteAsyncRolesUser={deleteAsyncRolesUser}
          handleUpdate={handleUpdate}
        />
      </div>
    </div>
  );
};

export default index;
