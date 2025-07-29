import axios from "axios";
export const baseURL ="https://kkwaghconnect.onrender.com";
export const httpClient = axios.create({
  baseURL: baseURL,
});
