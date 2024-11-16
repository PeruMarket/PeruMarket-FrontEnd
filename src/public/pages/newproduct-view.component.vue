<script>
import sidebar from "../components/sidebar.component.vue";
import newproduct from "../../products/components/newproduct.component.vue";
export default {
  name: "registration-view",
  components: {
    sidebar,
    newproduct
  }
}
</script>

<template>
  <div class="container">
    <sidebar></sidebar>
    <newproduct></newproduct>
  </div>
</template>

<style scoped>
.container{
  display: flex;
}
</style>