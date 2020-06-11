<template>
  <div class="container">
    <p class="error" v-if="error">{{ this.error }}</p>

    <div>
      <h3 v-show="this.keywords !== null">Rezepte, die "{{ keywords }}" enthalten</h3>
      <h3 v-show="this.keywords === null">Alle Rezepte</h3>

      <ShowRecipes :items="items" />
    </div>

    <div v-show="this.keywords !== null">
      <h3>Rezepte, deren Zutaten "{{ keywords }}" enthalten</h3>

      <ShowRecipes :items="ingredientItems" />
    </div>
  </div>
</template>

<script>
import ItemService from '../ItemService';

import ShowRecipes from './ShowRecipes.vue';

export default {
  name: 'SearchRecipes',
  data() {
    return {
      error: '',
      items: [],
      ingredientItems: [],

      keywords: '',
    };
  },
  components: {
    ShowRecipes,
  },
  created() {
    this.getRequestedItems();
  },
  methods: {
    getKeywords() {
      const params = this.$route.params.keywords;

      if (params === undefined || params === '+') {
        this.keywords = null;
      } else {
        const splitted = params.split('+');
        const splittedString = splitted.toString();
        const right = splittedString.replace(/,/g, ' ');

        this.keywords = right.trim();
      }
    },
    getRequestedItems() {
      this.getKeywords();
      try {
        if (this.keywords === null) {
          ItemService.getItems()
            .then(response => {
              this.items = response;
            })
            .catch(err => {
              this.error = err;
            });
        } else {
          ItemService.getItemsByTitle(this.keywords)
            .then(response => {
              this.items = response;
            })
            .catch(err => {
              this.error = err;
            });

          ItemService.getItemsByIngredients(this.keywords)
            .then(response => {
              this.ingredientItems = response;
            })
            .catch(err => {
              this.error = err;
            });
        }
      } catch (err) {
        this.error = err.message;
      }
    },
  },
};
</script>

<style scoped></style>
