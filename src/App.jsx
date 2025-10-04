import { Routes, Route, Navigate } from "react-router-dom";
import Login from "~/pages/auth/login";
import Register from "~/pages/auth/Register";
import AuthLayout from "~/components/authLayout/AuthLayout";
import Verify from "~/pages/auth/Verify";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/layout/Layout";
import InternManagement from "./pages/internManagement/InternManagement";
function App() {
  return (
    <>
      <ToastContainer
        position="top-right" // Vị trí góc trên phải (như component cũ)
        autoClose={3000} // Tự đóng sau 3 giây
        hideProgressBar={false} // Hiển thị progress bar (tùy chọn)
        newestOnTop={false}
        closeOnClick // Đóng khi nhấp vào toast (như yêu cầu của bạn)
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" // Theme: light/dark/colored (thử 'colored' để đẹp hơn)
      />
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          {/* <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="change-password" element={<ChangePassword />} /> */}
          <Route index element={<Navigate to="/auth/login" />} />
        </Route>
        <Route path="verify" element={<Verify />} />
        <Route path="/" element={<Layout />}>
          <Route path="intern" element={<InternManagement />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
