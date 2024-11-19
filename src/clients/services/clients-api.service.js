import http from "../../shared/services/http-common.js";

export class ClientsApiService {
    getAllClients() {
        return http.get('/client');
    }
    getClientById(id) {
        return http.get(`/client/${id}`);
    }
    createClient(client) {
        return http.post('/client', client);
    }
    deleteClient(id) {
        return http.delete(`/client/${id}`);
    }
}