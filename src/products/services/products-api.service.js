import http from "../../shared/services/http-common.js";

export class ProductsApiService {
    getAllProducts() {
        return http.get('/product');
    }

    getProductById(id) {
        return http.get(`/product/${id}`);
    }

    createProduct(product) {
        return http.post('/product', product);
    }

    updateProduct(id, product) {
        return http.put(`/product/${id}`, product);
    }

    deleteProduct(id) {
        return http.delete(`/product/${id}`);
    }
}