<template>
  <div>
    <h1>Brote / Brötchen</h1>
    <p>Hier finden Sie alle Rezepte für Brote und Brötchen</p>

    <p class="error" v-if="error">{{ this.error }}</p>

    <div v-show="items.length === 0">Keine Rezepte gefunden!</div>
    <div v-show="items.length !== 0">Anzahl Rezepte: {{items.length}}</div>

    <router-link
      id="recipes"
      class="item router-links"
      v-for="(recipe, index) in items"
      v-show="items.length > 0"
      :item="recipe"
      :index="index"
      :key="recipe._id"
      :to="{name: 'Recipe', params: { id: recipe._id } }"
    >{{ recipe.title }}</router-link>
  </div>
</template>

<script>
import ItemService from '../../ItemService';

export default {
  name: 'Bread',
  data() {
    return {
      items: [],
      error: '',

      // (background-) css colors
      color1: '',
      color2: '',
      textColor: '',
    };
  },
  created() {
    this.getBreadItems();

    this.color1 = '128, 42, 0, 60';
    this.color2 = '255, 128, 102, 1';
    this.textColor = '#aacccc';

    document.documentElement.style.setProperty('--color1', this.color1);
    document.documentElement.style.setProperty('--color2', this.color2);
    document.documentElement.style.setProperty('--textColor', this.textColor);
  },
  methods: {
    getBreadItems() {
      try {
        ItemService.getItemsByRecipeType('bread').then((response) => {
          this.items = response;
        }).catch((err) => {
          this.error = err;
        });
      } catch (err) {
        this.error = err.message;
      }
    },
  },
};
</script>

<style scoped></style>
