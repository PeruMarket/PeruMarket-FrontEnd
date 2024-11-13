<script>
import { useRoute } from "vue-router";
export default {
  name: "home",
  methods: {
    goToLogin() {
      this.$router.push('/login');
    },
    goToRegister() {
      this.$router.push('/register');
    }
  },
}
</script>

<template>
  <div class="home">
    <div class="home-content">
      <div class="home-content-text">
        <img class="logo" src="../../public/assets/logo.png" alt="Logo de Perú Market">
        <h1>Registra tus cuentas de manera rápida!</h1>
        <h2>Registra tus productos fácilmente y ten la confianza y seguridad que necesitas al contabilizar tus ganancias.</h2>
        <div class="home-content-header-buttons">
          <pv-button class="btn btn-primary" label="Iniciar Sesión"raised @click="goToLogin"></pv-button>
          <pv-button class="btn btn-secondary" label="Registrarse" icon="pi pi-angle-right" iconPos="right" variant="text" raised @click="goToRegister"></pv-button>
        </div>
      </div>
      <div class="home-content-image">
        <img src="../../public/assets/comerciante.png" alt="Comerciante">
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
  position: relative;
  background-color: #F2F1F1;
}

.logo {
  position: absolute;
  top: 60px;
  left: 45px;
  width: 190px;
  z-index: 10;
  transition: width 0.3s ease;
}

.home-content {
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100%;
}

.home-content-text {
  flex: 1;
  text-align: left;
  padding: 3rem;
}

h1 {
  font-size: 4.1em;
  margin-bottom: 0.7em;
  font-weight: bold;
  color: #000000;
}

h2 {
  font-size: 2.1em;
  margin-bottom: 1.5em;
  color: #000000;
  font-weight: normal;
}

.home-content-header-buttons {
  display: flex;
  gap: 1em;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1.1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #BB9776;
  color: #fff;
  cursor: pointer;
  transition: border-color 0.25s, background-color 0.25s, color 0.25s;
}

button:hover {
  border-color: #BB9776;
  background-color: #ffffff;
  color: #000;
}

button:hover label {
  color: #BB9776;
}

button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

.home-content-image {
  flex: 1;
  max-width: 40%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: flex-end;
}

.home-content-image img {
  width: 100%;
  height: 100vh;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  object-fit: cover;
}

@media (max-width: 768px) {
  .home-content {
    flex-direction: column;
  }

  .logo {
    width: 150px;
  }

  .home-content-text, .home-content-image {
    max-width: 100%;
  }

  .home-content-image img {
    border-radius: 0;
    height: auto;
    width: 100%;
  }
}
</style>
