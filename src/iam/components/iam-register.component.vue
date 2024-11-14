<script>
export default {
  name: "iam-register",
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptedTerms: false,
        receiveNews: false,
      },
      showPassword: false,
      showConfirmPassword: false,
    };
  },
  methods: {
    register() {
      const passwordRegex = /^.{8,}$/;
      if (this.user.password !== this.user.confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
      }
      if (!passwordRegex.test(this.user.password)) {
        alert("La contraseña debe tener al menos 8 caracteres.");
        return;
      }
      // Lógica de registro aquí
      this.goToClients();
    },
    goToLogin() {
      this.$router.push('/login');
    },
    goToClients() {
      this.$router.push('/clients');
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
  }
}
</script>

<template>
  <div class="register-container">
    <div class="register-card">
      <img src="../../public/assets/logo.png" alt="logo" class="logo" />
      <h1>Registrarse</h1>
      <form @submit.prevent="register">
        <div class="name-fields">
          <div>
            <label for="firstName">Nombre</label>
            <input type="text" id="firstName" v-model="user.firstName" required />
          </div>
          <div>
            <label for="lastName">Apellido</label>
            <input type="text" id="lastName" v-model="user.lastName" required />
          </div>
        </div>

        <div class="email-fields">
          <label for="email">Correo Electrónico</label>
          <input type="email" id="email" v-model="user.email" required />
        </div>

        <div class="password-fields">
          <div class="password-container">
            <label for="password">Contraseña</label>
            <input :type="showPassword ? 'text' : 'password'" id="password" v-model="user.password" required/>
            <button type="button" class="toggle-password" @click="togglePasswordVisibility">
              <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
            </button>
          </div>

          <div class="password-container">
            <label for="confirmPassword">Confirmar Contraseña</label>
            <input :type="showConfirmPassword ? 'text' : 'password'" id="confirmPassword" v-model="user.confirmPassword" required/>
            <button type="button" class="toggle-password" @click="toggleConfirmPasswordVisibility">
              <i :class="showConfirmPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
            </button>
          </div>
        </div>

        <div class="checkbox-container">
          <label>
            <input type="checkbox" v-model="user.receiveNews" />
            Deseo recibir noticias por correo electrónico
          </label>
          <label>
            <input type="checkbox" v-model="user.acceptedTerms" required />
            He leído y acepto la política de privacidad
          </label>
        </div>

        <pv-button type="submit" class="register-button">Registrarse</pv-button>
      </form>
      <p class="login-prompt">
        ¿Ya tienes una cuenta? <a @click="goToLogin" class="login-link">Iniciar sesión</a>
      </p>
    </div>
  </div>
</template>

<style scoped>
.register-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f2f1f1;
}

.register-card {
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
  color: #000;
}

form {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.name-fields, .password-fields {
  text-align: left;
  display: flex;
  gap: 1rem;
}

.email-fields {
  text-align: left;
  flex-direction: column;
  gap: 1rem;
}

.name-fields div, .password-fields .password-container {
  flex: 1;
}

label {
  font-size: 1.2rem;
  color: #555;
  text-align: left;
}

input {
  padding: 0.6rem;
  font-size: 1.2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}

.password-container {
  position: relative;
}

.password-container input {
  width: 100%;
  padding-right: 2.8rem;
}

.toggle-password {
  top: 2.5rem;
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

.checkbox-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: left;
  font-size: 1rem;
  color: #888;
}

.checkbox-container label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: #555;
}

.checkbox-container input[type="checkbox"] {
  width: 10%;
  height: 16px;
  margin: 0;
  padding: 0;
}

.register-button {
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
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.register-button:hover {
  background-color: #a07f5b;
}

.login-prompt {
  font-size: 0.9rem;
  color: #888;
  margin-top: 1rem;
}

.login-link {
  font-weight: bold;
  color: #bb9776;
  text-decoration: none;
  cursor: pointer;
}

.login-link:hover {
  text-decoration: underline;
}
</style>
