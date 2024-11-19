import http from "../../shared/services/http-common.js";

export class IamApiService {
    createUser(jsonUser) {
        return http.post('/users', jsonUser)
    }

    findUserById(id) {
        return http.get(`/users/${id}`);
    }

    findUserWithEmailAndPassword(email, password) {
        return http.get(`/users/?email=${email}&password=${password}`);
    }

    getAllUsers() {
        return http.get('/users');
    }

    addClientToUser(userId, clientId) {
        const payload = {idClient: clientId};
        return http.post(`/users/${userId}/client`, payload);
    }
}