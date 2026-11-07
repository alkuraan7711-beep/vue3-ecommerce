<script setup>
import { useCartStore } from './stores/cart.js'
import { useAuthStore } from './stores/auth.js'

const cartStore = useCartStore()
const authStore = useAuthStore()
</script>

<template>
  <header class="site-header">
    <div class="header-container">
      <RouterLink to="/" class="logo">
        Vue<span>Store</span>
      </RouterLink>

      <nav class="navigation" aria-label="Main">
        <RouterLink to="/" class="nav-link">Home</RouterLink>

        <RouterLink v-if="authStore.isLoggedIn" to="/profile" class="nav-link">
          Profile
        </RouterLink>
        <RouterLink v-else to="/login" class="nav-link">Login</RouterLink>

        <RouterLink
          to="/cart"
          class="cart-link"
          :aria-label="`Cart, ${cartStore.cartCount} items`"
        >
          <span>Cart</span>
          <span class="cart-count">{{ cartStore.cartCount }}</span>
        </RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
