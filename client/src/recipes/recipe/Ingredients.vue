<template>
  <div class="container border shadow">
    <div>
      <h4>Zutaten</h4>
      <table>
        <tr>
          <th>Zutat</th>
          <th>Menge</th>
          <th>
            <img src="../../assets/shopping_cart_icon.png" alt="Liste" height="24px" />
          </th>
        </tr>
        <tr v-for="(ingredient, index) in ingredients" :key="index">
          <td>{{ ingredient.name }}</td>
          <td>{{ ingredient.amount }}</td>
          <td>
            <AddToList :showTextField="false" :name="ingredient.name" :amount="ingredient.amount" />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import AddToList from '../../components/shopping/AddToList.vue';

export default {
  name: 'Ingredients',
  props: ['ingredients'],
  components: {
    AddToList,
  },
};
</script>

<style scoped>
td {
  padding: 5px 3px 5px 3px;
  min-width: 100px;
  margin: 0;
}
.container {
  max-width: fit-content;
}
</style>
