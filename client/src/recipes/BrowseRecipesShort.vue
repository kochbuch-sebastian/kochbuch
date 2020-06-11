<template>
  <div class="container">
    <h3>Rezepte</h3>

    <p class="error" v-if="error">{{ this.error }}</p>
    <p>Hier finden Sie alle unsere Rezepte; sortiert nach Typ:</p>

    <div>
      <h5>
        <router-link :to="{name: 'BrowseAppetizers'}" class="router-links-h5">Vorspeisen / Salate</router-link>
      </h5>

      <div class="items">
        <ShowRecipes :items="appetizerItems"></ShowRecipes>
      </div>
    </div>

    <hr class="fatHr" />

    <div>
      <h5>
        <router-link :to="{name: 'BrowseHearty'}" class="router-links-h5">Hauptgerichte</router-link>
      </h5>

      <div class="items">
        <ShowRecipes :items="heartyItems"></ShowRecipes>
      </div>
    </div>

    <hr class="fatHr" />

    <div>
      <h5>
        <router-link :to="{name: 'BrowseSweet'}" class="router-links-h5">Desserts / Nachspeisen</router-link>
      </h5>

      <div class="items">
        <ShowRecipes :items="sweetItems"></ShowRecipes>
      </div>
    </div>

    <hr class="fatHr" />

    <div>
      <h5>
        <router-link :to="{name: 'BrowseBread'}" class="router-links-h5">Brote / Brötchen</router-link>
      </h5>

      <div class="items">
        <ShowRecipes :items="breadItems"></ShowRecipes>
      </div>
    </div>

    <hr class="fatHr" />

    <div>
      <h5>
        <router-link :to="{name: 'BrowseBakery'}" class="router-links-h5">sonstige Backwaren</router-link>
      </h5>

      <div class="items">
        <ShowRecipes :items="bakeryItems"></ShowRecipes>
      </div>
    </div>
  </div>
</template>

<script>
import ItemService from '../ItemService';
import ShowRecipes from './ShowRecipes.vue';

export default {
  name: 'BrowseRecipesShort',
  data() {
    return {
      error: '',

      items: [],

      appetizerItems: [],
      heartyItems: [],
      sweetItems: [],
      breadItems: [],
      bakeryItems: [],
    };
  },
  components: {
    ShowRecipes,
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      this.items = await ItemService.getItems();

      ItemService.getItemsByRecipeType('appetizer')
        .then(response => {
          this.appetizerItems = response;
          this.appetizerItems = this.appetizerItems.slice(0, 3);
        })
        .catch(err => {
          this.error = err;
        });

      ItemService.getItemsByRecipeType('hearty')
        .then(response => {
          this.heartyItems = response;
          this.heartyItems = this.heartyItems.slice(0, 3);
        })
        .catch(err => {
          this.error = err;
        });

      ItemService.getItemsByRecipeType('sweet')
        .then(response => {
          this.sweetItems = response;
          this.sweetItems = this.sweetItems.slice(0, 3);
        })
        .catch(err => {
          this.error = err;
        });

      ItemService.getItemsByRecipeType('bread')
        .then(response => {
          this.breadItems = response;
          this.breadItems = this.breadItems.slice(0, 3);
        })
        .catch(err => {
          this.error = err;
        });

      ItemService.getItemsByRecipeType('bakery')
        .then(response => {
          this.bakeryItems = response;
          this.bakeryItems = this.bakeryItems.slice(0, 3);
        })
        .catch(err => {
          this.error = err;
        });
    },
  },
};
</script>

<style scoped>
</style>