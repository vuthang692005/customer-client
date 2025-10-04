import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Calendar,
  Users,
  UserCheck,
  FileText,
  Award,
  Settings,
  Bell,
} from "lucide-react";
import "./Layout.css";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const [role, setRole] = useState(null);
  const [filteredMenu, setFilteredMenu] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("AccessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.scope);
        console.log(decoded.scope);
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

  const rolePermissions = {
    ADMIN: ["/user"],
    MENTOR: [],
    INTERN: [],
    HR: ["/intern"],
    VISITOR: [],
  };

  const menuItems = [
    { path: "/user", icon: UserCheck, label: "Quản lý người dùng" },
    { path: "/intern", icon: UserCheck, label: "Quản lý thực tập sinh" },
    // { path: "/dashboard", icon: Home, label: "Quản lý hồ sơ" },
    // { path: "/schedule", icon: Calendar, label: "Lịch" },
    // { path: "/documents", icon: FileText, label: "Tài liệu" },
    // { path: "/programs", icon: Award, label: "Quản lý chương trình thực tập" },
    // { path: "/mentor", icon: UserCheck, label: "Quản lý Mentor" },
    // { path: "/attendance", icon: Users, label: "Đi làm / Nghỉ phép" },
    // { path: "/allowance", icon: Award, label: "Phụ cấp" },
    // { path: "/reports", icon: FileText, label: "Báo cáo thống kê" },
    // { path: "/settings", icon: Settings, label: "Cài đặt" },
  ];

  useEffect(() => {
    if (role) {
      const allowedPaths = rolePermissions[role] || [];
      setFilteredMenu(
        menuItems.filter((item) => allowedPaths.includes(item.path))
      );
    }
  }, [role]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="layout-container">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          {sidebarOpen && (
            <div className="logo">
              <div className="logo-icon">IS</div>
              <span className="logo-text">INTERN SHIP</span>
            </div>
          )}
          {!sidebarOpen && <div className="logo-icon">IS</div>}
        </div>

        <nav className="sidebar-nav">
          {filteredMenu.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive ? "active" : ""}`}
                title={!sidebarOpen ? item.label : ""}
              >
                <Icon className="nav-icon" size={20} />
                {sidebarOpen && <span className="nav-label">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-wrapper">
        {/* Header */}
        <header className="header">
          <div className="header-left">
            <button className="menu-toggle" onClick={toggleSidebar}>
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="header-actions">
            <button className="icon-button">
              <Bell size={20} />
              <span className="notification-badge"></span>
            </button>
            <div className="user-profile">
              <div className="avatar">U</div>
              <span className="user-name">Your Account</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
