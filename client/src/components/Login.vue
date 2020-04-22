<template>
  <div class="container">
    <div v-if="loggedIn">
      <h3>Logout</h3>

      <h4>Hallo {{ username }}! Sind Sie sicher, dass Sie sich ausloggen möchten?</h4>

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
      </table>
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
      typedUsername: '',
      typedPassword: '',
      error: '',
    };
  },
  computed: mapGetters(['username', 'loggedIn']),
  methods: {
    ...mapActions(['login', 'logout']),

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

    /*async login() {      
        await UserService.getUserByUsername(this.typedUsername)
          .then((response) => {
            if (response.status - 200 > 100) {
              this.error = `Fehler: \nStatuscode: ${response.status}\nFehler: ${response}`;
            } else {
              console.log(response);
              if (response.length === 0) {
                this.error = `Kein Benutzer mit Benutzernamen ${this.typedUsername}`;
              } else if (response.length >= 2) {
                this.error = `Bitte Server-internen Fehler melden: ${response.length} Benutzer mit dem gleichen Benutzernamen!`;
              } else {
                if (response[0].) {
                  this.$router.push({ name: 'Home' });
                  this.$router.go();
                } else {
                  this.error = 'Falsches Passwort';
                }
              }
            }
          })
          .catch((err) => {
            this.error = err;
          });
        }*/
  },
};
</script>

<style></style>
