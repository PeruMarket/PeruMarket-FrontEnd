<script>
export default {
  name: "clients"
}
</script>

<template>
  <div class="container z-1 header container-clients">
    <h2>Clientes</h2>
  </div>
</template>

<style scoped>
.container-clients {
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
  margin-left: 22rem !important;
}

@media (max-width: 860px) {
  .container {
    margin-left: 0;
  }
}
</style>