<script>
import {ProductsApiService} from "../services/products-api.service.js";
import {ClientsApiService} from "../../clients/services/clients-api.service.js";

export default {
  name: "NewProduct",
  data() {
    return {
      newProduct: {
        description: "",
        price: "",
        imageUrl: "",
      },
      selectedImage: null,
      idUser: this.$route.params.id,
      productsApi: new ProductsApiService(),
    };
  },
  methods: {
    async submitProduct() {
      try {
        if (!this.newProduct.imageUrl) {
          alert("Por favor, sube una imagen para el producto.");
          return;
        }

        const productWithUser = {
          ...this.newProduct,
          idUser: this.idUser,
        };

        await this.productsApi.createProduct(productWithUser);
        alert("Producto registrado exitosamente.");
        this.$router.push(`/${this.idUser}/products`);
      } catch (error) {
        console.error("Error al registrar el producto:", error);
        alert("Hubo un problema al registrar el producto.");
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          this.newProduct.imageUrl = e.target.result;
          this.selectedImage = e.target.result;
        };

        reader.readAsDataURL(file);
      }
    },
    goBack() {
      this.$router.push(`/${this.idUser}/products`);
    },
  },
};
</script>

<template>
  <div class="container z-1 header container-products">
    <div class="text-100 font-medium text-xl container-info">
      <h1 class="text-100">Añadir Producto</h1>
    </div>
    <div class="form-container">
      <form @submit.prevent="submitProduct">
        <label>Descripción:</label>
        <textarea v-model="newProduct.description" required></textarea>

        <label>Precio:</label>
        <input v-model="newProduct.price" type="number" required />

        <label>Cargar Imagen:</label>
        <div class="image-preview">
          <p>Vista previa:</p>
          <div class="circle-preview">
            <img v-if="selectedImage" :src="selectedImage" alt="Vista previa de la imagen" />
          </div>
        </div>
        <label for="file-upload" class="custom-file-upload">Seleccionar Imagen</label>
        <input id="file-upload" type="file" accept="image/*" @change="handleImageUpload" />


        <button type="submit">Guardar</button>
        <button type="button" @click="goBack">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.container-products {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-left: 0;
}

.container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 2rem;
  margin-left: 20rem;
  width: 100vw;
  height: 100vh;
  background-color: #f2f1f1;
  align-items: center;
}

.container-info h1 {
  color: #BB9776 !important;
  font-size: 3rem;
  font-weight: bold;
  margin: 0;
}
.form-container {
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

label {
  font-size: 1rem;
  font-weight: 500;
  color: #7a5a4a;
  margin-bottom: 0.5rem;
  width: 100%;
  text-align: left;
}

textarea,
input[type="number"] {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
  background-color: #f9f9f9;
}

input[type="file"] {
  display: none;
}

label[for="file-upload"] {
  display: inline-block;
  background-color: #d2b89f;
  color: #fff;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}

label[for="file-upload"]:hover {
  background-color: #b89e86;
}

.image-preview {
  text-align: center;
  margin: 1rem 0;
}

.image-preview img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 1px solid #ccc;
  border-radius: 50%;
}

.circle-preview {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 2px dashed #bbb;
  margin: 0 auto 1rem;
}

.circle-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

/* Botones */
button[type="submit"],
button[type="button"] {
  font-size: 1rem;
  padding: 0.7rem 2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0.5rem;
  width: 100%;
  max-width: 150px;
}

button[type="submit"] {
  background-color: #4caf50;
  color: #fff;
}

button[type="submit"]:hover {
  background-color: #45a049;
}

button[type="button"] {
  background-color: #f44336;
  color: #fff;
}

button[type="button"]:hover {
  background-color: #d32f2f;
}
</style>
