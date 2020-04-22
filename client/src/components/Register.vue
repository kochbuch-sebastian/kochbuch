<template>
  <div class="container">
    <h3>Registrierung</h3>

    <p class="error" v-if="error">{{ this.error }}</p>

    <table>
      <tr>
        <td>
          <label for="username">Benutzername:</label>
        </td>
        <td>
          <input type="text" id="username" placeholder="Benutzername" v-model="username" />
        </td>
      </tr>
      <tr>
        <td>
          <label for="password">Passwort:</label>
        </td>
        <td>
          <input type="password" id="password" placeholder="Passwort" v-model="password1" />
        </td>
      </tr>
      <tr>
        <td>
          <label for="password-control">Passwort - Kontrolle:</label>
        </td>
        <td>
          <input type="password" id="password-control" placeholder="Passwort" v-model="password2" />
        </td>
      </tr>
      <button @click="register">Registrieren</button>
    </table>
  </div>
</template>

<script>
import UserService from '../UserService';

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      password1: '',
      password2: '',
      description: '',
      error: '',
    };
  },
  methods: {
    async register() {
      await UserService.insertUser(
        this.username,
        this.password1,
        this.password2,
        this.description,
      )
        .then(response => {
          if (response.status - 200 > 100) {
            this.error = `Fehler: \nStatuscode: ${response.status}\nFehler: ${response}`;
          } else {
            this.$router.push({ name: 'Login' });
            this.$router.go();
          }
        })
        .catch(err => {
          console.log(err);
          this.error =
            'Sollten die beiden Passwörter gleich sein, ist der Benutzername bereits vergeben!';
        });
    },
  },
};
</script>

<style scoped>
table {
  margin: 0 auto;
}
</style>
