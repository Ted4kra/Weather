import axios from "axios";

const BASEURL = String(import.meta.env.VITE_BASE_URL);

// const BASEURL = "/api";

const service = axios.create({
  baseURL: BASEURL,
  timeout: 100000,
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
