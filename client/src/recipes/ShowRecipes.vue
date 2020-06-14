<template>
  <div class="container" width="100%">
    <p class="error" v-if="error">{{ this.error }}</p>
    <div v-show="items.length === 0">Keine Rezepte gefunden!</div>
    <div v-show="items.length !== 0 && showNr">Anzahl Rezepte: {{ items.length }}</div>

    <div v-if="showUnderEachOther">
      <ul
        v-for="(recipe, index) in items"
        v-show="items.length > 0"
        :item="recipe"
        :index="index"
        :key="recipe._id"
      >
        <li>
          <router-link
            id="recipes"
            class="item router-links"
            :to="{ name: 'Recipe', params: { id: recipe._id } }"
          >{{ recipe.title }}</router-link>
        </li>
      </ul>
    </div>

    <div v-if="!showUnderEachOther">
      <router-link
        id="recipes"
        class="item router-links"
        v-for="(recipe, index) in items"
        v-show="items.length > 0"
        :item="recipe"
        :index="index"
        :key="recipe._id"
        :to="{ name: 'Recipe', params: { id: recipe._id } }"
      >{{ recipe.title }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShowRecipes',
  data() {
    return {
      error: '',
    };
  },
  computed: {
    showUnderEachOther() {
      return window.innerWidth < 500;
    },
  },
  props: {
    items: Object,
    showNr: {
      type: Boolean,
      default: true,
    },
  },
  created() {},
};
</script>

<style scoped>
li {
  list-style-type: '- ';
}
ul {
  text-align: left;
  padding: 0;
}
</style>