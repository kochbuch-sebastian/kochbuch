<template>
  <div id="app">
    <Navbar />
    <div>
      <h1 id="title">Sebastians Kochbuch</h1>
    </div>
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

import { mapActions } from 'vuex';

export default {
  name: 'app',

  components: {
    Navbar,
  },
  mounted() {
    // this.fetchRecipes();
    if (sessionStorage) {
      if (sessionStorage.username) this.fetchUser(sessionStorage.username);
    }
  },
  updated() {
    if (sessionStorage) {
      if (sessionStorage.username) this.fetchUser(sessionStorage.username);
    }
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(['fetchRecipes', 'fetchUser']),
  },
};
</script>

<style>
:root {
  --color1: 8, 126, 126, 1;
  --color2: 102, 228, 228, 1;
  --textColor: #2c3e50;
  --navTextColor: #2c3e50;
}
* {
  margin: 2px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
html {
  margin: 0;
  background: linear-gradient(
    to bottom,
    rgba(var(--color1)),
    rgba(var(--color2))
  );
  min-height: fit-content;
  min-height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--textColor);
}

/* Headers */
h1 {
  text-decoration: underline solid var(--textColor);
  font-size: 3rem;
  text-align: center;
  margin: 1rem;
  text-shadow: 3px 3px 5px black;
}
h3 {
  text-decoration: underline solid var(--textColor);
  margin: 10px 0 10px 0;
  font-size: 2.2rem;
}
h4 {
  text-decoration: underline solid var(--textColor);
  margin-bottom: 10px;
  font-size: 1.4rem;
}

/* Navigation */
#nav {
  margin: 0.5rem 2rem 0.5rem 2rem;
  align-content: center;
  background-color: #aaaaaa;
  border: 3px solid var(--navTextColor);
  box-shadow: 3px 3px 20px black;
}
#navTable {
  margin: 0 auto;
}
#nav a:hover {
  color: #088e8e;
}

/* Router-links */
.router-links {
  color: var(--navTextColor);
  font-weight: bold;
  min-height: 25px;
  margin: 10px;
}
.router-link-active,
.router-link-exact-active {
  color: #666666;
}

/* Search in navigation-bar */
.search {
  position: static;
  float: right;
  top: 3rem;
  border: 2px solid #555555;
  margin: 0;
  padding: 0;
}
#searchInput {
  width: 10rem;
  height: 1rem;
  margin: 0;
  padding-left: 4px;
}
#closeSearchInput {
  position: static;
  float: right;
  top: 3rem;
  border: 2px solid #555555;
  margin: 0;
  padding: 0;
}
img {
  padding: 0;
  margin: 0;
}
.border {
  border: 2px solid #000000;
}
.shadow {
  box-shadow: 8px 5px 5px #444444;
}

/* Errors */
.error {
  color: red;
}

/* When noMargin class is added */
.noMargin {
  margin: 0;
  padding: 0;
}
.noMarginExceptRight {
  margin: 0 4px 0 0;
}

/* Fat horizontal lines */
.fatHr {
  height: 0.5px;
  background-color: #000000;
}

#img_kochtopf {
  top: 7.5%;
  left: 7%;
}
#img_muetze {
  top: 7.5%;
  right: 7%;
}

/* General margins etc.  */
p {
  margin: 0.75rem;
}

a {
  margin: 0.75rem;
}

li {
  margin: 0.4rem;
}

div {
  margin: 0.5rem;
}

pre {
  white-space: pre-wrap;
}

/* Make cursor on buttons to pointer (Hand) */
button:hover {
  cursor: pointer;
  text-align: center;
}
</style>
