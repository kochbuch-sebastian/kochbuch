<template>
  <div class="container">
    <div>
      <table style="margin: auto;">
        <tr>
          <td>
            <label for="addressInput">Email-Adresse:</label>
          </td>
          <td>
            <input type="text" v-model="addressdata" id="addressInput" />
          </td>
        </tr>
        <tr>
          <td>
            <label for="subjectInput">Betreff:</label>
          </td>
          <td>
            <input name="subjectInput" id="subjectInput" cols="40" rows="10" v-model="subjectData" />
          </td>
        </tr>
      </table>
      <button @click="sendEmail">An angegebene Email-Adresse senden.</button>
    </div>
    <div>
      <p class="error" v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import SendEmail from '../../SendEmail';

export default {
  name: 'SendEmail',
  props: ['content'],
  data() {
    return {
      addressdata: '',
      subjectData: '',

      error: '',
    };
  },
  computed: {
    ...mapGetters(['shoppingList']),
  },
  methods: {
    async sendEmail() {
      console.log(`Send Email ${this.subjectData} to ${this.addressdata}`);

      if (
        this.addressdata.indexOf('@') > -1 &&
        this.addressdata.indexOf('@') + 1 < this.addressdata.lastIndexOf('.')
      ) {
        this.error = '';

        let stringShoppingList = '';

        this.shoppingList.forEach(object => {
          let name = '';
          let amount = '';
          for (let [key, value] of Object.entries(object)) {
            if (key === 'amount') {
              amount = value.replace(/\n/g, ' + ');
            } else if (key === 'name') {
              name = value;
            }
          }
          stringShoppingList += `\n ${name}: \t ${amount}`;
        });

        const worked = await SendEmail.send(
          this.addressdata,
          this.subjectData,
          stringShoppingList,
        );

        if (!worked) {
          this.error = 'Etwas hat nicht funktioniert';
        }
      } else {
        this.error =
          'Keine gültige Email-Adresse eingegeben. Sollte Sie doch gültig sein, bitte senden Sie eine Mail mit dem Betreff "Bug: Email Address" an kochbuch-sebastian@web.de. Danke!';
      }
    },
  },
  created() {},
};
</script>

<style scoped>
</style>