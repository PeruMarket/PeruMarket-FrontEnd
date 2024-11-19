<script>
import { IamApiService } from "../services/iam-api.service.js";

export default {
  name: "iam-login",
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      error: false,
      iamApi: new IamApiService(),
      id: null
    };
  },
  methods: {
    login() {
      this.iamApi.findUserWithEmailAndPassword(this.email, this.password).then(data => {
        const userInfo = data.data[0];
        if (userInfo) {
          this.id = userInfo.id;
          this.error = false;
          this.goToClients();
        } else {
          this.error = true;
          alert("Email o contraseña incorrectos.");
        }
      }).catch(() => {
        this.error = true;
        alert("Hubo un error al conectarse con el servidor.");
      });
    },
    goToClients() {
      if (this.id) {
        this.$router.push(`/${this.id}/clients`);
      } else {
        console.error("ID de usuario no definido.");
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>


<template>
  <div class="login-container">
    <div class="login-card">
      <img src="../../public/assets/logo.png" alt="logo" class="logo"/>
      <h1>Iniciar Sesión</h1>
      <form @submit.prevent="login">
        <pv-label for="email" class="input-label">Correo electrónico</pv-label>
        <pv-input type="email" id="email" v-model="email" required class="input-field"/>

        <pv-label for="password" class="input-label">Contraseña</pv-label>
        <div class="password-container">
          <pv-input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" required
                    class="input-field"/>
          <pv-button type="button" class="toggle-password" @click="togglePasswordVisibility">
            <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
          </pv-button>
        </div>

        <a href="#" class="forgot-password">¿Olvidaste tu contraseña?</a>

        <pv-button type="submit" class="login-button">Iniciar</pv-button>
      </form>
      <p class="register-prompt">
        ¿No tienes una cuenta? <a @click="goToRegister" class="register-link">Regístrate</a>
      </p>
    </div>
  </div>
</template>


<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f2f1f1;
}

.login-card {
  width: 100%;
  max-width: 550px;
  padding: 2rem;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.logo {
  width: 160px;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  margin-top: 0.5rem;
  color: #000;
}

form {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.input-label {
  font-size: 1.2rem;
  color: #555;
  text-align: left;
}

.input-field {
  padding: 0.6rem;
  font-size: 1.2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}

.password-container {
  display: flex;
  align-items: center;
  position: relative;
}

.password-container .input-field {
  padding-right: 3rem;
}

.toggle-password {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  color: #888;
  font-size: 1.2rem;
  cursor: pointer;
}

.toggle-password:hover {
  color: #555;
}

.forgot-password {
  font-size: 0.9rem;
  color: #888;
  text-align: right;
  display: block;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-button {
  padding: 0.75rem;
  font-size: 1.3rem;
  background-color: #bb9776;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 50%;
  align-self: center;
  text-align: center; /* Centra el texto */
  display: flex;      /* Asegura el centrado */
  align-items: center;
  justify-content: center;
  font-weight: bold;
}


.login-button:hover {
  background-color: #a07f5b;
}

.register-prompt {
  font-size: 0.9rem;
  color: #888;
  margin-top: 1rem;
}

.register-link {
  font-weight: bold;
  color: #bb9776;
  text-decoration: none;
  cursor: pointer;
}

.register-link:hover {
  text-decoration: underline;
}
</style>
