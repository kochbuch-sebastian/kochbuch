<template>
  <div>
    <nav id="nav" :style="!showNavLinks ? 'height: 45px;': ''">
      <table id="navTable">
        <tr v-if="showNavLinks">
          <td v-for="(item, index) in navLinks" :key="index">
            <span v-if="item.vif">
              <router-link
                :to="{ name: item.name }"
                class="router-links"
                style="margin-left: 0rem;"
                exact
              >{{ item.text }}</router-link>
            </span>
            <span v-if="showPipe(item, index)">|</span>
            <span v-if="showMargin(item, index)"></span>
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
                class="button-class"
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
              class="search button-class"
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

      <div class="menu-wrap" v-if="!showNavLinks">
        <input type="checkbox" class="toggler" />
        <div class="hamburger">
          <div></div>
        </div>
        <div class="menu">
          <div>
            <div>
              <ul class="navItem">
                <li v-for="(item, index) in navLinks" :key="index">
                  <span v-if="item.vif" @click="closeNav()">
                    <router-link
                      :to="{ name: item.name }"
                      class="router-links"
                      style="margin-left: 0rem;"
                      exact
                    >{{ item.text }}</router-link>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
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
  computed: {
    ...mapGetters(['user', 'loggedIn']),
    showNavLinks() {
      return window.innerWidth > 700;
    },

    navLinks() {
      return [
        {
          vif: true,
          name: 'Home',
          text: 'Home',
        },
        {
          vif: true,
          name: 'BrowseRecipes',
          text: 'Rezepte',
        },
        {
          vif: true,
          name: 'About',
          text: 'Über mich',
        },
        {
          vif: this.loggedIn,
          name: 'FavoriteRecipes',
          text: 'Favoriten',
        },
        {
          vif: this.loggedIn,
          name: 'Login',
          text: 'Logout',
        },
        {
          vif: !this.loggedIn,
          name: 'Login',
          text: 'Login',
        },
        {
          vif: !this.loggedIn,
          name: 'Register',
          text: 'Registrieren',
        },
      ];
    },
  },
  methods: {
    showPipe(item, index) {
      const itemVif = item.vif;

      let nextLinkVif = false;

      if (this.navLinks[index + 1]) {
        nextLinkVif = this.navLinks[index + 1].vif;
      }

      return itemVif && nextLinkVif;
    },
    showMargin(item, index) {
      if (typeof this.navLinks[index + 1] !== 'undefined') {
        return this.navLinks[index + 1].name === 'Login';
      } else {
        return false;
      }
    },
    closeNav() {
      document.querySelectorAll('.toggler')[0].checked = false;
    },

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

<style scoped>
:root {
  --primary-color: rgba(0, 0, 0, 0.5);
  --overlay-color: rgba(23, 59, 88, 0.85);
  --menu-speed: 1s;
}

body {
  position: relative;
}

.menu-wrap {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}

/* Toggle menu (checkbox) */
.menu-wrap .toggler {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  cursor: pointer;
  width: 50px;
  height: 50px;
  opacity: 0;
}

/* Hamburger div */
.menu-wrap .hamburger {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 50px;
  height: 0px;
  padding: 1rem;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Middle line of hamburger */
.menu-wrap .hamburger > div {
  position: relative;
  width: 100%;
  height: 2px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s ease;
}

/* Top and bottom lines of hamburger */
.menu-wrap .hamburger > div:before {
  content: '';
  position: absolute;
  z-index: 1;
  top: -10px;
  width: 100%;
  height: 2px;
  background: inherit;
}
.menu-wrap .hamburger > div:after {
  content: '';
  position: absolute;
  z-index: 1;
  top: 10px;
  width: 100%;
  height: 2px;
  background: inherit;
}

/* Toggler animate */
.menu-wrap .toggler:checked + .hamburger > div {
  transform: rotate(135deg);
}

/* Turn lines into X */
.menu-wrap .toggler:checked + .hamburger > div:before,
.menu-wrap .toggler:checked + .hamburger > div:after {
  top: 0;
  transform: rotate(90deg);
}

/* Rotate on hover when checked TODO: not working */
.menu-wrap .toggler:checked:hover + .hamburger > div {
  transform: rotate(225deg);
}

/* Show menu */
.menu-wrap .toggler:checked ~ .menu {
  visibility: visible;
}

.menu-wrap .toggler:checked ~ .menu > div {
  transform: scale(1);
  transition-duration: 0.75s;
}

.menu-wrap .toggler:checked ~ .menu > div > div {
  opacity: 1;
}

/* Set whole menu to the middle */
.menu-wrap .menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  visibility: hidden;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-wrap .menu > div {
  background: rgba(200, 200, 200, 0.95);
  border-radius: 50%;
  width: 300vw; /* vw = viewport width */
  height: 300vw;
  display: flex;
  flex: none;
  align-items: center;
  justify-content: center;
  transform: scale(0);
  transition: all 0.4s ease;
}

.menu-wrap .menu > div > div {
  text-align: center;
  max-width: 90vw;
  max-height: 100vh;
  opacity: 0;
  transition: all 0.4s ease;
}

.menu-wrap .menu > div > div > ul > li {
  list-style: none;
}

.menu-wrap .menu > div > div > ul > li > router-link {
  transition: color 0.4s ease;
}
</style>