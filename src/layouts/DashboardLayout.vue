<!-- src/layouts/DashboardLayout.vue -->
<template>
    <div class="dashboard-layout">
      <Navbar />
      <main>
        <router-view />
      </main>
    </div>
</template>
  
<script setup>
  import Navbar from '@/components/Navbar.vue';
 </script>
  
<style scoped>
  .dashboard-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  main {
    padding: 20px;
  }
</style>
  