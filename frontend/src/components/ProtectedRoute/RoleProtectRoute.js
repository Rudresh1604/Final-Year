import React from "react";
import { Navigate } from "react-router-dom";

const RoleProtectRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  const role = JSON.parse(localStorage.getItem("userRole"));
  if (!token) {
    return <Navigate to="/login" replace />; //no token redirect to login
  }
  if (role !== allowedRole) {
    return <Navigate to="/login" replace />; //login but role not matched
  }
  return children;
};

export default RoleProtectRoute;
