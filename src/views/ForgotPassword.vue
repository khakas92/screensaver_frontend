<template>
    <div>
      <h2>Reset password</h2>
      <input v-model="email" placeholder="Input email" />
      <button @click="requestPasswordReset">Send</button>
      <p>{{ message }}</p>
    </div>
</template>

<script setup>
import { ref } from "vue";
import api from '@/services/axios';

const email = ref("");
const message = ref("");

const requestPasswordReset = async () => {
  try {
    const response = await api.post("http://localhost:3000/auth/forgot-password", { email: email.value });
    message.value = response.data.message;
  } catch (error) {
    message.value = "Error: " + error.response?.data?.error || "Server error";
  }
};
</script>
