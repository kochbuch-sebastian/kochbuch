<template>
  <div>
    <h1>Desserts / Nachspeisen</h1>
    <p>Hier finden Sie alle Rezepte für Desserts und Nachspeisen</p>

    <p class="error" v-if="error">{{ this.error }}</p>

    <ShowRecipes :items="items"></ShowRecipes>
  </div>
</template>

<script>
import ItemService from '../../ItemService';

import ShowRecipes from '../ShowRecipes.vue';

export default {
  name: 'Sweet',
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
    this.getSweetItems();

    this.color1 = '161, 63, 191, 0.56';
    this.color2 = '161, 63, 191, 0.28';
    this.textColor = '#2c3e50';

    document.documentElement.style.setProperty('--color1', this.color1);
    document.documentElement.style.setProperty('--color2', this.color2);
    document.documentElement.style.setProperty('--textColor', this.textColor);
  },
  mounted() {
    this.$emit('change-image', 'sweet');
  },
  methods: {
    getSweetItems() {
      try {
        ItemService.getItemsByRecipeType('sweet')
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

<style scoped>
</style>
