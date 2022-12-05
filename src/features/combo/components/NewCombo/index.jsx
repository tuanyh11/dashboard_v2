import JoditEditor from "jodit-react";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { DropdownCheckBox, Input, InputFile } from "../../../../components";
import BasicInfo from "./BasicInfo";
import Media from "./Media";
import SaleInfo from "./SaleInfo";
import Selection from "./Selection";

const roadCreateProduct = [
  {
    name: "Basic Info",
    component: <BasicInfo />,
  },
  {
    name: "Media",
    component: <Media />,
  },
  {
    name: "Selection",
    component: <Selection />,
  },
  {
    name: "Sale Info",
    component: <SaleInfo />,
  },
];

const NewCombo = () => {
  const methods = useForm({
    defaultValues: {
      name: "",
      image: "",
      newImage: "",
      products: [],
      price: 0,
      saleInfo: {
        isSale: false,
        salePercent: 0,
      },
      saleAmount: 0,
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    control,
  } = methods;

  const [process, setProcess] = useState({
    currentProcess: 0,
    allProcesses: [0],
  });

  const handleProcess = (type) => {
    if (
      process.currentProcess < roadCreateProduct.length - 1 &&
      type === "next"
    ) {
      const newValue = Number(process.currentProcess) + 1;
      setProcess({
        ...process,
        currentProcess: newValue,
        allProcesses: [...process.allProcesses, newValue],
      });
    } else {
      if (process.currentProcess > 0) {
        const newValue = Number(process.currentProcess) - 1;
        process.allProcesses.pop();
        setProcess({
          ...process,
          currentProcess: newValue,
          allProcesses: [...process.allProcesses],
        });
      }
    }
  };

  const isLastItem = process.currentProcess === roadCreateProduct.length - 1

  const onSubmit = (data) => {
    if(!isLastItem) {
      handleProcess("next")
    }
  }

  console.log(errors)

  return (
    <div className=" flex justify-center mt-40 ">
      <div className="bg-white shadow-md w-full rounded-xl  p-4 ">
        <div className="uppercase text-xs grid grid-cols-4 font-semibold  items-center shadow-md shadow-blue-500/50 from-blue-500 to-blue-400 bg-gradient-to-tr text-white !py-5  mx-4 -mt-6 rounded-xl">
          {roadCreateProduct.map((road, i) => {
            const isSelecting = process.allProcesses.includes(i);
            return (
              <div
                key={i}
                className="flex flex-col justify-center gap-1 items-center relative text-white/60"
              >
                {i !== 0 && (
                  <div
                    className={`absolute bg-[#9fc9ff] transition duration-200 -left-1/2 right-1/2 ${
                      isSelecting ? "top-[20%]" : "top-[15%]"
                    } z-0 ${isSelecting ? "" : "opacity-40"}`}
                  >
                    <span className="border-t-2 block"></span>
                  </div>
                )}
                <span
                  className={` rounded-full ${
                    isSelecting
                      ? "bg-white w-4 h-4 transition delay-200"
                      : "bg-white/60 w-3 h-3"
                  } block relative z-10`}
                />
                <span className="">{road.name}</span>
              </div>
            );
          })}
        </div>

        <form
          className="mt-6"
          action=""
          onSubmit={handleSubmit((data) => onSubmit(data))}
        >
          <FormProvider {...methods}>
            {roadCreateProduct[process.currentProcess]?.component}
          </FormProvider>
          <div className="flex justify-between items-center mt-10">
            <button
              type="button"
              onClick={() => handleProcess("back")}
              className="py-2 rounded-lg to-slate-400 shadow-md from-slate-200 bg-gradient-to-br  font-semibold text-sm px-4 bg-slate-800 hover:shadow-xl"
            >
              Back
            </button>
            <button
              type={"submit"}
              className="py-2 rounded-lg relative layer-button text-white text-sm px-4 from-slate-800 to-slate-600 bg-gradient-to-br shadow-md hover:shadow-xl transition duration-100  "
            >
              {isLastItem ? "Create" : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCombo;
