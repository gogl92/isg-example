<template>
  <h4>Products List</h4>
  <ul class="list-group">
    <!-- TODO: Add pagination -->
    <li
      class="list-group-item"
      :class="{ active: index == currentIndex }"
      v-for="(product, index) in products"
      :key="index"
      @click="productSelected(product, index)"
    >
      {{ product.title }}
    </li>
  </ul>
</template>
<script lang="ts">

export default {
  name: "ProductsPaginated",
  props: {
    currentIndex: {},
    products: {},
    productSelected: {}
  },
  methods: {
  }
};
</script>