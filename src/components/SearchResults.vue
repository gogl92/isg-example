<template>
  <div class="list row">
    <div class="col-md-6">
      <ProductsPaginated :products="products" :productSelected="productSelected"/>
    </div>
    <div class="col-md-6">
      <product-details-component
        :product="currentProduct">
      </product-details-component>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductDataService from "@/services/ProductsDataService";
import ResponseData from "@/types/ResponseData";
import Product from "@/types/Product";
import ProductDetailsComponent from "./ProductDetailsComponent.vue";
import ProductsPaginated from "@/components/ProductsPaginated.vue";

export default defineComponent({
  name: "search-results",
  components: { ProductsPaginated, ProductDetailsComponent },
  data() {
    return {
      products: [] as Product[],
      currentProduct: {} as Product,
      currentIndex: -1,
      totalProductsInApi: 0,
      search_text: ""
    };
  },
  watch: {
    $route() {
      this.search_text = this.$route.query.search_text as string;
      this.retrieveProducts();
    }
  },
  mounted() {
    console.log(this.$route.query.search_text);
    this.retrieveProducts();
  },
  methods: {
    retrieveProducts(mode = 'right') {
      let currentPageCount = localStorage.getItem("currentPageCount");
      if (currentPageCount == null || currentPageCount == "" || parseInt(currentPageCount) <= 0 ) {
        currentPageCount = "0";
      }
      let currentPage = parseInt(currentPageCount);
      if (mode == 'right') {
        currentPage += 10;
      } else if (mode == 'left' && currentPage >= 0) {
        currentPage -= 10;
      }
      localStorage.setItem("currentPageCount", currentPage.toString());
      if (!this.$route.query.search_text || this.$route.query.search_text == "") {
        ProductDataService.getAll(10, currentPage)
          .then((response: ResponseData) => {
            this.products = response.data.products;
            this.totalProductsInApi = response.data.total;
            console.log(response.data.products);
          })
          .catch((e: Error) => {
            console.log(e);
          });
        return;
      }

      ProductDataService.search(this.$route.query.search_text as string)
        .then((response: ResponseData) => {
          this.products = response.data.products;
          this.totalProductsInApi = response.data.total;
          console.log(response.data.products);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    productSelected(product: Product, index = -1) {
      this.currentProduct = product;
      this.currentIndex = index;
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
