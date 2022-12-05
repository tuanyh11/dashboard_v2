import React from "react";
import { RiDeleteBin3Line, RiFileAddLine } from "react-icons/ri";
import Button from "./Button";
import Message from "./Message";

const InputFile = ({
  label = "Image",
  register,
  imageSrc,
  error,
  clearImg = () => {},
  isShowbutton = true,
}) => {
  return (
    <div>
      <label className="block text-sm text-gray-500 mb-4 dark:text-gray-400">
        {label}
      </label>
      <div className=" border-2 border-gray-300 border-dashed h-64 flex items-center justify-center">
        <label
          htmlFor="file"
          className="text-6xl text-gray-500 hover:text-gray-700"
        >
          <RiFileAddLine />
        </label>
      </div>
      <div className=" rounded-xl   flex justify-center items-center">
        <div className="relative shadow-black/30 p-2  w-96 h-96  mt-10 shadow-lg group  flex">
          <img
            src={imageSrc}
            alt=""
            className="m-auto "
          />
          {isShowbutton && <div className="absolute bottom-0 h-1/2 py-1 hidden w-full text-6xl group-hover:flex bg-black/20 items-center  justify-center   left-0 right-0">
            <RiDeleteBin3Line onClick={() => clearImg()} className="cursor-pointer text-slate-300 hover:text-slate-100" />
          </div>}
        </div>
      </div>
      <input type="file" id="file" className="hidden" {...register} />
      {error && <Message text={error} />}
    </div>
  );
};

export default InputFile;
