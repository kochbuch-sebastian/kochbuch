<template>
  <div class="container">
    <div v-if="loggedIn">
      <h3>Logout</h3>

      <h4>Hallo {{ user.username }}! Sind Sie sicher, dass Sie sich ausloggen möchten?</h4>

      <button @click="performLogout" class="logout">Logout</button>
    </div>

    <div v-if="!loggedIn">
      <h3>Login</h3>

      <p class="error" v-if="error">{{ this.error }}</p>

      <table>
        <tr>
          <td>
            <label for="username">Benutzername:</label>
          </td>
          <td>
            <input type="text" id="username" placeholder="Benutzername" v-model="typedUsername" />
          </td>
        </tr>
        <tr>
          <td>
            <label for="password">Passwort:</label>
          </td>
          <td>
            <input type="password" id="password" placeholder="Passwort" v-model="typedPassword" />
          </td>
        </tr>
        <button @click="performLogin" class="login">Login</button>
      </table>Noch kein Konto?
      <router-link :to="{ name: 'Register' }" class="router-links noMarginExceptRight">Hier</router-link>registrieren.
    </div>
  </div>
</template>

<script>
import UserService from '../UserService';

import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      // on Login
      typedUsername: '',
      typedPassword: '',
      error: '',

      // on Logout
      username: '',
    };
  },
  computed: mapGetters(['user', 'loggedIn']),
  created() {
    document.addEventListener('keypress', event => this.keyListener(event));
  },
  beforeMount() {
    this.username = this.user === null ? '' : this.user.username;
  },
  destroyed() {
    document.removeEventListener('keypress', event => this.keyListener(event));
  },
  methods: {
    ...mapActions(['login', 'logout']),

    keyListener(event) {
      if (event.which === 13 || event.keyCode === 13) {
        event.preventDefault();
        this.loggedIn ? this.performLogout() : this.performLogin();
      }
    },

    performLogout() {
      this.logout();
    },

    async performLogin() {
      try {
        await UserService.login(this.typedUsername, this.typedPassword);

        this.login(this.typedUsername);

        this.$router.push({
          name: 'Home',
        });
      } catch (err) {
        console.log(err);
        this.error = 'Bitte Benutzernamen und Passwort überprüfen!';
      }
    },
  },
};
</script>

<style scoped>
</style>
