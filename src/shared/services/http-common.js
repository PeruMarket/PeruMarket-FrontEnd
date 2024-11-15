import axios from "axios";

const http = axios.create({
    baseURL : "https://my-json-server.typicode.com/PeruMarket/PeruMarket-fakeapi",
    headers:{'Content-type':'application/json'}
});

export default http;