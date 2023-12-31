<template>
  <!-- Show a list of the products in the cart -->
  <div class="list">
    <h1>Cart</h1>
    <ul>
      <li v-for="product in cart" :key="product.id">
        <div>
          {{ product.quantity }} x {{ product.title }} - ${{ product.price }}
          <div class="btn btn-primary" @click="viewProduct(product)">
            View Product
          </div>
          <div class="btn btn-danger" @click="removeProductFromCart(product)">
            Remove from cart
          </div>
          <div class="btn btn-primary" @click="editQuantity(product)">
            Edit Quantity
          </div>
        </div>
      </li>
    </ul>
    <p>Total: ${{ totalInCart }}</p>
    <!-- Hide the checkout button if the cart is empty or the current route is checkout -->
    <router-link v-if="cart.length > 0 && $route.name !== 'checkout'" to="/checkout" class="btn btn-success">Go to Checkout</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Product from "@/types/Product";
import Swal from "sweetalert2";
import router from "@/router";

export default defineComponent({
  name: "cart-component",
  data() {
    return {
      cart: [],
      totalInCart: 0
    };
  },
  mounted() {
    this.getCart();
  },
  methods: {
    getCart() {
      const cart = localStorage.getItem("cart");
      if (cart) {
        this.cart = JSON.parse(cart);
      }

      // calculate total
      this.totalInCart = this.cart.reduce((total, product: Product) => {
        return total + (product.price * (product.quantity? product.quantity : 1));
      }, 0);
    },
    viewProduct(product: Product) {
      console.log("viewProduct", product);
      router.push({ name: "product-details", params: { id: product.id } });
    },
    removeProductFromCart(product: Product) {
      // remove product from cart
      const cart = localStorage.getItem("cart");
      if (cart) {
        const cartArray = JSON.parse(cart);
        const newCart = cartArray.filter((p: Product) => p.id !== product.id);
        localStorage.setItem("cart", JSON.stringify(newCart));
        this.getCart();
      }
    },
    editQuantity(product: Product) {
      console.log("editQuantity", product);
      Swal.fire({
        title: "Edit Quantity",
        input: "number",
        inputValue: product.quantity,
        showCancelButton: true,
        confirmButtonText: "Save",
        showLoaderOnConfirm: true,
        preConfirm: (quantity) => {
          // Update the quantity in the cart
          const cart = localStorage.getItem("cart");
          if (cart) {
            const cartArray = JSON.parse(cart);
            const newCart = cartArray.map((p: Product) => {
              if (p.id === product.id) {
                p.quantity = quantity;
              }
              return p;
            });
            localStorage.setItem("cart", JSON.stringify(newCart));
            this.getCart();
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });

      window.dispatchEvent(new CustomEvent('cart-changed', {
        detail: {
          storage: JSON.parse(localStorage.getItem('cart') ?? '{}')?.reduce((total: number, product: Product) => {
            return total + (product.quantity? product.quantity : 1);
          }, 0) || 0
        }
      }));
    }
  }
});
</script>

<style>
.list {
  text-align: left;
  width: 80%;
  margin: auto;
}
</style>
