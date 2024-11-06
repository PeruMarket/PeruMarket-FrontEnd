<script>
export default {
  name: "registration"
}
</script>

<template>
  <div class="container z-1 header container-registration">
    <h2>Registro de letras/facturas</h2>
  </div>
</template>

<style scoped>
.container-registration {
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
  margin-left: 11rem;
}

@media (max-width: 860px) {
  .container {
    margin-left: 0;
  }
}
</style>