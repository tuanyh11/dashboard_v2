import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Heading } from "../components";

const Users = () => {
  const location = useLocation();

  const headingText = location.pathname
    .substring(1)
    .replace(
      "/", `<span class='text-sm font-bold text-gray-400 mx-2'>/</span>`
    );

  return (
    <div>
      <div className="">
        <Heading text={headingText} />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Users;
