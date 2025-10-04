import React from "react";
import { Outlet } from "react-router-dom";
import "./Auth.css";

const AuthLayout = () => {
  return (
    <div className="auth-container">
      <Outlet />
      <footer className="footer">© 2025 Intern Ship</footer>
    </div>
  );
};

export default AuthLayout;
