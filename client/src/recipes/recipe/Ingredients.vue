<template>
  <div class="container">
    <div>
      <table>
        <tr>
          <th>Zutat</th>
          <th>Menge</th>
        </tr>
        <tr v-for="(ingredient, index) in ingredients" :key="index">
          <td>{{ ingredient.name }}</td>
          <td>{{ ingredient.amount }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ingredients',
  props: ['ingredients'],
};
</script>

<style scoped>
td {
  padding: 5px 3px 5px 3px;
  min-width: 100px;
  margin: 0;
}
</style>
