<template>
  <div class="container" style="margin: auto;">
    <table>
      <tr v-if="showTextField" style="width: fit-content;">
        <h4>Zur Liste hinzufügen:</h4>
      </tr>
      <tr v-if="showTextField">
        <div>
          <label for="name">Name:{{ ' ' }}</label>
          <input type="text" v-model="namedata" id="namedata" />
        </div>
      </tr>
      <tr v-if="showTextField">
        <div>
          <label for="name">Menge:{{ ' ' }}</label>
          <input type="text" v-model="amountdata" id="amountdata" v-if="showTextField" />
        </div>
      </tr>
      <tr style="width: 24px;">
        <button @click="addToList" class="addToList">+</button>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AddToList',
  props: ['name', 'amount', 'showTextField'],
  data() {
    return {
      namedata: this.$props.name,
      amountdata: this.$props.amount,
    };
  },
  methods: {
    addToList() {
      const thisamount = this.amountdata;

      const thisname = this.namedata.trim();

      this.addToShoppingList({
        name: thisname,
        amount: thisamount,
      });

      if (this.showTextField) {
        this.namedata = '';
        this.amountdata = '';
      }
    },
    ...mapActions(['addToShoppingList']),
  },
};
</script>

<style scoped>
.addToList {
  background-color: #ccc;
}
.addToList:hover {
  background-color: #999;
}
table {
  margin-left: auto;
  margin-right: auto;
  margin-top: 3%;
}
</style>