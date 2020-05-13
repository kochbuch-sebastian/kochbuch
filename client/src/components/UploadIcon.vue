<template>
  <div class="container">
    <h3>Icon uploaden</h3>

    <form enctype="multipart/form-data" @submit.prevent="submitFile">
      <table>
        <tr>
          <td>
            <label for="file">Datei auswählen</label>
          </td>
          <td>
            <input type="file" ref="file" />
          </td>
        </tr>
        <tr>
          <td></td>

          <td>
            <button type="submit">Bestätigen</button>
          </td>
        </tr>
      </table>
    </form>
    <p class="message">{{ message }}</p>
  </div>
</template>

<script>
import IconService from '../IconService';

export default {
  name: 'UploadIcon',
  data() {
    return {
      image: null,
      error: '',
      message: '',
    };
  },
  methods: {
    async submitFile() {
      this.message = 'Bitte kurz warten, das Bild wird gerade hochgeladen. ';

      this.image = this.$refs.file.files[0];

      await IconService.addPicture(this.image);
      this.$router.push({ name: 'Home' });
    },
  },
};
</script>

<style scoped>
</style>
