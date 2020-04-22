<template>
  <div class="container">
    <p class="error" v-if="error">{{ this.error }}</p>

    <h3 v-show="this.keywords !== null">Rezepte, die "{{ keywords }}" enthalten</h3>
    <h3 v-show="this.keywords === null">Alle Rezepte</h3>

    <div v-show="items.length === 0">Keine Rezepte gefunden!</div>
    <div v-show="items.length !== 0">Anzahl Rezepte: {{items.length}}</div>

    <div
      class="item"
      v-for="(recipe, index) in items"
      v-show="items.length > 0"
      :item="recipe"
      :index="index"
      :key="recipe._id"
    >{{index}}: {{ recipe.title }}</div>
  </div>
</template>

<script>
import ItemService from '../ItemService';

export default {
  name: 'SearchRecipes',
  data() {
    return {
      items: [],
      keywords: '',
      error: '',
    };
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
          ItemService.getItems().then((response) => {
            this.items = response;
          }).catch((err) => {
            this.error = err;
          });
        } else {
          ItemService.getItemsByTitle(this.$route.params.keywords).then((response) => {
            this.items = response;
          }).catch((err) => {
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
