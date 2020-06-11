<template>
  <div class="container">
    <h3>Rezepte</h3>

    <p class="error" v-if="error">{{ this.error }}</p>
    <p>Hier finden Sie alle unsere Rezepte; sortiert nach Typ:</p>

    <div>
      <h5>
        <router-link
          :to="{name: 'BrowseAppetizers'}"
          class="router-links router-links-h5"
        >Vorspeisen / Salate</router-link>
      </h5>

      <div class="items">
        <ShowRecipes :items="appetizerItems"></ShowRecipes>
      </div>
    </div>

    <div>
      <h5>
        <router-link :to="{name: 'BrowseHearty'}" class="router-links router-links-h5">Hauptgerichte</router-link>
      </h5>

      <div class="items">
        <ShowRecipes :items="heartyItems"></ShowRecipes>
      </div>
    </div>

    <div>
      <h5>
        <router-link
          :to="{name: 'BrowseSweet'}"
          class="router-links router-links-h5"
        >Desserts / Nachspeisen</router-link>
      </h5>

      <div class="items">
        <ShowRecipes :items="sweetItems"></ShowRecipes>
      </div>
    </div>

    <div>
      <h5>
        <router-link
          :to="{name: 'BrowseBread'}"
          class="router-links router-links-h5"
        >Brote / Brötchen</router-link>
      </h5>

      <div class="items">
        <ShowRecipes :items="breadItems"></ShowRecipes>
      </div>
    </div>

    <div>
      <h5>
        <router-link
          :to="{name: 'BrowseBakery'}"
          class="router-links router-links-h5"
        >sonstige Backwaren</router-link>
      </h5>

      <div class="items">
        <ShowRecipes :items="bakeryItems"></ShowRecipes>
      </div>
    </div>
  </div>
</template>

<script>
import ItemService from '../ItemService';
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
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      this.items = await ItemService.getItems();

      this.appetizerItems = this.items.filter(el => {
        return el.recipeType === 'appetizer';
      });
      this.appetizerItems = this.appetizerItems.slice(0, 3);

      this.heartyItems = this.items.filter(el => {
        return el.recipeType === 'hearty';
      });
      this.heartyItems = this.heartyItems.slice(0, 3);

      this.sweetItems = this.items.filter(el => {
        return el.recipeType === 'sweet';
      });
      this.sweetItems = this.sweetItems.slice(0, 3);

      this.breadItems = this.items.filter(el => {
        return el.recipeType === 'bread';
      });
      this.breadItems = this.breadItems.slice(0, 3);

      this.bakeryItems = this.items.filter(el => {
        return el.recipeType === 'bakery';
      });
      this.bakeryItems = this.bakeryItems.slice(0, 3);
    },
  },
};
</script>

<style scoped>
.router-links-h5 {
  font-size: 16px;
}
</style>