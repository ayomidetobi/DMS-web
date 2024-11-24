import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Axios response interceptor to capture and store the ETag
axiosInstance.interceptors.response.use((response) => {
  if (response.config && response.headers["etag"]) {
    const url = response.config.url;
    if (url) {
      // Store ETag with a unique key based on the request URL
      localStorage.setItem(`etag-${url}`, response.headers["etag"]);
    }
  }
  return response;
});

// Axios request interceptor to add the If-None-Match header if ETag is available
axiosInstance.interceptors.request.use((config) => {
  const url = config.url;
  if (url) {
    const storedEtag = localStorage.getItem(`etag-${url}`);
    if (storedEtag) {
      config.headers["If-None-Match"] = storedEtag;
    }
  }
  return config;
});

export default axiosInstance;
