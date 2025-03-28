import axios from "axios";
import { useAuthStore } from "@/store/auth";

const PUBLIC_ROUTES = ['/', '/auth/login', '/auth/register'];

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  const token = authStore.accessToken;

  const isPublicRoute = PUBLIC_ROUTES.some(route => config.url === route);

  if (token && !isPublicRoute) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore();
    if (error.response?.status === 403) {
      try {
        await authStore.refreshToken();
        return api.request(error.config);
      } catch {
        await authStore.logout();
      }
    }

    return Promise.reject(error);
  }
);

export default api;
