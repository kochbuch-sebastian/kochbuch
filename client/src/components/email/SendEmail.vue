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
        <tr v-show="!contentGiven">
          <td>
            <label for="contentInput">Inhalt:</label>
          </td>
          <td>
            <textarea
              name="contentInput"
              id="contentInput"
              cols="40"
              rows="10"
              v-model="contentdata"
            ></textarea>
          </td>
        </tr>
      </table>
      <button @click="sendEmail">An angegebene Email-Adresse senden.</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SendEmail',
  props: ['content'],
  data() {
    return {
      addressdata: '',
      contentdata: this.$props.content ? this.$props.content : '',
      contentGiven: this.$props.content ? true : false,
    };
  },
  methods: {
    sendEmail() {
      console.log('Send Email');
      console.log(`${this.contentdata}`);
    },
  },
  created() {},
};
</script>

<style scoped>
</style>