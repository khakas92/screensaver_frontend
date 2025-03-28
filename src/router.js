import { createRouter, createWebHistory } from 'vue-router';
import Landing from '@/views/Landing.vue';
import Register from '@/views/Register.vue';
import LoginView from '@/views/Login.vue';
import Dashboard from "@/views/Dashboard.vue";
import Feed from "@/views/Feed.vue";
import Films from "@/views/Films.vue";
import Profile from "@/views/Profile.vue";
import Users from "@/views/Users.vue";
import { useAuthStore } from "@/store/auth";
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import ForgotPassword from './views/ForgotPassword.vue';
import ResetPassword from './views/ResetPassword.vue';


const routes = [
  { path: '/', component: Landing },
  { path: '/register', component: Register },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/forgot-password', component: ForgotPassword},
  { path: '/reset-password', component: ResetPassword },
  {
    path: '/dashboard',
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', component: Dashboard },
      { path: '/feed', component: Feed },
      { path: '/films', component: Films }, 
      { path: '/users', component: Users},
      { path: '/profile', component: Profile },
      
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.accessToken) {
    next('/login');
  } else {
    next();
  }
});

export default router;
