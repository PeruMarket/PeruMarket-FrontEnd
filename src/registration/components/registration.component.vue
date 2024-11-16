<script>
export default {
  name: "registration",
  data() {
    return {
      factura: "",
      valorNominal: "",
      tasaInteres: "",
      fechaEmision: "",
      fechaVencimiento: "",
      costosIniciales: "",
      retencion: ""
    }
  },
  methods: {
    Factura() {
      this.factura = "";
      this.valorNominal = "";
      this.tasaInteres = "";
      this.fechaEmision = "";
      this.fechaVencimiento = "";
      this.costosIniciales = "";
      this.retencion = "";
    },
    acceptFactura() {
      this.$router.push('/results');
    }
  }
}
</script>

<template>
  <div class="container z-1 header container-registration">
    <div style="padding: 2rem;">
    <h1 style="color: #B69B84; font-size: 1.25rem; margin-bottom: 0.5rem;">Registrar letras/facturas</h1>
    <div style="border-top: 1px solid #B69B84; margin-bottom: 2rem;"></div>

    <form style="max-width: 600px;">
      <div style="margin-bottom: 1rem;">
        <label style="display: inline-block; width: 180px; color: #666; font-size: 0.9rem;">Nro. Factura:</label>
        <input
            v-model="factura"
            type="text"
            placeholder="Ingrese su número de factura"
            style="width: 400px; padding: 0.5rem; background-color: #F3F4F6; border: none; border-radius: 4px;"
        />
      </div>

      <div style="margin-bottom: 1rem;">
        <label style="display: inline-block; width: 180px; color: #666; font-size: 0.9rem;">Valor nominal:</label>
        <input
            type="text"
            placeholder="Ingrese el valor nominal"
            style="width: 400px; padding: 0.5rem; background-color: #F3F4F6; border: none; border-radius: 4px;"
        />
      </div>

      <div style="margin-bottom: 1rem;">
        <label style="display: inline-block; width: 180px; color: #666; font-size: 0.9rem;">Tasa de interés efectiva:</label>
        <input
            type="text"
            placeholder="0"
            style="width: 100px; padding: 0.5rem; background-color: #F3F4F6; border: none; border-radius: 4px;"
        />
      </div>

      <div style="margin-bottom: 1rem; display: flex;">
        <div style="margin-right: 2rem;">
          <label style="display: inline-block; width: 180px; color: #666; font-size: 0.9rem;">Fecha de emisión:</label>
          <input
              type="text"
              placeholder="dd/mm/yyyy"
              style="width: 120px; padding: 0.5rem; background-color: #F3F4F6; border: none; border-radius: 4px;"
          />
        </div>
        <div>
          <label style="display: inline-block; width: 180px; color: #666; font-size: 0.9rem;">Fecha de vencimiento:</label>
          <input
              type="text"
              placeholder="dd/mm/yyyy"
              style="width: 120px; padding: 0.5rem; background-color: #F3F4F6; border: none; border-radius: 4px;"
          />
        </div>
      </div>

      <div style="margin-bottom: 2rem; display: flex;">
        <div style="margin-right: 2rem;">
          <label style="display: inline-block; width: 180px; color: #666; font-size: 0.9rem;">Costos iniciales (CI):</label>
          <input
              type="text"
              placeholder="0"
              style="width: 100px; padding: 0.5rem; background-color: #F3F4F6; border: none; border-radius: 4px;"
          />
        </div>
        <div>
          <label style="display: inline-block; width: 180px; color: #666; font-size: 0.9rem;">Retención (R):</label>
          <input
              type="text"
              placeholder="0"
              style="width: 100px; padding: 0.5rem; background-color: #F3F4F6; border: none; border-radius: 4px;"
          />
        </div>
      </div>

      <div style="display: flex; gap: 1rem;">
        <button
            type="submit"
            @click="acceptFactura"
            style="padding: 0.5rem 1.5rem; background-color: #4ADE80; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Aceptar
        </button>
        <button
            type="button"
            style="padding: 0.5rem 1.5rem; background-color: #EF4444; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Cancelar
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