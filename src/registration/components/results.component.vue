<script>
export default {
  name: "results",
  computed: {
    diasDescontar() {
      return parseFloat(this.$route.query.diasDescontar);
    },
    tasaDescontada() {
      return parseFloat(this.$route.query.tasaDescontada);
    },
    valorNeto() {
      return parseFloat(this.$route.query.valorNeto);
    },
    valorRecibido() {
      return parseFloat(this.$route.query.valorRecibido);
    },
    valorEntregado() {
      return parseFloat(this.$route.query.valorEntregado);
    },
    TCEA() {
      return parseFloat(this.$route.query.TCEA);
    }
  },
  methods: {
    acceptResult() {
      this.$router.push('/:id/registration');
    }
  },
}
</script>

<template>
  <div class="container z-1 header container-registration">
    <div class="text-100 font-medium text-xl container-info">
      <h1 class="text-100">Registrar letras/facturas</h1>
    </div>

      <form class="form">
        <div class="form-row">
          <div class="form-group">
            <label>Días de descuento:</label>
            <input :value="diasDescontar" disabled class="input" />
          </div>
          <div class="form-group">
            <label>Tasa descontada:</label>
            <input :value="tasaDescontada" disabled class="input" />
          </div>
        </div>

        <div class="form-group">
          <label>Valor neto (VN):</label>
          <input :value="valorNeto" disabled class="input" />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Valor recibido (VR):</label>
            <input :value="valorRecibido" disabled class="input" />
          </div>
          <div class="form-group">
            <label>Valor entregado:</label>
            <input :value="valorEntregado" disabled class="input" />
          </div>
        </div>

        <div class="form-group">
          <label>Tasa de Costo Efectiva Anual (TCEA):</label>
          <input :value="TCEA" disabled class="input" />
        </div>

        <div class="form-footer">
          <button type="submit" @click="acceptResult" class="btn btn-accept">Volver</button>
        </div>
      </form>
  </div>
</template>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  margin-left: 20rem;
  background-color: #f2f1f1;
  width: 100vw;
  height: 100vh;
  align-items: center;
}

/* Container */
.container-registration {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.container-info h1 {
  color: #BB9776 !important;
  font-size: 3rem;
  font-weight: bold;
  margin: 0;
}

/* Form */
.form {
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Input fields */
.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  color: var(--text-color);
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  font-size: 1rem;
}

.form-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

/* Footer */
.form-footer {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

/* Button */
.btn {
  padding: 0.75rem 2rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  cursor: pointer;
}

.btn-accept {
  background-color: var(--primary-color);
}

/* Responsiveness */
@media (max-width: 860px) {
  .container-registration {
    padding: 1rem;
  }

  .form {
    width: 100%;
  }

  .form-row {
    flex-direction: column;
  }

  .btn {
    font-size: 0.9rem;
    padding: 0.5rem 1.5rem;
  }
}
</style>
