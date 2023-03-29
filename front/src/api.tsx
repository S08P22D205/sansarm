import axios from "axios";

// const accessToken = sessionStorage.getItem("accessToken");
// const refreshToken = sessionStorage.getItem("refreshToken");

export interface Tokens {
  "X-ACCESS-TOKEN": string;
  "X-REFRESH-TOKEN": string;
}

const api = axios.create({
  // baseURL: "https://j8d205.p.ssafy.io/",
  baseURL: "http://localhost:5001/",
});

export const userApi = {};

export const courseApi = {
  ageGender: (accessToken: string | null, refreshToken: string | null) =>
    api.get("course/main/age-gender", {
      headers: {
        "X-ACCESS-TOKEN": accessToken,
        "X-REFRESH-TOKEN": refreshToken,
      },
    }),
  easy: () => api.get("course/main/easy"),
  normal: () => api.get("course/main/normal"),
  hard: () => api.get("course/main/hard"),
};

export default api;
