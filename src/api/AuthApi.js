import AxiosClient from "./AxiosClient";

const authApi = {
  login: (data) => {
    return AxiosClient.post("/auth/login", data);
  },
  register: (data) => {
    return AxiosClient.post("/auth/register", data);
  },
};

export default authApi;
