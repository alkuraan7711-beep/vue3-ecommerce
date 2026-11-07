<script setup>
import { useAuthStore } from '../stores/auth.js'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <main class="simple-page">
    <h1>My Profile</h1>
    <p>You are signed in as a demo user.</p>
    <button class="primary-button" @click="handleLogout">Log out</button>
  </main>
</template>
