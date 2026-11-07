<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

// Only allow redirects to pages inside this app (paths starting with a single "/").
function getRedirectPath() {
  const redirect = route.query.redirect
  const isSafe =
    typeof redirect === 'string' &&
    redirect.startsWith('/') &&
    !redirect.startsWith('//')

  return isSafe ? redirect : '/profile'
}

function handleLogin() {
  authStore.login()
  router.push(getRedirectPath())
}
</script>

<template>
  <main class="simple-page">
    <h1>Login</h1>
    <p>
      This is a demo store, so there are no real accounts.
      Press the button to sign in as a demo user.
    </p>
    <button class="primary-button" @click="handleLogin">
      Sign in as demo user
    </button>
  </main>
</template>
