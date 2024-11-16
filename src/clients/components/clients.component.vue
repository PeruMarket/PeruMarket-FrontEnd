<script>
import { ClientsApiService } from "../services/clients-api.service.js";
import { IamApiService } from "../../iam/services/iam-api.service.js";

export default {
  name: "clients",
  data() {
    return {
      clients: [],
      filteredClients: [],
      searchQuery: "",
      selectedClient: null,
      addingClientDialogVisible: false,
      id: this.$route.params.id,
      users: [],
      clientData: [],
      clientsApi: new ClientsApiService(),
      iamApi: new IamApiService(),
      newClient: {
        name: "",
        lastName: "",
        email: "",
        dni: "",
      },
    };
  },
  methods: {
    async getDataClients() {
      try {
        const usersResponse = await this.iamApi.getAllUsers();
        const clientsResponse = await this.clientsApi.getAllClients();

        this.users = usersResponse.data;
        this.clientData = clientsResponse.data;

        const currentUser = this.users.find(
            (user) => user.id === Number(this.id)
        );

        if (currentUser) {
          const userClients = currentUser.clients
              .map((client) => {
                const clientDetails = this.clientData.find(
                    (c) => c.id === Number(client.idClient)
                );
                return clientDetails
                    ? {
                      ...clientDetails,
                      clientName: `${clientDetails.name} ${clientDetails.lastName}`,
                    }
                    : null;
              })
              .filter((client) => client !== null);

          this.clients = userClients;
          this.filteredClients = userClients
        }
      } catch (error) {
        console.error("Error fetching clients data:", error);
      }
    },
    filterClients() {
      if (!this.searchQuery) {
        this.filteredClients = this.clients;
      } else {
        this.filteredClients = this.clients.filter((client) =>
            client.clientName
                .toLowerCase()
                .includes(this.searchQuery.toLowerCase())
        );
      }
    },
    openAddClientDialog() {
      this.addingClientDialogVisible = true;
    },
    closeAddClientDialog() {
      this.addingClientDialogVisible = false;
      this.newClient = {
        name: "",
        lastName: "",
        email: "",
        dni: ""
      };
    },
    async addClient() {
      try {
        const clientResponse = await this.clientsApi.createClient(this.newClient);

        const newClientId = clientResponse.data?.id;
        if (!newClientId) {
          throw new Error("El ID del cliente no fue devuelto por el servidor");
        }

        await this.iamApi.addClientToUser(this.id, newClientId);

        await this.getDataClients();

        this.closeAddClientDialog();
      } catch (error) {
        console.error("Error al añadir cliente:", error);
      }
    },
    async confirmDelete(clientId) {
      const confirm = window.confirm("¿Estás seguro de que deseas eliminar este cliente?");
      if (confirm) {
        await this.deleteClient(clientId);
      }
    },

    async deleteClient(clientId) {
      try {
        await this.clientsApi.deleteClient(clientId);

        await this.getDataClients();

        alert("Cliente eliminado con éxito.");
      } catch (error) {
        console.error("Error al eliminar cliente:", error);
        alert("No se pudo eliminar el cliente.");
      }
    },
  },
  created() {
    this.getDataClients();
  }
};
</script>

<template>
  <div class="container z-1 header container-clients">
    <div class="text-100 font-medium text-xl container-info">
      <h1 class="text-100">Mis clientes</h1>
    </div>
    <div class="add-client-button">
      <pv-button label="Añadir cliente" @click="openAddClientDialog" icon="pi pi-plus" />
    </div>
    <div class="card-container-1">
      <pv-card>
        <template #content>
          <div class="search-container">
            <input v-model="searchQuery" class="p-inputtext search-input" type="text" placeholder="Buscar cliente" />
            <pv-button label="Buscar" icon="pi pi-search" class="search-button" @click="filterClients" />
          </div>

          <pv-table :value="filteredClients">
            <pv-column field="clientName" header="Cliente"></pv-column>
            <pv-column field="email" header="Correo"></pv-column>
            <pv-column field="dni" header="DNI"></pv-column>
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

  <pv-dialog v-model:visible="addingClientDialogVisible" :style="{width: '450px'}" header="Añadir cliente" :modal="true" class="p-fluid dialog-style">
    <div class="field">
      <p>Nombre</p>
      <input id="name" v-model="newClient.name" class="p-inputtext"/>
    </div>
    <div class="field">
      <p>Apellido</p>
      <input id="lastName" v-model="newClient.lastName" class="p-inputtext"/>
    </div>
    <div class="field">
      <p>Correo electrónico</p>
      <input id="email" v-model="newClient.email" class="p-inputtext"/>
    </div>
    <div class="field">
      <p>DNI</p>
      <input id="dni" v-model="newClient.dni" class="p-inputtext"/>
    </div>

    <template #footer>
      <pv-button label="Cancelar" icon="pi pi-times" @click="closeAddClientDialog" class="cancel-button"/>
      <pv-button label="Añadir" icon="pi pi-check" @click="addClient" class="add-button"/>
    </template>
  </pv-dialog>
</template>

<style scoped>
.container-clients {
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

.add-client-button {
  margin-top: 1rem;
}

.add-client-button button {
  background-color: #BB9776 !important;
  color: #fff !important;
  font-weight: bold;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.add-client-button button:hover {
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

@media (max-width: 860px) {
  .container {
    margin-left: 0;
  }

  .card-container-1 {
    margin-left: 1rem;
  }
}
</style>
