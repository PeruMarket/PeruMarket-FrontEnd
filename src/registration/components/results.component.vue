<script>
export default {
  name: "results.component",
  data () {
    return {
      days: "",
      rate: "",
      vr: "",
      delivered: "",
      tcea: ""
    }
  },
  methods: {
    submitForm() {
      this.days = "";
      this.rate= "";
      this.vr= "";
      this.delivered= "";
      this.tcea= "";
    },
    acceptResult() {
      this.$router.push('/:id/registration');
    }
  },

}

</script>

<template>
  <div class="container z-1 header container-registration">
  <div style="padding: 2rem; font-family: Arial, sans-serif;">
    <h1 style="color: #B69B84; font-size: 1.25rem; margin-bottom: 0.5rem;">Registrar letras/facturas</h1>
    <div style="border-top: 1px solid #B69B84; margin-bottom: 2rem;"></div>

    <form style="max-width: 600px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
        <div style="width: 48%;">
          <label style="display: block; color: #666; font-size: 0.9rem; margin-bottom: 0.25rem;">Días de descuento:</label>
          <input
              type="text"
              style="width: 100%; padding: 0.5rem; background-color: #e0e0e0; border: none; border-radius: 4px;"
          />
        </div>
        <div style="width: 48%;">
          <label style="display: block; color: #666; font-size: 0.9rem; margin-bottom: 0.25rem;">Tasa descontada:</label>
          <input
              type="text"
              style="width: 100%; padding: 0.5rem; background-color: #e0e0e0; border: none; border-radius: 4px;"
          />
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
        <div style="width: 48%;">
          <label style="display: block; color: #666; font-size: 0.9rem; margin-bottom: 0.25rem;">Valor recibido (VR):</label>
          <input
              type="text"
              style="width: 100%; padding: 0.5rem; background-color: #e0e0e0; border: none; border-radius: 4px;"
          />
        </div>
        <div style="width: 48%;">
          <label style="display: block; color: #666; font-size: 0.9rem; margin-bottom: 0.25rem;">Valor entregado:</label>
          <input
              type="text"
              style="width: 100%; padding: 0.5rem; background-color: #e0e0e0; border: none; border-radius: 4px;"
          />
        </div>
      </div>

      <div style="margin-bottom: 2rem;">
        <label style="display: block; color: #666; font-size: 0.9rem; margin-bottom: 0.25rem;">Tasa de Costo Efectiva Anual (TCEA):</label>
        <input
            type="text"
            style="width: 48%; padding: 0.5rem; background-color: #e0e0e0; border: none; border-radius: 4px;"
        />
      </div>

      <div style="text-align: center;">
        <button
            type="submit"
            @click="acceptResult"
            style="padding: 0.5rem 2rem; background-color: #4ADE80; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem;"
        >
          Volver
        </button>
      </div>
    </form>
  </div>
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
  margin-left: 22rem !important;
}

@media (max-width: 860px) {
  .container {
    margin-left: 0;
  }
}
</style>