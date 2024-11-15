<script>
import { ClientsApiService } from "../services/clients-api.service.js";
import { IamApiService } from "../../iam/services/iam-api.service.js";

export default {
  name: "clients",
  data() {
    return {
      clients: [],
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
        dni: ""
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

        const currentUser = this.users.find(user => user.id === Number(this.id));

        if (currentUser) {
          const userClients = currentUser.clients.map(client => {
            const clientDetails = this.clientData.find(c => c.id === Number(client.idClient));
            return clientDetails ? {
              ...clientDetails,
              clientName: `${clientDetails.name} ${clientDetails.lastName}`
            } : null;
          }).filter(client => client !== null);

          this.clients = userClients;
          console.log(this.clients);
        }
      } catch (error) {
        console.error("Error fetching clients data:", error);
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
        const response = await this.clientsApi.createClient(this.newClient);
        console.log("New client added:", response.data);
        this.getDataClients();
        this.closeAddClientDialog();
      } catch (error) {
        console.error("Error adding new client:", error);
      }
    },
    deleteClient() {
      this.clientsApi.deleteClient(this.deleteClientId)
          .then(() => {
            this.deleteClientId = '';
          });
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
      <h1 class="text-100">Clientes</h1>
    </div>
    <div class="add-client-button">
      <pv-button label="Add Client" @click="openAddClientDialog" icon="pi pi-plus" />
    </div>
    <div class="card-container-1">
      <pv-card>
        <template #content>
          <pv-table :value="clients">
            <pv-column field="clientName" header="Cliente"></pv-column>
            <pv-column field="email" header="Correo"></pv-column>
            <pv-column field="dni" header="DNI"></pv-column>
          </pv-table>
        </template>
      </pv-card>
    </div>
  </div>

  <pv-dialog v-model:visible="addingClientDialogVisible" :style="{width: '450px'}" header="Add Client" :modal="true" class="p-fluid dialog-style">
    <div class="field">
      <p>Name</p>
      <input id="name" v-model="newClient.name" class="p-inputtext"/>
    </div>
    <div class="field">
      <p>Last Name</p>
      <input id="lastName" v-model="newClient.lastName" class="p-inputtext"/>
    </div>
    <div class="field">
      <p>Email</p>
      <input id="email" v-model="newClient.email" class="p-inputtext"/>
    </div>
    <div class="field">
      <p>DNI</p>
      <input id="dni" v-model="newClient.dni" class="p-inputtext"/>
    </div>

    <template #footer>
      <pv-button label="Cancel" icon="pi pi-times" @click="closeAddClientDialog" class="cancel-button"/>
      <pv-button label="Add" icon="pi pi-check" @click="addClient" class="add-button"/>
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
  padding: 3rem;
  margin-left: 20rem;
  width: 100vw;
  height: 100vh;
  background-color: #f2f1f1;
}

.container-info h1 {
  color: #000 !important;
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
}

.card-container-1 {
  width: 80%;
  margin-top: 1rem;
}

.dialog-style dialog content {
  background-color: #f5f5f5;
  color: #333;
}

.dialog-style dialog header {
  background-color: #007bff;
  color: whitesmoke;
}

.dialog-style .cancel-button {
  background-color: #dc3545;
  color: #fff;
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
  border-color: #BB9776;
  background-color: #ffffff;
  color: #000;
}

.field {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
}

.field input {
  flex-grow: 1;
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
