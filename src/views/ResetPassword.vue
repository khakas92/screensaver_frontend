<template>
    <div>
        <h2>Input new password</h2>
        <input v-model="newPassword" type="password" placeholder="New password" />
        <button @click="resetPassword">Save</button>
        <p>{{ message }}</p>
    </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const newPassword = ref("");
const message = ref("");

const resetPassword = async () => {
  try {
    const response = await axios.post("http://localhost:3000/auth/reset-password", {
      token: route.query.token,
      newPassword: newPassword.value,
    });
    message.value = response.data.message;
    setTimeout(() => router.push("/login"), 3000);
  } catch (error) {
    message.value = "Error: " + error.response?.data?.error || "Server error";
  }
};
</script>
