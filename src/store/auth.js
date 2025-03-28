import { defineStore } from "pinia";
import api from '@/services/axios';

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: localStorage.getItem("accessToken") || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
  }),
  actions: {
    async register(username, email, password, birth_date) {
      try {
        const res = await api.post("http://localhost:3000/auth/register", { username, email, password, birth_date });
        if (res.status === 201) {
          return res.status;
        }
      } catch (error) {
        throw error;
      }
    },

    async login(identifier, password) {
      try {
        const res = await api.post("http://localhost:3000/auth/login", { identifier, password }, { withCredentials: true });
        this.accessToken = res.data.accessToken;
        this.user = res.data.user;
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem('user', JSON.stringify(this.user));

        api.defaults.headers.common["Authorization"] = `Bearer ${this.accessToken}`;
      } catch (error) {
        throw error;
      }
    },

    async updateProfile(data) {
      try {
        const res = await api.patch("http://localhost:3000/profile", data, { withCredentials: true });
        if (res.data) {
          this.user = res.data;
          localStorage.setItem('user', JSON.stringify(this.user));
        }
      } catch (error) {
        throw error;
      }
    },

    async restoreSession() {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('accessToken');

      if (storedUser && storedToken) {
        this.user = JSON.parse(storedUser);
        this.token = storedToken;
        api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      }   
    }, 

    async refreshToken() {
      try {
        const res = await api.post("http://localhost:3000/auth/refresh", {}, { withCredentials: true });
        this.accessToken = res.data.accessToken;
        localStorage.setItem("accessToken", res.data.accessToken);
      } catch (error) {
        this.logout();
      }
    },

    async logout() {
        try {
          await api.post("http://localhost:3000/auth/logout");
        } catch (error) {
          console.error("Ошибка при выходе:", error);
        }
      
        this.accessToken = null;
        this.user = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem('user');
        delete api.defaults.headers.common["Authorization"];
    },
  },
});
