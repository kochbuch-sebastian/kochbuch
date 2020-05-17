<template>
  <div class="container">
    <table style="margin: 0 auto;">
      <tr>
        <th>Zutat</th>
        <th>Menge</th>
      </tr>
      <tr v-for="(ingredient, index) in myShoppingList" :key="index">
        <td>{{ ingredient.name }}</td>
        <td>
          <pre>{{ ingredient.amount }}</pre>
        </td>
      </tr>
      <tr v-if="myShoppingList.length === 0">
        <td>Keine Zutaten in</td>
        <td>die Liste hinzugefügt</td>
      </tr>
    </table>

    <div class="email">
      <router-link :to="{name: 'SendList'}" class="router-links">Als Email versenden</router-link>
    </div>

    <AddToList :showTextField="true" />
  </div>
</template>

<script>
import AddToList from './AddToList.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ShoppingList',
  data() {
    return {
      myShoppingList: [],
    };
  },
  created() {
    this.myShoppingList = this.shoppingList;
  },
  components: {
    AddToList,
  },
  computed: {
    ...mapGetters(['shoppingList']),
  },
  methods: {
    ...mapActions(['removeIndexFromShoppingList']),
    sendEmail() {
      console.log('Send Email');
    },
  },
};
</script>

<style scoped>
</style>