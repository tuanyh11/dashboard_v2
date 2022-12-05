import React from "react";
import { Button, Input, Message } from "../components";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);

  const [errorRes, setErrorRes] = useState("")

  const nav = useNavigate()

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // console.log(errors);

  const handleLogin = (data) => {
    setErrorRes("")
    login(data, setErrorRes, nav)
  }


  return (
    <div
      className="flex justify-center items-center h-[100vh] bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80')`,
      }}
    >
      <div className="shadow-lg w-1/4 p-8 bg-white rounded-lg">
        <div className="mb-8 bg-blue-500 text-white px-2 py-6 shadow-blue-500/50 shadow-md from-blue-600 to-blue-400 bg-gradient-to-tr rounded-md text-center">
          <h1 className="text-4xl font-medium">Login</h1>
        </div>
        <form action="" className="" onSubmit={handleSubmit(handleLogin)}>
          <Input
            label={"Email"}
            inputProp={{ placeholder: " " }}
            error={errors?.email?.message}
            register={{ ...register("email",{
              required: {
                value: true,
                message: "Please enter your email address",
              },
            }) }}
          />
          <Input
            label={"Password"}
            inputProp={{ placeholder: " ", type: showPassword ? "text": "password" }}
            error={errors?.password?.message}
            register={{
              ...register("password", {
                required: {
                  value: true,
                  message: "Please enter your password",
                },
              }),
            }}
          />

          <div className="">
            {errorRes && <Message text={errorRes}/>}
          </div>

          <div className="flex items-center gap-2 text-sm my-5">
            <input type="checkbox" onClick={() => setShowPassword(pre => !pre)} className="cursor-pointer" />
            <span className="">Show password</span>
          </div>
          <Button label={"Login"} type={"submit"} />
          
        </form>
      </div>
    </div>
  );
};

export default Login;
