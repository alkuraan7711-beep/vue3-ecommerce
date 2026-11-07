import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { loadJSON, saveJSON } from '../utils/storage.js'

const STORAGE_KEY = 'isLoggedIn'

// Demo login only: there is no backend, so this just remembers a flag.
export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(loadJSON(STORAGE_KEY, false) === true)

  watch(isLoggedIn, (value) => saveJSON(STORAGE_KEY, value))

  function login() {
    isLoggedIn.value = true
  }

  function logout() {
    isLoggedIn.value = false
  }

  return {
    isLoggedIn,
    login,
    logout
  }
})
