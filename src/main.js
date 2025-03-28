import { createApp } from 'vue';
import App from './App.vue';
import './assets/base.css'
import router from './router';
import { createPinia } from 'pinia';
import axios from 'axios';
import { Toast, options } from "./plugins/toast.js";
import { useAuthStore } from './store/auth';

const pinia = createPinia();
axios.defaults.baseURL = 'http://localhost:3000';

const app = createApp(App);
app.use(router);
app.use(pinia);

app.use(Toast, options)

const authStore = useAuthStore();
authStore.restoreSession();

app.mount("#app");


