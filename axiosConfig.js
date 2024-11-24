import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.response.use((response) => {
  if (response.config && response.headers["etag"]) {
    const url = response.config.url;
    if (url) {
      localStorage.setItem(`etag-${url}`, response.headers["etag"]);
    }
  }
  return response;
});

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
