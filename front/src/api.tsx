import axios from "axios";

const api = axios.create({
  baseURL: "https://j8d205.p.ssafy.io/",
});

export const userApi = {};

export const courseApi = {
  main: () => api.get("course/main"),
};

export default api;
