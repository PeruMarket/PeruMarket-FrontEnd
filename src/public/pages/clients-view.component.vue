<script>
import sidebar from "../components/sidebar.component.vue";
import clients from "../../clients/components/clients.component.vue";

export default {
  name: "clients-view",
  components: {
    clients,
    sidebar
  }
}
</script>

<template>
  <div class="container">
    <sidebar></sidebar>
    <clients></clients>
  </div>
</template>

<style scoped>
.container{
  display: flex;
}
</style>