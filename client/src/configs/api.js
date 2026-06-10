import axios from "axios";

const api = axios.create({
  baseURL: "https://resume-builder-main-backend-cnpo.onrender.com",
});

export default api;
