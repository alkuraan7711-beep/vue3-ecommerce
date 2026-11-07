<script setup>
import { useCartStore } from '../stores/cart.js'
import { formatPrice } from '../utils/format.js'
import { handleImageError } from '../utils/images.js'

const cartStore = useCartStore()
</script>

<template>
  <main class="cart-page">
    <h1>Shopping Cart</h1>

    <p v-if="cartStore.cartItems.length === 0" class="empty-message">
      Your cart is empty.
      <RouterLink to="/" class="inline-link">Browse products</RouterLink>
    </p>

    <div v-else class="cart-layout">
      <section class="cart-items" aria-label="Items in your cart">
        <article
          v-for="item in cartStore.cartItems"
          :key="item.id"
          class="cart-item"
        >
          <img :src="item.image" :alt="item.name" @error="handleImageError" />

          <div class="cart-item-info">
            <h2>{{ item.name }}</h2>
            <p>{{ formatPrice(item.price) }} each</p>

            <div class="quantity-controls">
              <button
                aria-label="Decrease quantity"
                :disabled="item.quantity === 1"
                @click="cartStore.decreaseQuantity(item.id)"
              >
                −
              </button>

              <span>{{ item.quantity }}</span>

              <button
                aria-label="Increase quantity"
                @click="cartStore.increaseQuantity(item.id)"
              >
                +
              </button>
            </div>
          </div>

          <div class="cart-item-actions">
            <strong>{{ formatPrice(item.price * item.quantity) }}</strong>

            <button
              class="remove-button"
              :aria-label="`Remove ${item.name} from cart`"
              @click="cartStore.removeFromCart(item.id)"
            >
              Remove
            </button>
          </div>
        </article>
      </section>

      <aside class="cart-summary">
        <h2>Order Summary</h2>

        <div class="summary-row">
          <span>Items</span>
          <span>{{ cartStore.cartCount }}</span>
        </div>

        <div class="summary-row total-row">
          <span>Total</span>
          <strong>{{ formatPrice(cartStore.cartTotal) }}</strong>
        </div>

        <RouterLink to="/checkout" class="primary-button checkout-button">
          Proceed to checkout
        </RouterLink>

        <RouterLink to="/" class="continue-link">
          Continue Shopping
        </RouterLink>
      </aside>
    </div>
  </main>
</template>
