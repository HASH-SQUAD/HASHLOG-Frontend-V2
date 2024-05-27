import axios from "axios";

const AUTH_URL = "http://localhost:3000/";

export const AuthInstance = axios.create({
  baseURL: AUTH_URL,
  timeout: 10000,
});

AuthInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.accessToken = `${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const DefaultInstance = axios.create({
  baseURL: AUTH_URL,
  timeout: 10000,
});