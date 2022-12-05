import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RiDatabaseFill } from "react-icons/ri";
import { Input } from "../../../../components";

const UpdateRoles = ({role, updateAsyncRolesUser}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset
  } = useForm({
    defaultValues: {
      name: "",
      displayName: ""
    },
  });


  useEffect(() => {
    Object.entries(role).forEach(([k, v]) => setValue(k, v))
  }, [role])

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
            onClick={handleSubmit((data) => updateAsyncRolesUser(data, reset))}
            className="uppercase text-base px-4 py-2 bg-slate-700 text-white rounded-md"
          >
            {" "}
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateRoles;
