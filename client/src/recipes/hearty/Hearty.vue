<template>
  <div>
    <h1>Hauptgerichte</h1>
    <p>Hier finden Sie alle Rezepte für Hauptgerichte</p>

    <p class="error" v-if="error">{{ this.error }}</p>

    <ShowRecipes :items="items"></ShowRecipes>
  </div>
</template>

<script>
import ItemService from '../../ItemService';

import ShowRecipes from '../ShowRecipes.vue';

export default {
  name: 'Hearty',
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
    this.getHeartyItems();

    this.color1 = '77, 106, 255, 1';
    this.color2 = '153, 187, 255, 1';
    this.textColor = '#222244';

    document.documentElement.style.setProperty('--color1', this.color1);
    document.documentElement.style.setProperty('--color2', this.color2);
    document.documentElement.style.setProperty('--textColor', this.textColor);
  },
  methods: {
    getHeartyItems() {
      try {
        ItemService.getItemsByRecipeType('hearty')
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
