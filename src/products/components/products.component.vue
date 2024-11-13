<script>
export default {
  name: "products"
}
</script>

<template>
  <div class="container z-1 header container-products">
    <h2>Productos</h2>
  </div>
</template>

<style scoped>
.container-products {
  display: flex !important;
  align-content: flex-start !important;
  align-items: flex-start !important;
  margin-left: 0;
}

.container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
  margin-left: 22rem;
}

@media (max-width: 860px) {
  .container {
    margin-left: 0;
  }
}
</style>