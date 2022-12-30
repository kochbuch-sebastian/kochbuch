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
            <input name="subjectInput" id="subjectInput" cols="40" rows="10"
              v-model="subjectData" />
          </td>
        </tr>
      </table>
      <div>
        <label for="sendAsHtml">Als HTML senden (empfohlen)</label>
        <input type="checkbox" v-model="sendAsHtml" name="sendAsHtml" id="sendAsHtml" />
      </div>
      <div>
        <label for="clearListAfter">Nach erfolgreichem Senden der Email alle Elemente aus der Liste
          entfernen</label>
        <input type="checkbox" v-model="clearListAfter" name="clearListAfter" id="clearListAfter" />
      </div>
      <div>
        <button @click="sendEmail">An angegebene Email-Adresse senden.</button>
      </div>
    </div>
    <div>
      <p class="error" v-if="error">{{ error }}</p>
      <p class="message" v-if="message">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import SendEmail from '../../SendEmail';

export default {
  name: 'SendEmail',
  props: ['content'],
  data() {
    return {
      addressdata: '',
      subjectData: '',

      sendAsHtml: true,

      clearListAfter: true,

      error: '',
      message: '',
    };
  },
  computed: {
    ...mapGetters(['shoppingList']),
  },
  methods: {
    ...mapActions(['clearShoppingList']),
    async sendEmail() {
      console.log(`Send Email ${this.subjectData} to ${this.addressdata}`);

      if (
        this.addressdata.indexOf('@') > -1 &&
        this.addressdata.indexOf('@') + 1 < this.addressdata.lastIndexOf('.')
      ) {
        this.error = '';

        const today = new Date();
        let stringShoppingList = `
                <html>
                  <body>
                    <div>
                      <h1>Ihre Einkaufsliste vom ${today.getDate()}.${today.getMonth()}.${today.getFullYear()}</h1>
                    </div>
                    <div>
                      <table style="margin: 10px;>`;

        if (this.sendAsHtml) {
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
            stringShoppingList += `
              <tr>
                <td>${name}</td>
                <td>${amount}</td>
              </tr>`;
          });

          stringShoppingList += `
                      </table>
                    </div>
                  </body>
                </html>`;

          this.message = 'Wird gesendet...';
          const worked = await SendEmail.sendHTML(
            this.addressdata,
            this.subjectData,
            stringShoppingList,
          );

          if (!worked) {
            this.error = 'Etwas hat nicht funktioniert';
          } else {
            if (this.clearListAfter) {
              this.clearShoppingList(true);
            }
            this.$router.push({ name: 'Home' });
          }
        } else {
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

          this.message = 'Wird gesendet...';
          const worked = await SendEmail.send(
            this.addressdata,
            this.subjectData,
            stringShoppingList,
          );

          if (!worked) {
            this.error = 'Etwas hat nicht funktioniert';
          } else {
            if (this.clearListAfter) {
              this.clearShoppingList(true);
            }
            this.$router.push({ name: 'Home' });
          }
        }
      } else {
        this.error =
          'Keine gültige Email-Adresse eingegeben. Sollte Sie doch gültig sein, bitte senden Sie eine Mail mit dem Betreff "Bug: Email Address" an kochbuch@sthomas.ch. Danke!';
      }
    },
  },
  created() { },
};
</script>

<style scoped>

</style>