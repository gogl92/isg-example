<template>
  <!-- add a gray background color and some padding to the footer -->
  <div class="home">
    <div class="center-content">
      <img width="567" height="567" alt="Vue logo" src="../assets/logo.png" />
    </div>

    <div class="list">
      <h3 class="center-content">Home</h3>
      <ul class="center-content">
        <li>
          <router-link to="/products"><div class="btn btn-primary">Products</div> </router-link>
        </li>
        <li>
          <router-link to="/cart"><div class="btn btn-primary">Cart</div></router-link>
        </li>
        <li>
          <router-link to="/checkout"><div class="btn btn-primary">Checkout</div></router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "home-component",
  data() {
  },
  methods: {}
});
</script>

<style>
.list {
  margin: 0 auto;
  width: 50%;
  text-align: center;
}

.center-content {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  display: flex;
  justify-content: space-around;
}

.home {
  background-color: gray;
}
</style>
