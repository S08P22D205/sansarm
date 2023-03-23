import axios from "axios";

// local : http://localhost:5000
// 서버 :

export default axios.create({
  baseURL: "http://localhost:5000",
});
