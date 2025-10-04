// src/api/axiosClient.js
import axios from "axios";

const AxiosClient = axios.create({
  baseURL: "http://localhost:8082/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// request interceptor
AxiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // chỉ gắn token nếu có withAuth === true
    if (config.withAuth && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

AxiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default AxiosClient;
