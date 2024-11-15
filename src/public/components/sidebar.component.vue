<script>
import {IamApiService} from "../../iam/services/iam-api.service.js";

export default {
  name: "sidebar",
  data() {
    return {
      name: "",
      lastName: "",
      visible: false,
      hamburgerVisible: window.innerWidth <= 860,
      activeRoute: this.$route.path,
      id: this.$route.params.id,
      iamApi: new IamApiService()
    };
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    this.iamApi.findUserById(this.id).then(data => {
      this.name = data.data.name;
      this.lastName = data.data.lastName;
      console.log(data.data);
    })
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.hamburgerVisible = window.innerWidth <= 860;
    },
    toggleHamburger() {
      this.hamburgerVisible = !this.hamburgerVisible;
    },
    goToClients() {
      this.$router.push(`/${this.id}/clients`);
      this.activeRoute = `/${this.id}/clients`;
    },
    goToRegistration() {
      this.$router.push(`/${this.id}/registration`);
      this.activeRoute = `/${this.id}/registration`;
    },
    goToProducts() {
      this.$router.push(`/${this.id}/products`);
      this.activeRoute = `/${this.id}/products`;
    },
    logout() {
      this.$router.push('/login');
    }
  },
  watch: {
    '$route'(to) {
      this.activeRoute = to.path;
    }
  }
}
</script>

<template>
  <pv-sidebar class="p-col-20 p-md-6 p-xl-4 sidebar" :visible="!hamburgerVisible" :showCloseIcon="false"
              :showHeader="false" :dismissable="true">
    <pv-button icon="pi pi-times" text rounded aria-label="Cancel" class="close-button" @click="toggleHamburger">
    </pv-button>
    <div class="flex flex-column align-items-center">
      <img src="https://www.caritas.org.mx/wp-content/uploads/2019/02/cualidades-persona-humanitaria.jpg" id="icon"
           alt="User Icon" class="custom-image">
      <div class="text-center mt-3">
        <h2 class="text">{{ name }}</h2>
        <h2 class="text">{{ lastName }}</h2>
      </div>
    </div>
    <div class="menu-container">
      <ul class="list-none p-3 m-0">
        <li @click="goToClients">
          <a v-ripple :class="['nav-item', { 'active': activeRoute === `/${this.id}/clients` }]"
             class="flex align-items-center cursor-pointer p-3 border-round">
            <i class="pi pi-users mr-2 text-xl"></i>
            <span class="text-xl">Mis clientes</span>
          </a>
        </li>
        <li @click="goToRegistration">
          <a v-ripple :class="['nav-item', { 'active': activeRoute === `/${this.id}/registration` }]"
             class="flex align-items-center cursor-pointer p-3 border-round">
            <i class="pi pi-clipboard mr-2 text-xl"></i>
            <span class="text-xl">Registrar letras/facturas</span>
          </a>
        </li>
        <li @click="goToProducts">
          <a v-ripple :class="['nav-item', { 'active': activeRoute === `/${this.id}/products` }]"
             class="flex align-items-center cursor-pointer p-3 border-round">
            <i class="pi pi-shop mr-2 text-xl"></i>
            <span class="text-xl">Productos</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="logout-container">
      <ul class="list-none p-3 m-0">
        <li @click="logout">
          <a v-ripple :class="['nav-item', { 'active': activeRoute === '/login' }]"
             class="flex align-items-center cursor-pointer p-3 border-round">
            <i class="pi pi-sign-out mr-2 text-xl"></i>
            <span class="text-xl">Cerrar sesión</span>
          </a>
        </li>
      </ul>
    </div>
  </pv-sidebar>
  <pv-button class="p-col-12 p-md-auto justify-content-center p-3 m-3 hamburger-button" @click="toggleHamburger">
    <i class="pi pi-bars"></i>
  </pv-button>
</template>

<style>
.p-sidebar-header {
  display: none;
}

.p-sidebar {
  background-color: #BB9776;
  z-index: 1000;
}

.p-sidebar-mask {
  z-index: 1000 !important;
}

.close-button {
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 1rem;
  margin-right: 1rem;
  z-index: 1002;
}

.custom-image {
  border-radius: 50%;
  width: 160px;
  height: 160px;
  margin-left: 0 !important;
  margin-top: 60px;
}

.menu-container {
  margin-top: 3rem;
}

.text {
  font-size: 25px;
  line-height: 15px;
  font-weight: bold;
  color: white;
}

.text-xl {
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
  color: white;
}

.hamburger-button {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.logout-container {
  margin-top: 6rem;
  margin-left: 1rem;
  margin-right: 1rem;
}

@media (min-width: 860px) {
  .hamburger-button {
    display: none;
  }

  .close-button {
    display: none;
  }

  .p-sidebar-mask {
    z-index: 0 !important;
  }
}

ul li {
  margin-bottom: 0;
}

.nav-item {
  color: white;
  transition: background-color 0.3s, color 0.3s;
}

.nav-item:hover,
.nav-item.active {
  background-color: white;
  color: #BB9776;
}

.nav-item span {
  color: inherit;
}

.nav-item i {
  color: inherit;
}
</style>