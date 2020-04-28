<template>
  <div class="container">
    <h3>Account-Einstellungen</h3>

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
        <td>Beschreibung:</td>
        <td>
          <textarea name="description" id="description" v-model="description" rows="10" />
        </td>
      </tr>
      <tr>
        <td>Bestätigen:</td>
        <td>
          <button @click="updateUser">Passwort und Beschreibung ändern</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import UserService from '../UserService';

export default {
  name: 'UpdateUser',
  data() {
    return {
      user: {},
      username: sessionStorage.username,
      password1: '',
      password2: '',
      description: '',
      error: '',
    };
  },
  async created() {
    try {
      const userArray = await UserService.getUserByUsername(this.username);
      this.user = userArray[0];

      if (this.item === null) {
        this.error = `Der Benutzer mit der id ${this.route.params.id} existiert nicht (mehr)!`;
      } else {
        this.description = this.user.description;
      }
    } catch (err) {
      this.error = err.message;
    }
  },
  mounted() {
    document.querySelector('#description').style.width = this.textareacols();
  },
  methods: {
    textareacols() {
      return document.querySelector('#passwordControlLabel')
        ? window.innerWidth -
            10 -
            (document.querySelector('#passwordControlLabel').offsetWidth + 6) +
            'px'
        : '200px';
    },

    async updateUser() {
      await UserService.updateUser(
        this.username,
        this.password1,
        this.password2,
        this.description,
      )
        .then(response => {
          if (response.status - 200 > 100) {
            this.error = `Fehler: \nStatuscode: ${response.status}\nFehler: ${response}`;
          } else {
            this.$router.push({ name: 'About' });
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
