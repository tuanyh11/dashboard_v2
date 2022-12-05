import React from "react";
import jwt_decode from "jwt-decode";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, isLogin }) => {
  const user = JSON.parse(localStorage.getItem("user"));

    if (user?.token) {
      const { exp } = jwt_decode(user.token);
      if (exp * 1000 < new Date().getTime()) {
        localStorage.clear();
        return <Navigate to={"/login"}/>
      }  
      return children

    } else return <Navigate to={"/login"}/>
  
};

export default ProtectedRoute;
