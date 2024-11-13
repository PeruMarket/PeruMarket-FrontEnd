<script>
import sidebar from "../components/sidebar.component.vue";
import products from "../../products/components/products.component.vue";

export default {
  name: "products-view",
  components: {
    sidebar,
    products
  }
}
</script>

<template>
  <div class="container">
    <sidebar></sidebar>
    <products></products>
  </div>
</template>

<style scoped>
.container{
  display: flex;
}
</style>