<template>
  <div>
    <table width="100%" style="margin: auto; text-align: center;">
      <tr>
        <td
          id="left_picture"
          v-if="showImages"
          :style="'min-width: fit-content;'"
          :height="imgHeight"
        >
          <img
            :src="'/api/icons/icon/name/' + firstImagePath"
            alt="Ein Kochtopf"
            id="img_kochtopf"
            :height="imgHeight"
          />
        </td>
        <td>
          <h3>Rezepte</h3>
        </td>
        <td v-if="showImages" :style="'min-width: fit-content;'" :height="imgHeight">
          <img
            :src="'/api/icons/icon/name/' + secondImagePath"
            :alt="secondImageAlt"
            id="img_muetze"
            :height="imgHeight"
          />
        </td>
      </tr>
    </table>
    <ul class="browseMenu">
      <li>
        <router-link :to="{name: 'BrowseAppetizers'}" class="router-links">Vorspeisen / Salate</router-link>
      </li>
      <li>
        <router-link :to="{name: 'BrowseHearty'}" class="router-links">Hauptgerichte</router-link>
      </li>
      <li>
        <router-link :to="{name: 'BrowseSweet'}" class="router-links">Desserts / Nachspeisen</router-link>
      </li>
      <li>
        <router-link :to="{name: 'BrowseBread'}" class="router-links">Brote / Brötchen</router-link>
      </li>
      <li>
        <router-link :to="{name: 'BrowseBakery'}" class="router-links">sonstige Backwaren</router-link>
      </li>
    </ul>
    <div>
      <router-view @change-image="changeImage"></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'BrowseRecipes',
  data() {
    return {
      showImages: window.innerWidth > 500,
      imgHeight: window.innerHeight < 600 ? innerHeight / 5 : innerHeight / 7,

      imgKochtopf: document.querySelector('#img_kochtopf')
        ? document.querySelector('#img_kochtopf')
        : null,
      imgMuetze: document.querySelector('#img_muetze')
        ? document.querySelector('#img_muetze')
        : null,

      firstImageAlt: 'Eine Mütze',
      firstImagePath: '0895f35d11c37cad72b0ba6634064842.png',

      secondImageAlt: 'Ein Bild',
      secondImagePath: '',

      secondImageWidth: '',

      initialSecondImagePath: '7a12730c7c8432cef48a6ba59d989dac.png',

      appetizerImagePath: 'e47ca23dddf33f575991be332566c6af.png',
      heartyImagePath: 'cace83d9063c695d8e74966d9dcf9d40.png',
      sweetImagePath: '6263888831f5835eb6bdb03eedf8f68c.png',
      breadImagePath: '59ac19a481baadfc41a4ee8c9ed92c47.png',
      bakeryImagePath: 'cfb9f9d87415f24d38bdea9b666c4da6.png',
    };
  },
  computed: {
    ...mapGetters(['user', 'loggedIn', 'recipes']),
  },
  created() {
    this.secondImagePath = this.initialSecondImagePath;
    this.fetchRecipes();
  },
  methods: {
    ...mapActions(['fetchRecipes']),
    changeImage(name) {
      switch (name) {
        case 'appetizer':
          this.secondImagePath = this.appetizerImagePath;
          break;
        case 'hearty':
          this.secondImagePath = this.heartyImagePath;
          break;
        case 'sweet':
          this.secondImagePath = this.sweetImagePath;
          break;
        case 'bread':
          this.secondImagePath = this.breadImagePath;
          break;
        case 'bakery':
          this.secondImagePath = this.bakeryImagePath;
          break;
      }
    },
  },
};
</script>

<style scoped>
.browseMenu {
  padding: 2rem;
  color: white;
  text-decoration: none;
}

.browseMenu > li {
  list-style: none;
}

td {
  width: 33%;
}
</style>
