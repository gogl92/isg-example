<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/" class="navbar-brand">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/products" class="nav-link">Products</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/cart" class="nav-link">Cart ({{cart_count}})</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/checkout" class="nav-link">Checkout</router-link>
        </li>
        <li class="nav-item">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Search products"
              v-model="search_text"
              @keyup.enter="search"
            />
            <div class="input-group-append">
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="search"
              >
                Search
              </button>
            </div>
          </div>
        </li>
      </div>
    </nav>

    <div>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  data() {
    return {
      search_text: this.$route.query.search_text || "",
      cart_count: JSON.parse(localStorage.getItem('cart') ?? '{}')?.length || 0
    };
  },
  mounted() {
    window.addEventListener('cart-changed', (event) => {
      console.log('cart-changed', event);
      //@ts-expect-error custom event
      this.cart_count = event.detail.storage;
    });
  },
  methods: {
    search() {
      this.$router.push({
        name: "search-results",
        query: { search_text: this.search_text }
      });
    }
  }
});
</script>
<style>
.list-group-item {
  cursor: pointer;
}
</style>