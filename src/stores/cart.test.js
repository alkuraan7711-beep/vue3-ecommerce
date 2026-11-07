import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { nextTick } from 'vue'
import { useCartStore } from './cart.js'

// Vitest runs in Node, which has no localStorage, so we provide a tiny fake.
function createFakeStorage(initial = {}) {
  const data = { ...initial }
  return {
    getItem: (key) => (key in data ? data[key] : null),
    setItem: (key, value) => {
      data[key] = String(value)
    },
    removeItem: (key) => {
      delete data[key]
    }
  }
}

const phone = { id: 1, name: 'Phone', price: 100 }
const laptop = { id: 2, name: 'Laptop', price: 500 }

function createStore(storageContent) {
  vi.stubGlobal('localStorage', createFakeStorage(storageContent))
  setActivePinia(createPinia())
  return useCartStore()
}

describe('cart store', () => {
  let cart

  beforeEach(() => {
    cart = createStore()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('adds a new product with quantity 1', () => {
    cart.addToCart(phone)

    expect(cart.cartItems).toHaveLength(1)
    expect(cart.cartItems[0].quantity).toBe(1)
  })

  it('increases the quantity when the same product is added again', () => {
    cart.addToCart(phone)
    cart.addToCart(phone)

    expect(cart.cartItems).toHaveLength(1)
    expect(cart.cartItems[0].quantity).toBe(2)
  })

  it('never decreases the quantity below 1', () => {
    cart.addToCart(phone)
    cart.decreaseQuantity(phone.id)

    expect(cart.cartItems[0].quantity).toBe(1)
  })

  it('removes a product', () => {
    cart.addToCart(phone)
    cart.addToCart(laptop)
    cart.removeFromCart(phone.id)

    expect(cart.cartItems.map((item) => item.id)).toEqual([laptop.id])
  })

  it('calculates the count and total', () => {
    cart.addToCart(phone)
    cart.addToCart(phone)
    cart.addToCart(laptop)

    expect(cart.cartCount).toBe(3)
    expect(cart.cartTotal).toBe(700)
  })

  it('clears the cart', () => {
    cart.addToCart(phone)
    cart.clearCart()

    expect(cart.cartItems).toEqual([])
    expect(cart.cartCount).toBe(0)
  })

  it('saves the cart to localStorage after a change', async () => {
    cart.addToCart(phone)
    await nextTick()

    const saved = JSON.parse(localStorage.getItem('cartItems'))
    expect(saved).toHaveLength(1)
    expect(saved[0].id).toBe(phone.id)
  })

  it('loads a saved cart on startup', () => {
    const saved = [{ ...phone, quantity: 3 }]
    const restored = createStore({ cartItems: JSON.stringify(saved) })

    expect(restored.cartCount).toBe(3)
  })

  it('starts with an empty cart when the saved data is corrupted', () => {
    const restored = createStore({ cartItems: '{not valid json' })

    expect(restored.cartItems).toEqual([])
  })
})
