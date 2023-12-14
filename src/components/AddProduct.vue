<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="product.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="product.description"
          name="description"
        />
      </div>

      <button @click="saveProduct" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newProduct">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductDataService from "@/services/ProductsDataService";
import Product from "@/types/Product";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "add-product",
  data() {
    return {
      product: {
        id: "",
        title: "",
        description: "",
        price: 0,
      } as Product,
      submitted: false,
    };
  },
  methods: {
    saveProduct() {
      const data = {
        title: this.product.title,
        description: this.product.description,
      };

      ProductDataService.create(data)
        .then((response: ResponseData) => {
          this.product.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e: Error) => {
          console.log(e);
        });

      window.dispatchEvent(new CustomEvent('cart-changed', {
        detail: {
          storage: JSON.parse(localStorage.getItem('cart') ?? '{}')?.length || 0
        }
      }));
    },

    newProduct() {
      this.submitted = false;
      this.product = {} as Product;
    },
  },
});
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
