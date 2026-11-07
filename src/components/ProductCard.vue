<script setup>
import { useCartStore } from '../stores/cart.js'
import { formatPrice } from '../utils/format.js'
import { handleImageError } from '../utils/images.js'

// The card receives one product object from its parent.
defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()
</script>

<template>
  <div class="product-card">
    <RouterLink :to="`/products/${product.id}`">
      <img
        :src="product.image"
        :alt="product.name"
        class="product-img"
        loading="lazy"
        @error="handleImageError"
      />
    </RouterLink>

    <div class="product-info">
      <RouterLink :to="`/products/${product.id}`">
        <h3>{{ product.name }}</h3>
      </RouterLink>
      <span class="category">{{ product.category }}</span>
      <p class="price">{{ formatPrice(product.price) }}</p>

      <button
        :aria-label="`Add ${product.name} to cart`"
        @click="cartStore.addToCart(product)"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>
