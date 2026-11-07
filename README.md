# VueStore

A small online store built with **Vue 3**. Browse products, search and filter them, open a product page, manage a cart that survives a page refresh, and go through a validated checkout form.

**[Live demo](https://vue3-ecommerce.vercel.app/)**

![vue3-ecommerce](./src/Screenshot%202026-11-07%20215255.png)

## Features

- Product list with live search and a category filter
- Product details page (`/products/:id`) with a "Product not found" state
- Shopping cart: add, remove, change quantity, item count and total
- Cart is saved in `localStorage`, and corrupted saved data is ignored instead of crashing the app
- Checkout form with validation, clear error messages and an order confirmation
- Demo login with a protected `/profile` page; logging in sends you back to the page you wanted
- 404 page for unknown URLs
- Responsive layout (mobile, tablet, desktop), visible keyboard focus, labelled form fields
- Unit tests for the cart logic, formatting and checkout validation

## Built with

- [Vue 3](https://vuejs.org/) (`<script setup>`, Composition API)
- [Vue Router](https://router.vuejs.org/) (route guard, lazy-loaded routes, 404 route)
- [Pinia](https://pinia.vuejs.org/) for the cart and auth state
- [Vite](https://vite.dev/) and [Vitest](https://vitest.dev/)
- Product photos from [Unsplash](https://unsplash.com/)

## Run it locally

```bash
npm install
npm run dev      # start the dev server
npm run test     # run the unit tests
npm run build    # production build in /dist
npm run preview  # preview the production build
```

## Project structure

```
src/
  components/   ProductCard
  views/        Home, ProductDetails, Cart, Checkout, Login, Profile, NotFound
  stores/       cart.js, auth.js (Pinia)
  router/       routes and the auth guard
  utils/        cart totals, price formatting, checkout validation, storage helpers
  data/         products.js
```

## Deploying

The app uses history-mode routing, so the host must send every URL to `index.html`. Both are already set up:

- **Netlify:** `public/_redirects`
- **Vercel:** `vercel.json`

GitHub Pages does not support this out of the box. Use Netlify or Vercel, or switch the router to `createWebHashHistory()`.

## What I learned

- **State Persistence & Safety:** Implemented safe `localStorage` synchronization via Pinia, ensuring that corrupted or malformed saved data is handled gracefully without crashing the app.
- **Navigation Guards:** Secured private routes using Vue Router hooks and managed dynamic redirection post-login.
- **Robust Unit Testing:** Wrote unit tests with Vitest to cover critical business logic, ensuring cart calculations and form validation remain bug-free.
- **Component Architecture:** Leveraged Vue 3 Composition API (`<script setup>`) for clean, maintainable, and modular code structuring.

## Possible improvements

- Real product descriptions and several images per product
- Persist orders, or connect a backend / payment provider
- Real authentication
