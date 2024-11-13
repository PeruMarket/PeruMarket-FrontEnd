<script>
import sidebar from "../components/sidebar.component.vue";
import registration from "../../registration/components/registration.component.vue";
export default {
  name: "registration-view",
  components: {
    sidebar,
    registration
  }
}
</script>

<template>
  <div class="container">
    <sidebar></sidebar>
    <registration></registration>
  </div>
</template>

<style scoped>
.container{
  display: flex;
}
</style>