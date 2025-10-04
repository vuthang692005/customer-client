import AxiosClient from "./AxiosClient";

const InternApi = {
  getAll: (data) => {
    return AxiosClient.get("/interns", data, { withAuth: true });
  },
  create: (data) => {
    return AxiosClient.post("/interns", data, { withAuth: true });
  },
  edit: (data) => {
    return AxiosClient.put("/interns/${id}", data, { withAuth: true });
  },
};

export default InternApi;
