import React from "react";
import { useState } from "react";
import { FaUserAlt, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";
import { URL_STATIC } from "../../config/CONST";
import UserProfile from "./UserProfile";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [openDropdown, setOpenDropdown] = useState(false);
  return (
    <div>
      <div className="flex justify-between items-center p-4 bg-white shadow-lg shadow-black/10">
        <div>
          <h2 className="text-4xl font-medium text-cyan-500">Dashboard</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            {user?.avatar ? (
              <div onClick={() => setOpenDropdown(!openDropdown)} className="px-4 max-h-[40px] h-10  hover:bg-gray-500/10 flex justify-center gap-2 items-center rounded-md transition-all cursor-pointer">
                <img
                  className="max-w-6 w-6 max-h-6 h-6"
                  src={URL_STATIC + user.avatar}
                  alt=""
                />
                <h3 className="text-slate-600 text-xs font-bold">
                  {" "}
                  {`Hi I'm ${user.userName}`}
                </h3>
              </div>
            ) : (
              <button onClick={() => setOpenDropdown(!openDropdown)}  className=" max-w-[40px] w-10 max-h-[40px] h-10 text-slate-600  hover:bg-gray-500/10 flex justify-center items-center rounded-md transition-all">
                <FaUserAlt />
              </button>
            )}
            {openDropdown && 
              <UserProfile user={user}/>
            }
          </div>

          <button className="max-w-[40px] w-10 max-h-[40px] h-10 text-slate-600  hover:bg-gray-500/10 flex justify-center items-center rounded-md transition-all">
            <FaCog />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
