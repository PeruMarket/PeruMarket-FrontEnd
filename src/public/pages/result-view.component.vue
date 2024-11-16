<script>
import sidebar from "../components/sidebar.component.vue";
import results from "../../registration/components/results.component.vue";
export default {
  name: "results-view",
  components: {
    sidebar,
    results
  }
}
</script>

<template>
  <div class="container">
    <sidebar></sidebar>
    <results></results>
  </div>
</template>

<style scoped>
.container{
  display: flex;
}
</style>