import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { calculateTotal, sanitizeCart } from '../utils/cart.js'
import { loadJSON, saveJSON } from '../utils/storage.js'

const STORAGE_KEY = 'cartItems'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref(sanitizeCart(loadJSON(STORAGE_KEY, [])))

  watch(
    cartItems,
    (newCart) => saveJSON(STORAGE_KEY, newCart),
    { deep: true }
  )

  function findItem(productId) {
    return cartItems.value.find((item) => item.id === productId)
  }

  function addToCart(product) {
    const existingItem = findItem(product.id)

    if (existingItem) {
      existingItem.quantity++
    } else {
      cartItems.value.push({ ...product, quantity: 1 })
    }
  }

  function removeFromCart(productId) {
    cartItems.value = cartItems.value.filter((item) => item.id !== productId)
  }

  function increaseQuantity(productId) {
    const item = findItem(productId)
    if (item) item.quantity++
  }

  function decreaseQuantity(productId) {
    const item = findItem(productId)
    if (item && item.quantity > 1) item.quantity--
  }

  function clearCart() {
    cartItems.value = []
  }

  const cartCount = computed(() =>
    cartItems.value.reduce((total, item) => total + item.quantity, 0)
  )

  // One source of truth for the total: the same function the tests cover.
  const cartTotal = computed(() => calculateTotal(cartItems.value))

  return {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartCount,
    cartTotal
  }
})
