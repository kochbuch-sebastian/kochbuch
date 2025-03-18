<template>
  <div class="container">
    <h3>Account-Einstellungen: Passwort ändern</h3>

    <p class="error" v-if="error">{{ this.error }}</p>

    <table>
      <tr>
        <td>
          <label for="username">Benutzername:</label>
        </td>
        <td>
          <p id="username">{{ username }}</p>
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
          <label for="password-control" id="passwordControlLabel">Passwort - Kontrolle:</label>
        </td>
        <td>
          <input type="password" id="password-control" placeholder="Passwort" v-model="password2" />
        </td>
      </tr>
      <tr>
        <td>Bestätigen:</td>
        <td>
          <button @click="updateUser">Passwort ändern</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import UserService from '../../UserService';

export default {
  name: 'UpdateUser',
  data() {
    return {
      user: {},
      username: sessionStorage.username,
      password1: '',
      password2: '',
      error: '',
    };
  },
  async created() {
    document.addEventListener('keypress', event => this.keyListener(event));

    try {
      const userArray = await UserService.getUserByUsername(this.username);
      this.user = userArray[0];

      if (this.item === null) {
        this.error = `Der Benutzer mit der id ${this.route.params.id} existiert nicht (mehr)!`;
      }
    } catch (err) {
      this.error = err.message;
    }
  },
  unmounted() {
    document.removeEventListener('keypress', event => this.keyListener(event));
  },
  methods: {
    keyListener(event) {
      if (event.which === 13 || event.keyCode === 13) {
        event.preventDefault();
        this.updateUser();
      }
    },

    async updateUser() {
      await UserService.updatePassword(
        this.username,
        this.password1,
        this.password2,
      )
        .then(response => {
          if (response.status - 200 > 100) {
            this.error = `Fehler: \nStatuscode: ${response.status}\nFehler: ${response}`;
          } else {
            this.$router.push({
              name: 'User',
              params: { username: this.username },
            });
            this.$router.go();
          }
        })
        .catch(err => {
          console.log(err);
          this.error = 'Die beiden Passwörter müssen gleich sein!';
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
