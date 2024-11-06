import axios from "axios";

const http = axios.create({
    baseURL : API_BASE_URL,
    headers:{'Content-type':'application/json'}
});

export default http;