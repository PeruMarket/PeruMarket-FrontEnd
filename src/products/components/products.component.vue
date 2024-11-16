<script>
import axios from "axios";

export default {
  name: "products",
  data() {
    return {
      products: [],
      filteredProducts: [],
      searchQuery: "",
      apiUrl: "https://my-json-server.typicode.com/PeruMarket/PeruMarket-fakeapi/products",
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get(this.apiUrl);
        this.products = response.data;
        this.filteredProducts = response.data;
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    },
    filterProducts() {
      if (!this.searchQuery) {
        this.filteredProducts = this.products;
      } else {
        const query = this.searchQuery.toLowerCase();
        this.filteredProducts = this.products.filter(
            (product) =>
                product.name.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query)
        );
      }
    },
    confirmDelete(productId) {
      const confirm = window.confirm(
          "¿Estás seguro de que deseas eliminar este producto? (Esto es solo local)"
      );
      if (confirm) {
        this.deleteProduct(productId);
      }
    },
    deleteProduct(productId) {
      try {
        this.products = this.products.filter((product) => product.id !== productId);
        this.filteredProducts = this.products;
        alert("Producto eliminado (solo en la lista local).");
      } catch (error) {
        console.error("Error al eliminar producto:", error);
      }
    },
    goToNewProduct() {
      // Redirigir al componente 'NewProduct'
      this.$router.push("/newproduct");
    },
  },
  created() {
    this.fetchProducts();
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
  margin-top: 20px;
    "
    >
      <h1 class="text-100">Productos</h1>
      <div
          style="
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        width: 100%;
        max-width: 800px;
      "
      >
        <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar"
            style="
          width: 100%;
          max-width: 600px;
          padding: 10px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin-right: 10px;
        "
        />
        <button
            @click="filterProducts"
            style="
          background-color: #ffffff;
          border: 1px solid #ccc;
          padding: 10px 20px;
          font-size: 1rem;
          cursor: pointer;
          border-radius: 5px;
          color: #333;
        "
        >
          Buscar
        </button>
      </div>

      <div
          style="
        background-color: white;
        border-radius: 10px;
        width: 100%;
        max-width: 800px;
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      "
      >
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
          <tr style="background-color: #f5f5f5; text-align: left;">
            <th style="padding: 10px; border-bottom: 1px solid #ddd;">Producto</th>
            <th style="padding: 10px; border-bottom: 1px solid #ddd;">Descripción</th>
            <th style="padding: 10px; border-bottom: 1px solid #ddd;">Costo</th>
            <th style="padding: 10px; border-bottom: 1px solid #ddd;">Acciones</th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="product in filteredProducts"
              :key="product.id"
              style="border-bottom: 1px solid #ddd;"
          >
            <td style="padding: 10px; display: flex; align-items: center;">
              <img
                  :src="product.imageUrl"
                  alt="Producto"
                  style="width: 60px; height: auto; border-radius: 5px; margin-right: 10px;"
              />
              {{ product.name }}
            </td>
            <td style="padding: 10px;">{{ product.description }}</td>
            <td style="padding: 10px;">S/. {{ product.price }}</td>
            <td style="padding: 10px;">
              <button
                  @click="confirmDelete(product.id)"
                  style="
                  background-color: #e74c3c;
                  color: white;
                  border: none;
                  padding: 5px 10px;
                  border-radius: 5px;
                  cursor: pointer;
                "
              >
                🗑️
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <button
          @click="goToNewProduct"
          style="
        margin-top: 20px;
        background-color: #4caf50;
        color: white;
        padding: 10px 20px;
        font-size: 1rem;
        border: none;
        cursor: pointer;
        border-radius: 5px;
        font-weight: bold;
      "
      >
        Agregar
      </button>
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