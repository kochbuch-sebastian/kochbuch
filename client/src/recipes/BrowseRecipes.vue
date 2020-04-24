<template>
  <div>
    <h3>Rezepte</h3>
    <ul class="browseMenu">
      <li>
        <router-link :to="{name: 'BrowseAppetizers'}" class="router-links">Vorspeisen / Salate</router-link>
      </li>
      <li>
        <router-link :to="{name: 'BrowseHearty'}" class="router-links">Hauptgerichte</router-link>
      </li>
      <li>
        <router-link :to="{name: 'BrowseSweet'}" class="router-links">Desserts / Nachspeisen</router-link>
      </li>
      <li>
        <router-link :to="{name: 'BrowseBread'}" class="router-links">Brote / Brötchen</router-link>
      </li>
      <li>
        <router-link :to="{name: 'BrowseBakery'}" class="router-links">sonstige Backwaren</router-link>
      </li>
    </ul>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'BrowseRecipes',
  computed: mapGetters(['user', 'loggedIn', 'recipes']),
  created() {
    // this.getAllItems();
    this.fetchRecipes();
  },
  methods: {
    ...mapActions(['fetchRecipes']),
  },
};
</script>

<style scoped>
.browseMenu {
  padding: 2rem;
  color: white;
  text-decoration: none;
}
</style>
