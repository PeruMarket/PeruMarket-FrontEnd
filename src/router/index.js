import {createRouter, createWebHistory} from "vue-router";
import ClientsViewComponent from "../public/pages/clients-view.component.vue";
import RegistrationViewComponent from "../public/pages/registration-view.component.vue";
import ProductsViewComponent from "../public/pages/products-view.component.vue";
import LoginViewComponent from "../public/pages/login-view.component.vue";
import RegisterViewComponent from "../public/pages/register-view.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path:'/', redirect:'/clients'},
        {path:'/login', component : LoginViewComponent},
        {path:'/register', component : RegisterViewComponent},
        {path:'/clients', component:ClientsViewComponent},
        {path:'/registration', component:RegistrationViewComponent},
        {path:'/products', component:ProductsViewComponent}
    ]
});
export default router;