<template>
  <div class="flex h-screen min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img :src="logo" alt="Logo" class="mx-auto h-15 w-auto" />
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Forgot password? Type your email below</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="requestPasswordReset" class="space-y-6" action="#" method="POST">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900">Email</label>
          <div class="mt-2">
            <input v-model="email" type="text" name="email" id="email" autocomplete="email" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Send email with instructions</button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-500">
        Back to
        <router-link to="/login" class="font-semibold text-blue-600 hover:text-blue-500">
          Sign in
        </router-link>
      </p>
    </div>
  </div>
</template>


<script setup>
import { ref } from "vue";
import api from '@/services/axios';
import { showToast } from '@/utils/toast';
import logo from '@/assets/logo.svg';

const email = ref("");
const message = ref("");

const requestPasswordReset = async () => {
  try {
    const response = await api.post("http://localhost:3000/auth/forgot-password", { email: email.value });
    showToast.success('The email has been sent successfully. Check your email.');
  } catch (error) {
    showToast.error(error.response.data.message);
  }
};
</script>
