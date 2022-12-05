import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { URL_STATIC } from "../../config/CONST";
import { userProfileData } from "../../data";
import Button from "./Button";

const UserProfile = ({ user }) => {
  const nav = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    nav("/login");
  };

  return (
    <div className="nav-item absolute right-1 top-16 z-40 bg-white shadow-md dark:bg-[#42464D] p-8 rounded-lg w-80">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        {/* <Button
          icon={<MdOutlineCancel  />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        /> */}
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        {user?.avatar ? (
          <img
            className="rounded-full h-8 w-8"
            src={ URL_STATIC + user.avatar}
            alt="user-profile"
          />
        ) : (
          <div className="text-2xl text-slate-500 cursor-pointer"><FaUserAlt /></div>
        )}
        <div>
          <p className="font-semibold text-sm dark:text-gray-200">
            {" "}
            {user?.userName}{" "}
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {" "}
            Administrator{" "}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {" "}
            info@shop.com{" "}
          </p>
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <div
            key={index}
            className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
          >
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                {" "}
                {item.desc}{" "}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <Button label={"logout"} onClick={() => handleLogout()} />
      </div>
    </div>
  );
};

export default UserProfile;
