<template>
  <div class="container">
    <p class="error" v-if="error">{{ error }}</p>

    <!-- display: none because it was just for testing purposes. It can be shown just with removing the 'display: none;' line (currently line 9) -->
    <button
      class="delete"
      @click="deleteButtonClicked"
      v-if="loggedIn && username === item.username"
      style="width: 50px; height: 50px;"
    >
      <img
        id="editIcon"
        src="../assets/delete_icon.png"
        alt="Suchen"
        style="width: 30px; height: 30px;"
      />
    </button>

    <button
      class="edit"
      @click="editButtonClicked"
      v-if="loggedIn && username === item.username"
      style="width: 50px; height: 50px;"
    >
      <img
        id="editIcon"
        src="../assets/edit_icon.png"
        alt="Suchen"
        style="width: 30px; height: 30px;"
      />
    </button>

    <button
      class="favorite"
      @click="favoriteButtonClicked"
      v-if="loggedIn"
      style="width: 50px; height: 50px;"
      :class="{favoriteClass: isFavorite}"
    >
      <img
        id="favoriteIcon"
        src="../assets/favorite_icon.svg"
        alt="Lieblingsrezept"
        style="width: 30px; height: 30px;"
      />
    </button>

    <h3>Rezept:</h3>
    <h4>{{ item.title }}</h4>
    <p>Hinzugefügt von {{ this.item.username }} am {{ this.createdAt }}</p>
    <hr class="fatHr" />

    <table>
      <tr>
        <th>Zutaten</th>
        <th>Beschreibung</th>
      </tr>
      <tr>
        <td>
          <Ingredients :ingredients="item.ingredients"></Ingredients>
        </td>
        <td>
          <pre>{{ this.item.description }}</pre>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import ItemService from '../ItemService';
import UserService from '../UserService';

import Ingredients from './recipe/Ingredients.vue';

import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Recipe',
  components: {
    Ingredients,
  },
  computed: { ...mapGetters(['username', 'loggedIn']) },
  data() {
    return {
      item: {},
      error: '',

      isFavorite: false,

      date: Date.now(),

      createdAt: '',

      // (background-) css colors
      color1: '',
      color2: '',
      textColor: '',
    };
  },
  methods: {
    ...mapActions(['deleteRecipe']),

    favoriteButtonClicked() {
      if (this.isFavorite) {
        console.log(`Removing ${this.item._id} from favorites`);
        UserService.removeFavorite(this.username, this.item._id).then(() => {
          this.isFavorite = !this.isFavorite;
        });
      } else {
        console.log(`Adding ${this.item._id} to favorites`);
        UserService.addFavorite(this.username, this.item._id).then(() => {
          this.isFavorite = !this.isFavorite;
        });
      }
    },
    editButtonClicked() {
      this.$router.push({
        name: 'EditRecipe',
        params: { id: this.$route.params.id },
      });
    },
    deleteButtonClicked() {
      this.$dialog.confirm('Löschen?').then(() => {
        const params = {
          id: this.$route.params.id,
          username: this.username,
        };
        this.$store.dispatch('deleteRecipe', params);

        this.$router.push({
          name: 'BrowseRecipes',
        });
      });
    },
  },
  async created() {
    try {
      this.item = await ItemService.getItemById(this.$route.params.id);
      if (this.item === null) {
        this.error = `Das Rezept mit der id ${this.route.params.id} existiert nicht (mehr)!`;
      }

      this.date = new Date(this.item.date);

      if (this.loggedIn) {
        const searchedUserArray = await UserService.getUserByUsername(
          this.username,
        );
        const searchedUser = searchedUserArray[0];

        this.isFavorite = searchedUser.favorites.includes(
          this.item._id.toString(),
        );
      }

      this.createdAt = `${this.date.getDate()}.${this.date.getMonth() +
        1}.${this.date.getFullYear()}`;

      switch (this.item.recipeType) {
        case 'appetizer':
          this.color1 = '102, 255, 102, 1';
          this.color2 = '153, 255, 153, 1';
          this.textColor = '#2c3e50';
          break;
        case 'hearty':
          this.color1 = '77, 106, 255, 1';
          this.color2 = '153, 187, 255, 1';
          this.textColor = '#222244';
          break;
        case 'sweet':
          this.color1 = '255, 128, 234, 1';
          this.color2 = '255, 204, 246, 1';
          this.textColor = '#2c3e50';
          break;
        case 'bread':
          this.color1 = '128, 42, 0, 60';
          this.color2 = '255, 128, 102, 1';
          this.textColor = '#aacccc';
          break;
        case 'bakery':
          this.color1 = '255, 119, 51, 1';
          this.color2 = '255, 136, 77, 0.9';
          this.textColor = '#2c3e50';
          break;

        default:
          this.color1 = '8, 126, 126, 1';
          this.color2 = '102, 228, 228, 1';
          this.textColor = '#2c3e50';
      }

      document.documentElement.style.setProperty('--color1', this.color1);
      document.documentElement.style.setProperty('--color2', this.color2);
      document.documentElement.style.setProperty('--textColor', this.textColor);
    } catch (err) {
      this.error = err.message;
    }
  },
};
</script>

<style scoped>
table {
  margin: 2px 0 2px 0;
}
img {
  padding: 0;
  margin: 0;
}
.edit {
  position: absolute;
  float: right;
  right: 3rem;
  top: 12rem;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  border: 2px solid #555555;
}
.delete {
  position: absolute;
  float: right;
  right: 3rem;
  top: calc(12rem + 52px);
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  border: 2px solid #555555;
}

hr {
  margin-bottom: 1rem;
}

.favoriteClass {
  background-color: #01ff2c;
}
</style>
