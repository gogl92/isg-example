<template>
  <div class="order-summary">
    <h1>Order Summary</h1>
    <div class="customer-details">
      <h2>Customer Details</h2>
      <p><strong>First Name:</strong> {{ customerData.firstName }}</p>
      <p><strong>Last Name:</strong> {{ customerData.lastName }}</p>
      <p><strong>Email:</strong> {{ customerData.email }}</p>
      <p><strong>Phone:</strong> {{ customerData.phone }}</p>
      <p><strong>Address:</strong> {{ customerData.address }}</p>
    </div>
    <div class="cart-items">
      <h2>Cart Items</h2>
      <ul>
        <li v-for="item in cartItems" :key="item.id">
          <!--<img :src="item.thumbnail" alt="" class="cart-item-thumbnail">-->
          <p><strong>Title:</strong> {{ item.title }}</p>
          <p><strong>Quantity:</strong> {{ item.quantity }}</p>
          <p><strong>Price:</strong> ${{ item.price }}</p>
        </li>
      </ul>
    </div>
    <h2>Total</h2>
    <p>${{ cartItems.reduce((total, item) => total + (item.price * (item.quantity ?? 1)), 0) }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Product from "@/types/Product";

export default defineComponent({
  name: "OrderSummary",
  data() {
    return {
      customerData: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: ""
      },
      cartItems: [] as Product[]
    };
  },
  mounted() {
    this.loadCheckoutData();
    localStorage.removeItem("cart");
  },
  methods: {
    loadCheckoutData() {
      const checkoutData = JSON.parse(localStorage.getItem("checkoutData") || "{}");
      this.customerData = checkoutData;
      this.cartItems = JSON.parse(checkoutData.cart || "[]");
    }
  }
});
</script>

<style>
.order-summary {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

.customer-details, .cart-items {
  margin-bottom: 20px;
}

.cart-item-thumbnail {
  width: 100px;
  height: auto;
}
</style>
