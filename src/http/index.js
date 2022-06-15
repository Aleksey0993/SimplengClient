import axios from "axios";
import store from "@/store/index";
import router from "@/router/index";
export const API_URL = "http://localhost:5000/api";
import $refreshRequest from "./apirequest";
const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    //"Content-Type": "multipart/form-data",
  },
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await $refreshRequest.post(`${API_URL}/auth/refresh`, {
          fingerprint: store.state.auth.fingerprint,
        });
        // console.log("successRespons", response);
        localStorage.setItem("token", response.data.accessToken);
        return $api.request(originalRequest);
      } catch (err) {
        if (err.response.status === 401) {
          store.dispatch("auth/logout");
        }
      }
    }
    if (error.response.status == 403) {
      router.replace({ name: "forbidden" });
    }
    if (error.response.status == 404) {
      router.replace({ name: "404" });
    }
    throw error;
  }
);

export default $api;
