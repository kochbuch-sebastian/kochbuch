<template>
  <div class="container">
    <h3>Bild uploaden</h3>

    <form enctype="multipart/form-data" @submit.prevent="submitFile" v-if="loggedIn">
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
    <div v-if="loggedIn">
      <p>Sie sind nicht eingeloggt; loggen Sie sich ein; dann können Sie ein Bild hochladen.</p>
    </div>
    <p class="message">{{ message }}</p>

    <!--<form enctype="multipart/form-data">
      <div>
        <label for="file"></label>
        <input type="file" name="file" id="file" />
      </div>
      <div>
        <button @click="submitFile">Fertig</button>
      </div>
    </form>-->

    <!--<table style="margin: 0 auto;">
      <tr>
        <td>
          <label for="file">Bild finden</label>
        </td>
        <td>
          <input type="file" name="file" id="file" />
        </td>
      </tr>

      <tr>
        <td>
          <label for="recipeTitle">Betreffendes Rezept</label>
        </td>
        <td>
          <input type="text" id="recipeTitle" v-model="recipeTitle" />
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <button @click="submitFile">Fertig</button>
        </td>
      </tr>
    </table>-->
  </div>
</template>

<script>
import ImageService from '../ImageService';

import { mapGetters } from 'vuex';

export default {
  name: 'UploadPicture',
  data() {
    return {
      image: null,
      error: '',
      message: '',
    };
  },
  computed: { ...mapGetters(['loggedIn']) },
  methods: {
    async submitFile() {
      this.message = 'Bitte kurz warten, das Bild wird gerade hochgeladen. ';

      this.image = this.$refs.file.files[0];

      await ImageService.addPicture(this.$route.params.recipeId, this.image);
      this.$router.push({ name: 'Home' });
    },
  },
};
</script>

<style scoped>
</style>
