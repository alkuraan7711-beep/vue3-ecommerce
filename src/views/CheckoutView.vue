<script setup>
import { reactive, ref } from 'vue'
import { useCartStore } from '../stores/cart.js'
import { formatPrice } from '../utils/format.js'
import { validateCheckout } from '../utils/checkout.js'

const cartStore = useCartStore()

const form = reactive({ name: '', phone: '', address: '' })
const errors = ref({})
const placedOrder = ref(null)

function placeOrder() {
  errors.value = validateCheckout(form)

  const firstInvalidField = ['name', 'phone', 'address'].find(
    (field) => errors.value[field]
  )
  if (firstInvalidField) {
    document.getElementById(firstInvalidField)?.focus()
    return
  }

  // Save what the confirmation needs BEFORE the cart is cleared.
  placedOrder.value = {
    number: Date.now().toString(36).toUpperCase(),
    name: form.name.trim(),
    count: cartStore.cartCount,
    total: cartStore.cartTotal
  }

  cartStore.clearCart()
}
</script>

<template>
  <main class="checkout-page">
    <h1>Checkout</h1>

    <section v-if="placedOrder" class="order-confirmation" aria-live="polite">
      <h2>Order placed</h2>
      <p>
        Thanks, {{ placedOrder.name }}. Your order
        <strong>#{{ placedOrder.number }}</strong>
        ({{ placedOrder.count }} items, {{ formatPrice(placedOrder.total) }})
        has been recorded.
      </p>
      <p class="form-note">
        This is a demo store: no payment was taken and no order was sent.
      </p>
      <RouterLink to="/" class="primary-button link-button">
        Back to products
      </RouterLink>
    </section>

    <p v-else-if="cartStore.cartItems.length === 0" class="empty-message">
      Your cart is empty.
      <RouterLink to="/" class="inline-link">Browse products</RouterLink>
    </p>

    <div v-else class="cart-layout">
      <form class="checkout-form" novalidate @submit.prevent="placeOrder">
        <h2>Delivery details</h2>

        <div class="form-field">
          <label for="name">Full name</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            autocomplete="name"
            :aria-invalid="Boolean(errors.name)"
            :aria-describedby="errors.name ? 'name-error' : undefined"
          />
          <p v-if="errors.name" id="name-error" class="field-error">
            {{ errors.name }}
          </p>
        </div>

        <div class="form-field">
          <label for="phone">Phone number</label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            autocomplete="tel"
            :aria-invalid="Boolean(errors.phone)"
            :aria-describedby="errors.phone ? 'phone-error' : undefined"
          />
          <p v-if="errors.phone" id="phone-error" class="field-error">
            {{ errors.phone }}
          </p>
        </div>

        <div class="form-field">
          <label for="address">Address</label>
          <textarea
            id="address"
            v-model="form.address"
            rows="3"
            autocomplete="street-address"
            :aria-invalid="Boolean(errors.address)"
            :aria-describedby="errors.address ? 'address-error' : undefined"
          ></textarea>
          <p v-if="errors.address" id="address-error" class="field-error">
            {{ errors.address }}
          </p>
        </div>

        <button type="submit" class="primary-button">Place order</button>
        <p class="form-note">
          Demo store: no payment is taken and no order is sent.
        </p>
      </form>

      <aside class="cart-summary">
        <h2>Order summary</h2>

        <ul class="summary-list">
          <li
            v-for="item in cartStore.cartItems"
            :key="item.id"
            class="summary-row"
          >
            <span>{{ item.name }} × {{ item.quantity }}</span>
            <span>{{ formatPrice(item.price * item.quantity) }}</span>
          </li>
        </ul>

        <div class="summary-row total-row">
          <span>Total</span>
          <strong>{{ formatPrice(cartStore.cartTotal) }}</strong>
        </div>

        <RouterLink to="/cart" class="continue-link">Edit cart</RouterLink>
      </aside>
    </div>
  </main>
</template>
