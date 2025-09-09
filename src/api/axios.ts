import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const setAuthToken = (token?: string) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const attach401Handler = (onUnauthorized: () => void) => {
  api.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err?.response?.status === 401) onUnauthorized();
      return Promise.reject(err);
    }
  );
};