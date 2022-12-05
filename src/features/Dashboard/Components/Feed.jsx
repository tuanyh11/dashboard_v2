import React from "react";
import { RiArrowDropUpFill } from "react-icons/ri";
import { Line, LineChart, ResponsiveContainer, AreaChart } from "recharts";

const data = [{ total: 42 }, { total: 40 }, { total: 100 }, { total: 20 }];

const Feed = ({ label, total }) => {
  return (
    <div className=" text-center flex items-center justify-center bg-white shadow-lg shadow-black/10 rounded-lg p-auto min-h-[8.7rem]">
      <div>
        <h1 className="capitalize text-base font-medium text-slate-600">
          {label}
        </h1>
        <h2 className="mt-2 text-3xl font-semibold text-slate-700 ">{total}</h2>
        <div className="text-5xl text-green-500 flex gap-1 items-center">
          <RiArrowDropUpFill />
          <p className="text-base">220%</p>
        </div>
      </div>
    </div>
  );
};

export default Feed;
