import AuthApi from "~/api/AuthApi";
import { toast } from "react-toastify";

export const login = async ({ identifier, password, navigate }) => {
  try {
    const res = await AuthApi.login({ identifier, password });

    localStorage.setItem("AccessToken", res.accessToken);
    localStorage.setItem("RefreshToken", res.refreshToken);

    navigate("/");
  } catch (err) {
    if (err.response) {
      toast.error(err.response.data || "Đăng nhập thất bại");
    } else {
      toast.error("Không thể kết nối đến server");
    }
  }
};

export const register = async ({
  username,
  email,
  password,
  fullName,
  navigate,
}) => {
  try {
    await AuthApi.register({ username, email, password, fullName });
    navigate("/verify");
  } catch (err) {
    if (err.response) {
      toast.error(err.response.data || "Đăng kí thất bại");
    } else {
      toast.error("Không thể kết nối đến server");
    }
  }
};
