<template>
  <div>
    <nav id="nav">
      <table id="navTable">
        <tr>
          <td>
            <router-link to="/" exact class="router-links">Home</router-link>
          </td>
          <td>
            |
            <router-link :to="{ name: 'BrowseRecipes' }" class="router-links">Rezepte</router-link>
          </td>
          <td>
            |
            <router-link :to="{ name: 'About' }" exact class="router-links">About</router-link>
          </td>
          <td v-if="loggedIn">
            |
            <router-link :to="{ name: 'Login' }" class="router-links">Logout</router-link>
          </td>
          <td v-if="!loggedIn">
            |
            <router-link :to="{ name: 'Login' }" class="router-links">Login</router-link>
          </td>
          <td v-if="!loggedIn">
            |
            <router-link :to="{ name: 'Register' }" class="router-links">Registrieren</router-link>
          </td>
          <td>
            <div v-show="this.showSearch" style="margin-top: 0;">
              <input
                id="searchInput"
                class="search"
                type="text"
                name="search"
                placeholder="Suchen.."
                style="
                  float: left;
                  height: 46px;
                  font-size: 14px;
                  margin-left: 2px;
                "
              />
              <button
                id="closeSearchInput"
                @click="closeSearchButtonClicked"
                style="width: 50px; height: 50px;"
              >
                <img
                  id="closeSearchIcon"
                  src="../assets/close_icon.png"
                  alt="Suche Schließen"
                  style="width: 28px; height: 28px;"
                />
              </button>
            </div>
            <button
              class="search"
              @click="searchButtonClicked"
              style="width: 50px; height: 50px;"
              v-show="!this.showSearch"
            >
              <img
                id="searchIcon"
                src="../assets/search_icon.png"
                alt="Suchen"
                style="width: 30px; height: 30px;"
              />
            </button>
          </td>
        </tr>
      </table>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Navbar',

  data() {
    return {
      showSearch: false,
    };
  },
  computed: mapGetters(['user', 'loggedIn']),
  methods: {
    searchButtonClicked() {
      this.showSearch = true;
      document
        .getElementById('searchInput')
        .addEventListener('keydown', event => {
          if (event.which === 13) {
            event.preventDefault();
            const text = document.querySelector('#searchInput').value;
            const textArray = text.split(' ');
            let textSplits = '';

            textArray.forEach(element => {
              textSplits += `${element}+`;
            });
            this.$router.push({
              name: 'SearchRecipes',
              params: { keywords: `${textSplits}` },
            });
            this.$router.go();
          }
        });
    },
    closeSearchButtonClicked() {
      this.showSearch = false;
    },
  },
};
</script>

<style>
</style>