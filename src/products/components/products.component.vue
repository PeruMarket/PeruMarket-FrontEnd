<script>
import {ProductsApiService} from "../services/products-api.service.js";
import {IamApiService} from "../../iam/services/iam-api.service.js";

export default {
  name: "products",
  data() {
    return {
      products: [],
      filteredProducts: [],
      searchQuery: "",
      id: this.$route.params.id,
      users: [],
      productData: [],
      productsApi: new ProductsApiService(),
      iamApi: new IamApiService(),
      newProduct: {
        description: "",
        cost: "",
        productImg: "",
      },
    };
  },
  methods: {
    formatCurrency(value) {
      return `S/.${Number(value).toFixed(2)}`;
    },
    async getDataProducts() {
      try {
        const usersResponse = await this.iamApi.getAllUsers();
        const productsResponse = await this.productsApi.getAllProducts();

        this.users = usersResponse.data;
        this.productData = productsResponse.data;

        const currentUser = this.users.find(
            (user) => user.id === Number(this.id)
        );

        if (currentUser) {
          const userProducts = currentUser.products
              .map((product) => {
                return this.productData.find((p) => p.id === Number(product.idProduct));
              })
              .filter((product) => product !== null);

          this.products = userProducts;
          this.filteredProducts = userProducts
        }
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    },
    filterProducts() {
      if (!this.searchQuery) {
        this.filteredProducts = this.products;
      } else {
        this.filteredProducts = this.products.filter((product) =>
            product.description.toLowerCase().includes(this.searchQuery.toLowerCase())
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
    async deleteProduct(productId) {
      try {
        await this.productsApi.deleteProduct(productId);
        await this.getDataProducts();
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
    this.getDataProducts();
  },
};
</script>

<template>
  <div class="container z-1 header container-products">
    <div class="text-100 font-medium text-xl container-info">
      <h1 class="text-100">Mis productos</h1>
    </div>
    <div class="add-product-button">
      <pv-button label="Añadir producto" icon="pi pi-plus" @click="goToNewProduct" />
    </div>
    <div class="card-container-1">
      <pv-card>
        <template #content>
          <div class="search-container">
            <input v-model="searchQuery" class="p-inputtext search-input" type="text" placeholder="Buscar producto" />
            <pv-button label="Buscar" icon="pi pi-search" class="search-button" @click="filterProducts" />
          </div>

          <pv-table v-if="filteredProducts.length" :value="filteredProducts">
            <pv-column field="productImg" header="Imagen">
              <template #body="slotProps">
                <img :src="slotProps.data.productImg" alt="Imagen" class="product-image" />
              </template>
            </pv-column>
            <pv-column field="description" header="Producto"></pv-column>
            <pv-column field="cost" header="Precio">
              <template #body="slotProps">
                {{ formatCurrency(slotProps.data.cost) }}
              </template>
            </pv-column>
            <pv-column header="Acciones">
              <template #body="slotProps">
                <pv-button
                    label="Eliminar"
                    icon="pi pi-trash"
                    class="delete-button"
                    @click="confirmDelete(slotProps.data.id)"
                />
              </template>
            </pv-column>
          </pv-table>
        </template>
      </pv-card>
    </div>
  </div>
</template>

<style scoped>
.container-products {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
.card-container-1 {
  width: 80%;
  margin-top: 1rem;
}
.dialog-style .cancel-button {
  background-color: #BB9776 !important;
  color: #fff !important;
  font-weight: bold;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}
.dialog-style .cancel-button:hover {
  background-color: #a07f5b;
}
.dialog-style .add-button {
  background-color: #BB9776 !important;
  color: #fff !important;
  font-weight: bold;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}
.dialog-style .add-button:hover {
  background-color: #a07f5b;
}
.add-product-button {
  margin-top: 1rem;
}
.add-product-button button {
  background-color: #BB9776 !important;
  color: #fff !important;
  font-weight: bold;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}
.add-product-button button:hover {
  background-color: #a07f5b;
}
.field {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
  font-size: 1.1rem;
}
.field input {
  padding: 0.6rem;
  font-size: 1.2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}
.delete-button {
  background-color: #e74c3c !important;
  color: #fff !important;
  font-weight: bold;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}
.delete-button:hover {
  background-color: #c0392b;
}
.search-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
  width: 100%;
}
.search-input {
  width: 20%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.search-button {
  background-color: #bb9776 !important;
  color: #fff !important;
  font-weight: bold;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}
.search-button:hover {
  background-color: #a07f5b;
}

.product-image {
  width: 100px;
  height: auto;
  object-fit: cover;
  border-radius: 5px;
}

@media (max-width: 860px) {
  .container {
    margin-left: 0;
  }
  .card-container-1 {
    margin-left: 1rem;
  }
}

</style>