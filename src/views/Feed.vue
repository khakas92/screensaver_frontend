<template>
    <ul role="list" class="divide-y divide-gray-100 max-w-2xl mx-auto">
      <li v-for="user in users" :key="user.username" class="flex justify-between gap-x-6 py-5">
        <div class="flex min-w-0 gap-x-4">
          <div class="min-w-0 flex-auto">
            <p class="text-sm/6 font-semibold text-gray-900">{{ user.username }}</p>
            <p class="mt-1 truncate text-xs/5 text-gray-500">{{ user.email }}</p>
          </div>
        </div>
        <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p class="text-sm/6 text-gray-900">{{ user.first_name }}</p>
          <p v-if="user.updated_at" class="mt-1 text-xs/5 text-gray-500">
            Last seen <time :datetime="user.updated_at">{{ user.updated_at }}</time>
          </p>
          <div v-else class="mt-1 flex items-center gap-x-1.5">
            <div class="flex-none rounded-full bg-emerald-500/20 p-1">
              <div class="size-1.5 rounded-full bg-emerald-500" />
            </div>
            <p class="text-xs/5 text-gray-500">Online</p>
          </div>
        </div>
      </li>
    </ul>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import api from '@/services/axios';
  
  const users = ref([])
  
  const fetchUsers = async () => {
    try {
      const response = await api.get('/users')
      users.value = response.data
    } catch (error) {
      console.error('Error:', error)
    }
  }
  
  onMounted(fetchUsers)
  </script>
  