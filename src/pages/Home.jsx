import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Tooltip } from "reactstrap";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { getORderStats } from "../api";
import { Heading } from "../components";
import { Feed } from "../features/Dashboard";
import useUser from "../features/users/hooks/useUser";

function toMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString("en-US", {
    month: "short",
  });
}

const feedData = [
  {
    label: "users",
    total: "200",
  },
  {
    label: "reviews",
    total: "200",
  },
  {
    label: "orders",
    total: "200",
  },
  {
    label: "products",
    total: "200",
  },
];

const Home = () => {
  const location = useLocation();

  const headingText = location.pathname
    .substring(1)
    .replace(
      "/",
      `<span class='text-sm font-bold text-gray-400 mx-2'>/</span>`
    );


    const [orderStats, setOrderStats] = useState([]);
    
  const { data, getAsyncUserStats } = useUser();

    const getOrderStatsAsync = async () => {
      try {
        const res = await getORderStats();
        console.log(res)
        setOrderStats(res.data.data)
      } catch (error) {
        console.log(error);
      }
    }

  useEffect(() => {
    getAsyncUserStats();
    getOrderStatsAsync()
  }, []);

  const newData = data.map((item) => ({
    ...item,
    month: toMonthName(Number(item._id)),
    users: item.total
  }));

  const newOrderStats = orderStats.map((item) => ({
    ...item,
    month: toMonthName(Number(item._id)),
    users: item.total
  }));



  return (
    <div>
      <div className="">
        <Heading text={"Dashboard"} />
        <div className="grid grid-cols-1 gap-10">
          <div className="grid grid-cols-4 gap-6 mt-10">
            {feedData.map((item, i) => (
              <Feed label={item.label} key={i} total={item.total} />
            ))}
          </div>

          <div className="flex  gap-6 ">
            <div className="bg-white shadow-lg shadow-black/10 rounded-lg p-5 w-6/12">
              <div className="mb-5">
                <h2 className="text-base font-medium  text-slate-600">
                  User Analysis
                </h2>
              </div>
              {data?.length > 0 && (
                <ResponsiveContainer width={"100%"} aspect={4 / 1}>
                  <LineChart data={newData}>
                    <XAxis dataKey="month" stroke="#5550bd" />
                    <Line
                      type="monotone"
                      dataKey={"users"}
                      stroke="#105cd9"
                      strokeWidth={3}
                    />
                    {/* <Tooltip /> */}
                    <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
                    <YAxis />
                    <Legend />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="bg-white shadow-lg shadow-black/10 rounded-lg p-5 w-6/12">
              <div className="mb-5">
                <h2 className="text-base font-medium  text-slate-600">
                  Order Analysis
                </h2>
                
              </div>
              {data?.length > 0 && (
                <ResponsiveContainer width={"100%"} aspect={4 / 1}>
                    <BarChart data={newOrderStats}>
                    <Bar 
                      dataKey={"total"}
                      fill="#105cd9"
                    />
                    <XAxis dataKey="month" stroke="#5550bd" />
                    {/* <Tooltip /> */}
                    <YAxis />
                    <Legend />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
