<template>
  <div>
    <div v-if="authStore.user">
      <h1>Welcome, {{ authStore.user.username }}</h1>
    </div>
    <button @click="handleLogout">Logout</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { showToast } from '@/utils/toast';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
  await authStore.logout();
  router.push('/login');
  showToast.success('Logout successful');
};
</script>
