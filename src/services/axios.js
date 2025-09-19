import axios from "axios";
import errorHandle from "../api/error";

// const BASE_URL = "https://nutro-backend.onrender.com" ;
const BASE_URL = "https://nutro-backend.onrender.com/api";

const Api = axios.create({
  baseURL: BASE_URL,
});

Api.interceptors.response.use(
  (Response) => Response,
  (error) => {
    if (error.response) {
      console.log(error.response);
      return errorHandle(error);
    } else {
      console.log("axios error:", error);
    }
    return Promise.reject(error);
  }
);

Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    
    if (token && token !== "null" && token !== "undefined") { 
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

export default Api;
