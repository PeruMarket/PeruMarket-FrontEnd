import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css'

import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import ToastService from 'primevue/toastservice';
import Sidebar from 'primevue/sidebar';

import router from "./router/index.js";
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import Checkbox from "primevue/checkbox";
import Column from "primevue/column";
import Card from "primevue/card";
import DataTable from "primevue/datatable";
import Dialog from "primevue/dialog";
import Calendar from "primevue/calendar";

const app = createApp(App);

app.use(PrimeVue,{ripple:true})
    .use(ToastService)
    .use(router)
    .component('pv-sidebar', Sidebar)
    .component('pv-button', Button)
    .component('pv-input', InputText)
    .component('pv-label', FloatLabel)
    .component('pv-checkbox', Checkbox)
    .component('pv-card', Card)
    .component('pv-table', DataTable)
    .component('pv-column', Column)
    .component('pv-dialog', Dialog)
    .component('pv-calendar', Calendar)

app.mount('#app')
