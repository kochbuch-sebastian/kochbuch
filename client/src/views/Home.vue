<template>
  <div class="container">
    <div class="home">
      <h3 class="hello">
        Herzlich Willkommen
        <i v-if="loggedIn">{{ user.username }}</i>!
      </h3>
      <i>Hier sind alle Rezepte durch mindestens einmaliges Kochen oder Backen geprüft.</i>
      <p v-if="loggedIn">
        Sie möchten ein Rezept hinzufügen? Dann klicken Sie doch
        <router-link :to="{name: 'AddRecipe'}" exact class="router-links noMargin">hier</router-link>.
      </p>
      <p>Wir wünschen Ihnen einen guten Appetit!</p>
    </div>
    <hr class="fatHr" />
    <div id="recipesDivision">
      <p>Hier sehen Sie alle unsere Rezepte. Wenn Sie mögen, probieren Sie sie doch direkt aus!</p>

      <ShowRecipes :items="this.recipes"></ShowRecipes>
    </div>
  </div>
</template>

<script>
// import ItemService from '../ItemService';

import ShowRecipes from '../recipes/ShowRecipes.vue'

import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      items: [],
      error: '',
    };
  },
  computed: mapGetters(['user', 'loggedIn', 'recipes']),
  created() {
    // this.getAllItems();
    this.fetchRecipes();
  },
  components: {
    ShowRecipes,
  },
  methods: {
    ...mapActions(['fetchRecipes']),
    /* getAllItems() {
      try {
        ItemService.getItems()
          .then(response => {
            this.items = response;
          })
          .catch(err => {
            this.error = err;
          });
      } catch (err) {
        this.error = err.message;
      }
    },*/
  },
};
</script>

<style scoped>
#recipesDivision {
  margin-top: 1rem;
}
</style>
