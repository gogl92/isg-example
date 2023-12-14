<script lang="ts">
import ProductDataService from "@/services/ProductsDataService";
import ResponseData from "@/types/ResponseData";
import Product from "@/types/Product";
import { defineComponent } from "vue";

export default defineComponent({
  name: "products-details-component",
  props: {
    product: {
      type: Object as () => Product,
      required: true
    }
  },
  data() {
    return {
      productResult: this.product as Product,
      product_id: null as number | string | string[] | null,
      isProductInCart: false,
      selectedProduct: null as Product | null
    };
  },
  watch: {
    $route() {
      // get the product id from the route
      this.product_id = this.$route.params.product_id;
      this.retrieveProducts();

      const cart = localStorage.getItem("cart");
      if (cart) {
        const cartArray = JSON.parse(cart);
        const productInCart = cartArray.find((p: Product) => p.id === this.selectedProduct?.id);
        this.isProductInCart = !!productInCart;
      }
    }
  },
  mounted() {
    console.log(this.$route.query.search_text);
    this.retrieveProducts();
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartArray = JSON.parse(cart);
      const productInCart = cartArray.find((p: Product) => p.id === this.selectedProduct?.id);
      this.isProductInCart = !!productInCart;
    }
  },
  methods: {
    retrieveProducts() {
      console.log(this.productResult);
      if (this.productResult?.id) {
        ProductDataService.get(this.productResult.id)
          .then((response: ResponseData) => {
            this.productResult = response.data.product;
            console.log(response.data.product);
          })
          .catch((e: Error) => {
            console.log(e);
          });
        return;
      }

      if (this.product_id) {
        ProductDataService.get(this.product_id)
          .then((response: ResponseData) => {
            this.productResult = response.data.product;
            console.log(response.data.product);
          })
          .catch((e: Error) => {
            console.log(e);
          });
      }
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
          storage: JSON.parse(localStorage.getItem('cart') ?? '{}')?.reduce((total: number, product: Product) => {
            return total + (product.quantity? product.quantity : 1);
          }, 0) || 0
        }
      }));

      this.selectedProduct = product;
      const productInCart = cartArray.find((p: Product) => p.id === this.selectedProduct?.id);
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
          storage: JSON.parse(localStorage.getItem('cart') ?? '{}')?.reduce((total: number, product: Product) => {
            return total + (product.quantity? product.quantity : 1);
          }, 0) || 0
        }
      }));
    }
  }
});
</script>

<template>
  <div class="col-md-6">
    <div v-if="product.id">
      <h4>Product</h4>
      <div>
        <label><strong>Title:</strong></label> {{ product.title }}
      </div>
      <div>
        <label><strong>Description:</strong></label>
        {{ product.description }}
      </div>
      <div>
        <label><strong>Price:</strong></label>
        {{ product.price }}
      </div>

      <div v-if="isProductInCart">
        <button
          class="btn btn-danger"
          @click="removeProductFromCart(product)">
          Remove product
        </button>
      </div>
      <button
        class="btn btn-success"
        @click="addProductToCart(product)">
        Add Product to cart
      </button>
    </div>
    <div v-else>
      <br />
    </div>
  </div>
</template>

<style scoped>

</style>