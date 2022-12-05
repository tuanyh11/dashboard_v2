import JoditEditor from "jodit-react";
import React, { useEffect, useState } from "react";
import { useController, useForm } from "react-hook-form";
import {
  DropdownCheckBox,
  Input,
  InputFile,
  Message,
} from "../../../../components";
import useRoleUser from "../../hooks/useRoleUser";
import useUser from "../../hooks/useUser";

const NewUser = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
    control,
    setError
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      roleId: undefined,
      userName: "",
      avatar: "",
      address: {
        name: "",
        phone: "",
      },
      contract: {
        dateStart: "",
        dateEnd: "",
        content: "",
      },
    },
  });

  const { data: roles, getAsyncRolesUser } = useRoleUser();
  const { data, createAsyncUser } = useUser();


  const isEmployee = ["nhanvien", "employee", "nhânviên"].includes(
    roles.find(({ _id }) => _id === watch("roleId"))?.name
  );




  useEffect(() => {
    getAsyncRolesUser();
  }, []);

  const handleUpdate = (item) => {
    Object.entries(item).forEach(([key, value]) => setValue(key, value));
    setIsUpdate(true);
  };

  const clearImg = () => {
    URL.revokeObjectURL(watch("avatar")?.[0]?.preview);
    setValue("avatar", "");
  };

  console.log(errors);

  return (
    <div>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl">
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-0 gap-8">
            <div className="">
              <form
                action=""
                onSubmit={handleSubmit((data) => createAsyncUser(data, reset))}
              >
                <Input
                  label={"email"}
                  error={errors?.email?.message}
                  register={{
                    ...register("email", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                      pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                        message: "Invalid email address",
                      },
                    }),
                  }}
                />

                <Input
                  label={"password"}
                  error={errors?.password?.message}
                  register={{
                    ...register("password", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                      minLength: {
                        value: 5,
                        message: "This field should be at least 5 characters",
                      },
                    }),
                  }}
                />

                <Input
                  label={"password Confirm"}
                  error={errors?.passwordConfirm?.message}
                  register={{
                    ...register("passwordConfirm", {
                      validate: (value) =>
                        value === watch("password") ||
                        "The passwords do not match",
                    }),
                  }}
                />

                <Input
                  label={"User name"}
                  error={errors?.userName?.message}
                  register={{
                    ...register("userName", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                      minLength: {
                        value: 5,
                        message: "This field should be at least 5 characters",
                      },
                    }),
                  }}
                />

                <div className="mt-10">
                  <DropdownCheckBox
                    data={roles}
                    displayValue={(item) => item._id}
                    disPlayItem={(item) => item?.displayName}
                    label={"Roles"}
                    type="radio"
                    register={{ ...register("roleId") }}
                  />
                </div>

                <div className="mt-10">
                  <InputFile
                    clearImg={clearImg}
                    imageSrc={watch("avatar")?.[0]?.preview || ""}
                    register={{
                      ...register("avatar", {
                        required: {
                          value: true,
                          message: "Image is required",
                        },
                        pattern: {
                          value: /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i,
                        },
                        onChange: (e) => {
                          if (e.target.files.length > 0) {
                            const file = e.target.files[0];
                            file.preview = URL.createObjectURL(file);
                          }
                        },
                      }),
                    }}
                    name={"avatar"}
                    label="User Image"
                    error={errors?.avatar?.message}
                  />
                </div>

                {isEmployee && (
                  <div className="">
                    <div className="text-3xl font-extrabold tracking-tight text-slate-900 my-10">
                      Contract
                    </div>
                    <div className="">
                      <Message
                        text={
                          errors?.contract?.content?.message ||
                          errors?.contract?.dateEnd?.message
                        }
                      />
                    </div>
                    <div className="flex items-center  gap-4 mb-10">
                      <span className="text-sm font-medium mb-1">End Date</span>
                      <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <input
                          datepicker=""
                          datepicker-autohide=""
                          {...register("contract.dateEnd", {
                            required: {
                              value: true,
                              message: "This field is required",
                            },
                          })}
                          type="date"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input"
                          placeholder="Select date"
                        />
                      </div>
                    </div>
                    <JoditEditor
                      ref={
                        register("contract.content", {required: {value: true, message: "This field is required "}}).ref
                      }
                      value={watch("contract.content")}
                      onBlur={(newContent) => {
                        console.log(newContent)
                        if(newContent !== '<p><br></p>' && newContent.length > 200) {
                          setValue("contract.content", newContent);
                          setError("contract.content", null)
                          return
                        }
                        setError("contract.content", {type: "error", message: "This field is required or at least more than 200 characters"})
                      }}
                    />
                  </div>
                )}
                <div className="flex  justify-center mt-10">
                  <button
                    type="submit"
                    className="uppercase text-base px-4 py-2 bg-slate-700 text-white rounded-md shadow-sm shadow-black/20"
                  >
                    {" "}
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
