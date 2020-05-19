<template>
  <div class="container">
    <h3>Account-Einstellungen: Beschreibung</h3>

    <p class="error" v-if="error">{{ this.error }}</p>

    <table width="100%">
      <tr>
        <td>
          <label for="username">Benutzername:</label>
        </td>
        <td>
          <p id="username">{{ username }}</p>
        </td>
      </tr>
      <tr width="100%">
        <td>Beschreibung:</td>
        <td width="100%">
          <textarea name="description" id="description" v-model="description" rows="10" />
        </td>
      </tr>
      <tr>
        <td>Bestätigen:</td>
        <td>
          <button @click="updateUser">Beschreibung ändern</button>
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
  mounted() {},
  methods: {
    async updateUser() {
      await UserService.updateDescription(this.username, this.description)
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

textarea {
  width: 90%;
}
</style>
