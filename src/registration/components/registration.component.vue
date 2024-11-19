<script>
export default {
  name: "registration",
  data() {
    return {
      idCliente: "",
      valorNominal: "",
      TEA: "",
      fechaEmision: null,
      fechaVencimiento: null,
      costosIniciales: "",
      costosFinales: "",
      perRetencion: "",
      seguroDesg: "",
      errors: {}
    };
  },
  methods: {
    validateDates() {
      const today = new Date();
      const maxVencimiento = new Date();
      maxVencimiento.setFullYear(today.getFullYear() + 5); // Máximo 5 años desde hoy

      this.errors = {};
      if (!this.fechaEmision) {
        this.errors.fechaEmision = "La fecha de emisión es requerida.";
      } else if (this.fechaEmision < today) {
        this.errors.fechaEmision =
            "La fecha de emisión no puede ser menor al día actual.";
      }

      if (!this.fechaVencimiento) {
        this.errors.fechaVencimiento = "La fecha de vencimiento es requerida.";
      } else if (this.fechaVencimiento < this.fechaEmision) {
        this.errors.fechaVencimiento =
            "La fecha de vencimiento debe ser posterior a la fecha de emisión.";
      } else if (this.fechaVencimiento > maxVencimiento) {
        this.errors.fechaVencimiento =
            "La fecha de vencimiento no puede superar los 5 años desde hoy.";
      }
    },
    validateTEA() {
      this.errors.tasaInteres = "";

      const tea = parseFloat(this.TEA);
      if (isNaN(tea)) {
        this.errors.tasaInteres = "La TEA debe ser un número válido.";
      } else if (tea <= 0) {
        this.errors.tasaInteres = "La TEA debe ser mayor a 0%.";
      } else if (tea > 10) {
        this.errors.tasaInteres = "La TEA no puede ser mayor al 10%.";
      }
    },
    validateSeguroDesgravamen() {
      this.errors.seguroDesg = "";

      const seguro = parseFloat(this.seguroDesg);
      if (isNaN(seguro)) {
        this.errors.seguroDesg = "El seguro debe ser un número válido.";
      } else if (seguro < 0) {
        this.errors.seguroDesg = "El seguro no puede ser negativo.";
      } else if (seguro > 5) {
        this.errors.seguroDesg = "El seguro no puede superar el 5%.";
      }
    },
    validateRetencion() {
      this.errors.perRetencion = "";

      const retencion = parseFloat(this.perRetencion);
      if (isNaN(retencion)) {
        this.errors.perRetencion = "El porcentaje de retención debe ser un número válido.";
      } else if (retencion < 0) {
        this.errors.perRetencion = "El porcentaje de retención no puede ser negativo.";
      } else if (retencion > 10) {
        this.errors.perRetencion = "El porcentaje de retención no puede superar el 10%.";
      }
    },
    validateValorNominal() {
      this.errors.valorNominal = "";
      const valor = parseFloat(this.valorNominal);
      if (isNaN(valor)) {
        this.errors.valorNominal = "El valor nominal debe ser un número válido.";
      } else if (valor <= 999) {
        this.errors.valorNominal = "El valor nominal debe ser mayor a 999.";
      }
    },
    validateCostos() {
      this.errors.costosIniciales = "";
      this.errors.costosFinales = "";

      const costoInicial = parseFloat(this.costosIniciales);
      const costoFinal = parseFloat(this.costosFinales);
      const valorNominal = parseFloat(this.valorNominal);

      if (isNaN(costoInicial)) {
        this.errors.costosIniciales = "Los costos iniciales deben ser un número válido.";
      } else if (costoInicial <= 0) {
        this.errors.costosIniciales = "Los costos iniciales deben ser mayores a 0.";
      } else if (costoInicial >= valorNominal) {
        this.errors.costosIniciales = "Los costos iniciales no pueden ser mayores o iguales al valor nominal.";
      }

      if (isNaN(costoFinal)) {
        this.errors.costosFinales = "Los costos finales deben ser un número válido.";
      } else if (costoFinal <= 0) {
        this.errors.costosFinales = "Los costos finales deben ser mayores a 0.";
      } else if (costoFinal >= valorNominal) {
        this.errors.costosFinales = "Los costos finales no pueden ser mayores o iguales al valor nominal.";
      }
    },
    acceptFactura(event) {
      event.preventDefault();
      this.validateDates();
      if (Object.keys(this.errors).length === 0) {
        this.$router.push(`/${this.id}/results`);
      }
    },
    // Calcular la diferencia en días entre la fecha de vencimiento y la fecha de emisión
    calcularDiasDescontar() {
      const fechaEmision = new Date(this.fechaEmision);
      const fechaVencimiento = new Date(this.fechaVencimiento);
      const diferencia = (fechaVencimiento - fechaEmision) / (1000 * 60 * 60 * 24) +1; // Convertir la diferencia a días
      console.log("Días a descontar:", diferencia);
      return diferencia;
    },

    // Calcular la tasa descontada (d%)
    calcularTasaDescontada() {
      const TEA = parseFloat(this.TEA) / 100;
      const d = TEA / (1 + TEA);
      const resultado = parseFloat(d.toFixed(5));
      console.log("Tasa descontada (d%):", resultado);
      return resultado;
    },

    // Calcular la retención (R)
    calcularRetencion() {
      const valorNominal = parseFloat(this.valorNominal);
      const porcentajeRetencion = parseFloat(this.perRetencion) / 100;
      const retencion = valorNominal * porcentajeRetencion;
      const resultado = parseFloat(retencion.toFixed(5));
      console.log("Retención (R):", resultado);
      return resultado;
    },

    // Calcular el seguro desgravamen (Seg)
    calcularSeguroDesgravamen() {
      const valorNominal = parseFloat(this.valorNominal);
      const porcentajeSeguro = parseFloat(this.seguroDesg) / 100;
      const seguro = valorNominal * porcentajeSeguro;
      const resultado = parseFloat(seguro.toFixed(5));
      console.log("Seguro desgravamen (Seg):", resultado);
      return resultado;
    },

    // Calcular el valor neto (VN)
    calcularValorNeto() {
      const valorNominal = parseFloat(this.valorNominal);
      const d = this.calcularTasaDescontada();
      const valorNeto = valorNominal - (valorNominal * d);
      const resultado = parseFloat(valorNeto.toFixed(5));
      console.log("Valor Neto (VN):", resultado);
      return resultado;
    },

    // Calcular el valor recibido (VR)
    calcularValorRecibido() {
      const valorNeto = this.calcularValorNeto();
      const costosIniciales = parseFloat(this.costosIniciales);
      const seguro = this.calcularSeguroDesgravamen();
      const retencion = this.calcularRetencion();
      const valorRecibido = valorNeto - (costosIniciales + seguro) - retencion;
      const resultado = parseFloat(valorRecibido.toFixed(5));
      console.log("Valor Recibido (VR):", resultado);
      return resultado;
    },

    // Calcular el valor entregado (VE)
    calcularValorEntregado() {
      const valorNominal = parseFloat(this.valorNominal);
      const costosFinales = parseFloat(this.costosFinales);
      const retencion = this.calcularRetencion();
      const valorEntregado = valorNominal + costosFinales - retencion;
      const resultado = parseFloat(valorEntregado.toFixed(5));
      console.log("Valor Entregado (VE):", resultado);
      return resultado;
    },

    // Calcular la Tasa de Costo Efectivo Anual (TCEA)
    calcularTCEA() {
      const valorEntregado = this.calcularValorEntregado();
      const valorRecibido = this.calcularValorRecibido();
      const diasDescontar = this.calcularDiasDescontar();
      const TCEA = Math.pow((valorEntregado / valorRecibido), (360 / diasDescontar)) - 1;
      const resultado = parseFloat(TCEA.toFixed(5));
      console.log("Tasa de Costo Efectivo Anual (TCEA):", resultado);
      return resultado;
    },

    // Método para ejecutar todo el proceso
    calcularTodo() {
      const diasDescontar = this.calcularDiasDescontar();
      const tasaDescontada = this.calcularTasaDescontada();
      const valorNeto = this.calcularValorNeto();
      const valorRecibido = this.calcularValorRecibido();
      const valorEntregado = this.calcularValorEntregado();
      const TCEA = this.calcularTCEA();

      // Guardar los resultados en un objeto
      const results = {
        diasDescontar,
        tasaDescontada,
        valorNeto,
        valorRecibido,
        valorEntregado,
        TCEA
      };

      // Usar el router para pasar los datos como parámetros
      this.$router.push({
        name: 'results',
        query: results
      });
    }
  },
};
</script>

