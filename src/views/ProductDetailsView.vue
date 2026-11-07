<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { products } from '../data/products.js'
import { useCartStore } from '../stores/cart.js'
import { formatPrice } from '../utils/format.js'
import { handleImageError } from '../utils/images.js'

const cartStore = useCartStore()
const route = useRoute()

const product = computed(() =>
  products.find((item) => item.id === Number(route.params.id))
)
</script>

<template>
  <main class="details-page">
    <RouterLink to="/" class="back-link">
      ← Continue Shopping
    </RouterLink>

    <p v-if="!product" class="empty-message">
      Product not found. It may have been removed.
    </p>

    <div v-else class="details-card">
      <div class="details-image">
        <img :src="product.image" :alt="product.name" @error="handleImageError" />
      </div>

      <div class="details-info">
        <span class="details-category">{{ product.category }}</span>

        <h1>{{ product.name }}</h1>

        <p class="details-description">
          A great addition to your everyday essentials.
          Discover this product and add it to your collection.
        </p>

        <p class="details-price">{{ formatPrice(product.price) }}</p>

        <button class="primary-button" @click="cartStore.addToCart(product)">
          Add to Cart
        </button>
      </div>
    </div>
  </main>
</template>
