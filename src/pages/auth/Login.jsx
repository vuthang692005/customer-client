// src/components/SignIn.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { login } from "~/services/authService";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ identifier, password, navigate });
  };

  return (
    <div className="auth-form-container">
      <h2>ĐĂNG NHẬP</h2>
      <p className="subtitle">Chào mừng trở lại</p>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Mật khẩu</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <div className="options-container">
          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Lưu mật khẩu</label>
          </div>
          <Link to="/forgot-password" className="auth-link">
            Quên mật khẩu?
          </Link>
        </div>
        <button type="submit" className="btn-primary">
          ĐĂNG NHẬP
        </button>
      </form>
      <p className="switch-form-text">
        Tạo tài khoản mới?{" "}
        <Link to="/auth/register" className="auth-link">
          ĐĂNG KÝ TẠI ĐÂY
        </Link>
      </p>
      <button className="btn-google">
        <FcGoogle className="google-icon" />
        Đăng nhập với Google
      </button>
    </div>
  );
};

export default Login;
