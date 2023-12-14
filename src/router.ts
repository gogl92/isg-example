import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    alias: "/home",
    name: "home",
    component: () => import("./components/HomeComponent.vue")
  },
  {
    path: "/products",
    alias: "/products",
    name: "products",
    component: () => import("./components/ProductsList.vue")
  },
  {
    path: "/products/:id",
    name: "product-details",
    component: () => import("./components/ProductDetails.vue")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddProduct.vue")
  },
  {
    path: "/search-results",
    name: "search-results",
    component: () => import("./components/SearchResults.vue")
  },
  {
    path: "/cart",
    alias: "/cart",
    name: "cart",
    component: () => import("./components/Cart.vue")
  },
  {
    path: "/checkout",
    alias: "/checkout",
    name: "checkout",
    component: () => import("./components/Checkout.vue")
  },
  {
    path: "/order-summary",
    name: "order-summary",
    component: () => import("./components/OrderSummary.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
