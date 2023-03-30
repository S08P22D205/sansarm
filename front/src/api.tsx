import axios from "axios";

export interface Tokens {
  "X-ACCESS-TOKEN": string;
  "X-REFRESH-TOKEN": string;
}

const flaskApi = axios.create({
  baseURL: "https://j8d205.p.ssafy.io/flask-api",
  // baseURL: "http://localhost:5001/",
});

const springApi = axios.create({
  baseURL: "https://j8d205.p.ssafy.io/api",
  // baseURL: "http://localhost:5000/",
});

export const userApi = {};

export const courseApi = {
  searchBar: (accessToken: string | null, refreshToken: string | null) =>
    springApi.get("course/mtlist", {
      headers: {
        "X-ACCESS-TOKEN": accessToken,
        "X-REFRESH-TOKEN": refreshToken,
      },
    }),
  ageGender: (accessToken: string | null, refreshToken: string | null) =>
    flaskApi.get("course/main/age-gender", {
      headers: {
        "X-ACCESS-TOKEN": accessToken,
        "X-REFRESH-TOKEN": refreshToken,
      },
    }),
  easy: () => flaskApi.get("course/main/easy"),
  normal: () => flaskApi.get("course/main/normal"),
  hard: () => flaskApi.get("course/main/hard"),
};

export default flaskApi;
