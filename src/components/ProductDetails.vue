<template>
  <div v-if="currentProduct.id" class="edit-form">
    <h4>Product</h4>
    <div>
      <div class="form-group">
        <label><strong>Title:</strong></label>
        {{ currentProduct.title }}
      </div>
      <div class="form-group">
        <label><strong>Description:</strong></label>
        {{ currentProduct.description }}
      </div>

      <div class="form-group">
        <label><strong>Price:</strong></label>
        ${{ currentProduct.price }}
      </div>
    </div>

    <button v-if="isProductInCart" class="btn btn-danger" @click="removeProductFromCart(currentProduct)">
      Delete
    </button>

    <button type="button" class="btn btn-success" @click="addProductToCart(currentProduct)">
      Add Product to cart
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Product...</p>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import ProductDataService from "@/services/ProductsDataService";
import Product from "@/types/Product";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "product-a",
  data() {
    return {
      currentProduct: {} as Product,
      message: "",
      isProductInCart: false,
    };
  },
  methods: {
    getProduct(id: string | string[]) {
      ProductDataService.get(id)
        .then((response: ResponseData) => {
          this.currentProduct = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    addProductToCart(product: Product) {
      const cart = localStorage.getItem("cart");
      const cartArray = JSON.parse(cart || "[]");

      if (cart) {
        const productInCart = cartArray.find((p: Product) => p.id === product.id);
        if (productInCart) {
          productInCart.quantity += 1;
        } else {
          product.quantity = 1;
          cartArray.push(product);
        }
        localStorage.setItem("cart", JSON.stringify(cartArray));
      } else {
        product.quantity = 1;
        localStorage.setItem("cart", JSON.stringify([product]));
      }

      window.dispatchEvent(new CustomEvent('cart-changed', {
        detail: {
          storage: JSON.parse(localStorage.getItem('cart') ?? '{}')?.length || 0
        }
      }));

      const productInCart = cartArray.find((p: Product) => p.id === product?.id);
      this.isProductInCart = !!productInCart;

      /*CartsDataService.create(product)
        .then((response: ResponseData) => {
          console.log(response.data);

          alert("Product added to cart successfully!")
        })
        .catch((e: Error) => {
          console.log(e);
        });*/
    },

    removeProductFromCart(product: Product) {
      // remove product from cart
      const cart = localStorage.getItem("cart");
      if (cart) {
        const cartArray = JSON.parse(cart);
        const newCart = cartArray.filter((p: Product) => p.id !== product.id);
        localStorage.setItem("cart", JSON.stringify(newCart));
        this.isProductInCart = false;
      }

      window.dispatchEvent(new CustomEvent('cart-changed', {
        detail: {
          storage: JSON.parse(localStorage.getItem('cart') ?? '{}')?.length || 0
        }
      }));
    },
  },
  mounted() {
    this.message = "";
    this.getProduct(this.$route.params.id);
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartArray = JSON.parse(cart);
      const productInCart = cartArray.find(
        (p: Product) => p.id === this.currentProduct.id
      );
      this.isProductInCart = !!productInCart;
    }
  },
});
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
