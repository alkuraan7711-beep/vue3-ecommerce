<script setup>
import { computed, ref } from 'vue'
import { products } from '../data/products.js'
import ProductCard from '../components/ProductCard.vue'

// Built from the data, so a new category in products.js shows up automatically.
const categories = ['All', ...new Set(products.map((product) => product.category))]

const searchQuery = ref('')
const selectedCategory = ref('All')

const filteredProducts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(query)
    const matchesCategory =
      selectedCategory.value === 'All' ||
      product.category === selectedCategory.value

    return matchesSearch && matchesCategory
  })
})
</script>

<template>
  <main>
    <div class="header">
      <h1>Welcome to VueStore</h1>
      <p>Phones, laptops and accessories.</p>
    </div>

    <div class="products-container">
      <h2>Products</h2>

      <div class="search">
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Search products..."
          aria-label="Search products"
        />
        <select v-model="selectedCategory" aria-label="Filter by category">
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>

      <div class="products-grid">
        <ProductCard
          v-for="item in filteredProducts"
          :key="item.id"
          :product="item"
        />
      </div>

      <p v-if="filteredProducts.length === 0" class="empty-message">
        No products match your search. Try a different name or category.
      </p>
    </div>
  </main>
</template>
