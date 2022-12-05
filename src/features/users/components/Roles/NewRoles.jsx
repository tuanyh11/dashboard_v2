import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RiDatabaseFill } from "react-icons/ri";
import { Input } from "../../../../components";

const NewRoles = ({createAsyncRolesUser, deleteAsyncRolesUser}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      displayName: ""
    },
  });

  const handleCreateRole = (data) => {
    createAsyncRolesUser(data, reset)
  }

  console.log()

  return (
    <div>
      <div>
        <Input
          label={"Role Name"}
          error={errors?.name?.message}
          register={{
            ...register("name", {
              required: {
                value: true,
                message: "This field is required",
              },
              onChange: (e) =>
                setValue("name", e.target.value.replace(" ", "")),
            }),
          }}
        />

        <Input
          error={errors?.displayName?.message}
          label={"Display Name"}
          register={{
            ...register("displayName", {
              required: {
                value: true,
                message: "This field is required",
              },
            }),
          }}
        />
        <div className="flex ">
          <button
            onClick={handleSubmit((data) => handleCreateRole(data))}
            className="uppercase text-base px-4 py-2 bg-slate-700 text-white rounded-md"
          >
            {" "}
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewRoles;
