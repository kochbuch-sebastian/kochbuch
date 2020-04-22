import Vue from 'vue';
import Vuex from 'vuex';

import authentication from './modules/authentication';
import recipes from './modules/recipes';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    authentication,
    recipes,
  },
});