<template>
  <div class="container z-1 header container-registration">
    <div class="text-100 font-medium text-xl container-info">
      <h1 class="text-100">Registrar letras y facturas</h1>
    </div>
    <div class="form-content">
      <form class="form">
        <div class="form-group">
          <label>ID del cliente:</label>
          <input
              v-model="idCliente"
              type="text"
              placeholder="Ingrese el id del cliente al que será otorgada la letra"
          />
        </div>

        <div class="form-group">
          <label>Valor nominal:</label>
          <input
              v-model="valorNominal"
              type="text"
              placeholder="Ingrese el valor nominal"
              @blur="validateValorNominal"
          />
          <p v-if="errors.valorNominal" class="error">{{ errors.valorNominal }}</p>
        </div>

        <div class="form-group">
          <label>Tasa de interés efectiva (TEA):</label>
          <input
              v-model="TEA"
              type="text"
              placeholder="Ingrese la TEA en porcentaje"
              @blur="validateTEA"
          />
          <p v-if="errors.tasaInteres" class="error">{{ errors.tasaInteres }}</p>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Fecha de emisión:</label>
            <pv-calendar
                v-model="fechaEmision"
                :min-date="new Date()"
                date-format="dd/mm/yy"
                placeholder="Seleccione la fecha de emisión"
            />
            <p v-if="errors.fechaEmision" class="error">{{ errors.fechaEmision }}</p>
          </div>
          <div class="form-group">
            <label>Fecha de vencimiento:</label>
            <pv-calendar
                v-model="fechaVencimiento"
                :min-date="fechaEmision"
                :max-date="new Date(new Date().setFullYear(new Date().getFullYear() + 1))"
                date-format="dd/mm/yy"
                placeholder="Seleccione la fecha de vencimiento"
            />
            <p v-if="errors.fechaVencimiento" class="error">{{ errors.fechaVencimiento }}</p>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Costos iniciales (CI):</label>
            <input
                v-model="costosIniciales"
                type="text"
                placeholder="0"
                @blur="validateCostos"
            />
            <p v-if="errors.costosIniciales" class="error">{{ errors.costosIniciales }}</p>
          </div>
          <div class="form-group">
            <label>Costos finales (CF):</label>
            <input
                v-model="costosFinales"
                type="text"
                placeholder="0"
                @blur="validateCostos"
            />
            <p v-if="errors.costosFinales" class="error">{{ errors.costosFinales }}</p>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Seguro desgravamen:</label>
            <input
                v-model="seguroDesg"
                type="text"
                placeholder="0"
                @blur="validateSeguroDesgravamen"
            />
            <p v-if="errors.seguroDesg" class="error">{{ errors.seguroDesg }}</p>
          </div>
          <div class="form-group">
            <label>Porcentaje retención (R%):</label>
            <input
                v-model="perRetencion"
                type="text"
                placeholder="0"
                @blur="validateRetencion"
            />
            <p v-if="errors.perRetencion" class="error">{{ errors.perRetencion }}</p>
          </div>
        </div>

        <div class="button-group">
          <button type="button" @click="calcularTodo" class="btn accept">
            Calcular
          </button>
          <button type="button" class="btn cancel">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.container-registration {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 0;
}

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

.container-info h1 {
  color: #BB9776 !important;
  font-size: 3rem;
  font-weight: bold;
  margin: 0;
}

.form-content {
  padding: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #444;
  font-size: 1.5rem;
}

.form-group input {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.error {
  color: #ef4444;
  font-size: 0.9rem;
  margin-top: 0.2rem;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.button-group {
  display: flex;
  gap: 1rem;
}

.btn {
  font-weight: bold;
  border-radius: 5px;
  padding: 1rem 2rem;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  color: #fff;
  cursor: pointer;
}

.btn.accept {
  background-color: #4ade80;
}

.btn.cancel {
  background-color: #ef4444;
}

@media (max-width: 860px) {
  .form-content {
    margin-left: 1rem;
  }

  .container {
    margin-left: 0;
  }

  .btn {
    font-size: 0.9rem;
  }
}
</style>
