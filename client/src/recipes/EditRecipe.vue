<template>
  <div class="container">
    <p class="error" v-if="error">{{ this.error }}</p>

    <h3>Rezept bearbeiten</h3>
    <p>
      Sollten Sie sich (noch einmal) mit einer Mengenangabe vertan haben, oder
      etwas falsch eingegeben oder vergessen haben, können Sie dies jederzeit
      korrigieren.
    </p>

    <div>
      <table width="100%">
        <tr>
          <th>Beschreibung</th>
          <th>Einfügen</th>
        </tr>
        <tr>
          <td>
            <hr class="fatHr" />
          </td>
          <td>
            <hr class="fatHr" />
          </td>
        </tr>
        <tr>
          <td>
            <label for="titleInput">Titel:</label>
          </td>
          <td>
            <textarea
              :rows="1"
              :cols="50"
              type="text"
              v-model="title"
              id="titleInput"
              placeholder="Titel"
            />
          </td>
        </tr>

        <tr>
          <td>
            <hr />
          </td>
          <td>
            <hr />
          </td>
        </tr>

        <tr>
          <td>
            <label for="ingredientsInput">Zutaten:</label>
          </td>
          <td>
            <div id="ingredientsInput">
              <table>
                <tr>
                  <th>Zutat</th>
                  <th>Menge</th>
                </tr>
                <tr v-for="(ingredient, index) in ingredients" :key="index">
                  <td>
                    <input type="text" v-model="ingredient.name" />
                  </td>
                  <td>
                    <input type="text" v-model="ingredient.amount" />
                  </td>
                </tr>
              </table>

              <button @click="addIngredient">Eine weitere Zutat hinzufügen</button>
            </div>
          </td>
        </tr>

        <tr>
          <td>
            <hr />
          </td>
          <td>
            <hr />
          </td>
        </tr>

        <tr>
          <td>
            <label for="descriptionInput">Beschreibung:</label>
          </td>
          <td>
            <textarea
              type="text"
              :rows="descriptionHeight"
              :cols="descriptionWidth"
              v-model="description"
              id="descriptionInput"
              placeholder="Beschreibung"
            />
          </td>
        </tr>

        <tr>
          <td>
            <hr />
          </td>
          <td>
            <hr />
          </td>
        </tr>

        <tr>
          <td>
            <label for="recipeTypeInput">Rezept-Typ:</label>
          </td>
          <td>
            <select type="text" v-model="recipeType" id="recipeTypeInput">
              <option disabled value>Bitte auswählen</option>
              <option value="appetizer">Vorspeise / Salat</option>
              <option value="hearty">Hauptspeise</option>
              <option value="sweet">Nachspeise / süßes Gericht</option>
              <option value="bread">Brote / Brötchen</option>
              <option value="bakery">Backwaren außer Brote / Brötchen</option>
            </select>
          </td>
        </tr>

        <tr>
          <td>
            <hr />
          </td>
          <td>
            <hr />
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <button type="submit" @click="updateItem()" id="submit">Bestätigen</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import ItemService from '../ItemService';

import { mapGetters } from 'vuex';

export default {
  name: 'EditRecipe',
  data() {
    return {
      item: {},
      title: '',
      ingredients: [],
      description: '',
      recipeType: '',
      descriptionWidth:
        window.innerWidth / 9 < 50
          ? window.innerWidth / 15
          : window.innerWidth / 9,
      descriptionHeight: 10,

      error: '',
    };
  },
  computed: mapGetters(['user']),
  methods: {
    async updateItem() {
      this.ingredients.filter(ingredient => {
        if (ingredient.name === '' || ingredient.amount === '') {
          this.error = 'Eine Zutat ist nicht vollständig eingegeben!';
          return false;
        }
        return true;
      });

      await ItemService.updateItem(
        this.$route.params.id,
        this.title,
        this.ingredients,
        this.description,
        this.recipeType,
        this.user.username,
      )
        .then(response => {
          if (response.status - 200 > 100) {
            this.error = `Fehler: \nStatuscode: ${response.status}\nFehler: ${response}`;
          } else {
            this.$router.push({
              name: 'Recipe',
              params: { id: this.$route.params.id },
            });
            this.$router.go();
          }
        })
        .catch(err => {
          this.error = err;
        });
    },
    addIngredient() {
      this.ingredients.push({
        name: '',
        amount: '',
      });
    },
  },
  mounted() {
    this.addIngredient();
  },
  async created() {
    try {
      this.item = await ItemService.getItemById(this.$route.params.id);
      if (this.item === null) {
        this.error = `Das Rezept mit der id ${this.route.params.id} existiert nicht (mehr)!`;
      } else {
        this.title = this.item.title;
        this.ingredients = this.item.ingredients;
        this.description = this.item.description;
        this.recipeType = this.item.recipeType;
      }
    } catch (err) {
      this.error = err.message;
    }
  },
};
</script>

<style scoped>
* {
  text-align: center;
  margin: 0 auto;
}

#submit {
  color: #ffffff;
  background-color: #00ff00;
  margin: 0 auto;
  text-align: center;
}
</style>
