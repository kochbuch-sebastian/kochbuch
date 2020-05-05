<template>
  <div class="container">
    <p class="error" v-if="error">{{ this.error }}</p>

    <h3>Ihre Lieblingsrezepte</h3>

    <ShowRecipes :items="items"></ShowRecipes>
  </div>
</template>

<script>
// TODO: Implement remove from Favorites directly from here (table..?)

import ShowRecipes from '../ShowRecipes.vue';

import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SearchRecipes',
  data() {
    return {
      items: [],
      keywords: '',
      error: '',
    };
  },
  components: {
    ShowRecipes,
  },
  created() {
    if (sessionStorage) {
      if (sessionStorage.username) this.fetchUser(sessionStorage.username);
    }
    if (sessionStorage === null) {
      this.$router.push({ name: 'Login' });
    }
    this.getRequestedItems();
  },
  computed: mapGetters(['user', 'loggedIn', 'recipes']),
  methods: {
    async getRequestedItems() {
      try {
        await this.fetchRecipes();
        this.items = this.recipes.filter(el =>
          this.user.favorites.includes(el._id.toString()),
        );
      } catch (err) {
        this.error = err.message;
      }
    },
    ...mapActions(['fetchRecipes', 'fetchUser']),
  },
  mounted() {
    if (sessionStorage) {
      if (sessionStorage.username) this.fetchUser(sessionStorage.username);
    }
  },
  updated() {
    if (sessionStorage) {
      if (sessionStorage.username) this.fetchUser(sessionStorage.username);
    }
  },
};
</script>

<style scoped>
</style>