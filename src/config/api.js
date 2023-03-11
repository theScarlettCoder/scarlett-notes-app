import axios from "axios";

const api = axios.create({
  baseURL: "https://scarlett-realism-api.onrender.com/api",
});

export default api;
