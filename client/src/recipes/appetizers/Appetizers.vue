<template>
  <div>
    <h1>Vorspeisen / Salate</h1>
    <p>Hier finden Sie alle Rezepte für Vorspeisen und Salate</p>

    <p class="error" v-if="error">{{ this.error }}</p>

    <ShowRecipes :items="items"></ShowRecipes>
  </div>
</template>

<script>
import ItemService from '../../ItemService';

import ShowRecipes from '../ShowRecipes.vue';

export default {
  name: 'Appetizers',
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
  components: {
    ShowRecipes,
  },
  created() {
    this.getAppetizerItems();

    this.color1 = '0, 204, 3, 0.56';
    this.color2 = '0, 204, 3, 0.28';
    this.textColor = '#2c3e50';

    document.documentElement.style.setProperty('--color1', this.color1);
    document.documentElement.style.setProperty('--color2', this.color2);
    document.documentElement.style.setProperty('--textColor', this.textColor);
  },
  mounted() {
    this.$emit('change-image', 'appetizer');
  },
  methods: {
    getAppetizerItems() {
      try {
        ItemService.getItemsByRecipeType('appetizer')
          .then(response => {
            this.items = response;
          })
          .catch(err => {
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
