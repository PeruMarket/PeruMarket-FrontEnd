<script>
export default {
  name: "NewProduct",
  data() {
    return {
      newProduct: {
        description: "",
        price: "",
        imageUrl: "", // Esto se usará para almacenar la imagen como Base64
      },
      selectedImage: null, // Para almacenar el archivo de imagen seleccionado
      apiUrl: "https://my-json-server.typicode.com/PeruMarket/PeruMarket-fakeapi/products",
    };
  },
  methods: {
    async submitProduct() {
      try {
        // Verificar que el usuario haya seleccionado una imagen
        if (!this.newProduct.imageUrl) {
          alert("Por favor, sube una imagen para el producto.");
          return;
        }

        const response = await fetch(this.apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.newProduct),
        });

        if (!response.ok) {
          throw new Error(`Error al registrar producto: ${response.statusText}`);
        }

        const product = await response.json();
        alert(`Producto registrado exitosamente: ${product.name}`);
        this.$router.push("/"); // Redirigir al componente principal después de guardar
      } catch (error) {
        console.error("Error al registrar el producto:", error);
        alert("Hubo un problema al registrar el producto.");
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();

        // Convertir el archivo en Base64
        reader.onload = (e) => {
          this.newProduct.imageUrl = e.target.result; // Guardar la imagen como Base64
          this.selectedImage = e.target.result; // Mostrar la vista previa
        };

        reader.readAsDataURL(file);
      }
    },
    goBack() {
      this.$router.push("/:id/products");
    },
  },
};
</script>

<template>
<div class="container z-1 header container-products">
  <div
      style="
      display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 0;
    "
  >
    <h2 style="color: #333; margin-bottom: 20px;">Añadir Nuevo Producto</h2>

    <form
        @submit.prevent="submitProduct"
        style="
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 500px;
        padding: 20px;
        border-radius: 10px;
      "
    >

      <label style="margin-bottom: 10px;">Descripción:</label>
      <textarea
          v-model="newProduct.description"
          required
          style="
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin-bottom: 20px;
        "
      ></textarea>

      <label style="margin-bottom: 10px;">Precio:</label>
      <input
          v-model="newProduct.price"
          type="number"
          required
          style="
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin-bottom: 20px;
        "
      />

      <label style="margin-bottom: 10px;">Cargar Imagen:</label>
      <input
          type="file"
          accept="image/*"
          @change="handleImageUpload"
          style="
          margin-bottom: 20px;
        "
      />

      <!-- Mostrar una vista previa de la imagen si se ha cargado -->
      <div v-if="selectedImage" style="margin-bottom: 20px; text-align: center;">
        <p style="margin-bottom: 10px;">Vista previa:</p>
        <img
            :src="selectedImage"
            alt="Vista previa de la imagen"
            style="max-width: 100%; max-height: 200px; border: 1px solid #ccc; border-radius: 5px;"
        />
      </div>

      <button
          type="submit"
          style="
          background-color: #4caf50;
          color: white;
          padding: 10px 20px;
          font-size: 1rem;
          border: none;
          cursor: pointer;
          border-radius: 5px;
          font-weight: bold;
          margin-bottom: 10px;
        "
      >
        Guardar
      </button>

      <button
          type="button"
          @click="goBack"
          style="
          background-color: #e74c3c;
          color: white;
          padding: 10px 20px;
          font-size: 1rem;
          border: none;
          cursor: pointer;
          border-radius: 5px;
          font-weight: bold;
        "
      >
        Cancelar
      </button>
    </form>
  </div>
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