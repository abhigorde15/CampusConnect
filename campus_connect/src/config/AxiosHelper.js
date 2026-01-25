import axios from "axios";

export const baseURL ="https://kkwaghconnect.onrender.com" //"https://kkwaghconnect.onrender.com";

export const httpClient = axios.create({
  baseURL,
});

httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
