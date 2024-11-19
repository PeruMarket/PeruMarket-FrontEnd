import {createRouter, createWebHistory} from "vue-router";
import ClientsViewComponent from "../public/pages/clients-view.component.vue";
import RegistrationViewComponent from "../public/pages/registration-view.component.vue";
import ProductsViewComponent from "../public/pages/products-view.component.vue";
import LoginViewComponent from "../public/pages/login-view.component.vue";
import RegisterViewComponent from "../public/pages/register-view.component.vue";
import HomeViewComponent from "../public/pages/home-view.component.vue";
import newproductViewComponent from "../public/pages/newproduct-view.component.vue";
import resultViewComponent from "../public/pages/result-view.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path:'/', redirect:'/home'},
        {path:'/home', component : HomeViewComponent},
        {path:'/login', component : LoginViewComponent},
        {path:'/register', component : RegisterViewComponent},
        {path:'/:id/clients', component:ClientsViewComponent}, {path:'/:id/products', component:ProductsViewComponent},
        {path:'/:id/newproduct', component:newproductViewComponent},
        {path:'/:id/registration', component:RegistrationViewComponent},
        {path:'/:id/results', name: 'results',component:resultViewComponent}
    ]
});
export default router;