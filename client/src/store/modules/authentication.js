import UserService from '../../UserService';

const state = {
  user: null,
  loggedIn: false,
};

const getters = {
  user: (state) => state.user,
  loggedIn: (state) => state.loggedIn,
};

const actions = {
  login({ commit }, username) {
    commit('setUsername', username);
    commit('setLoggedIn', true);
  },
  logout({ commit }) {
    commit('setUsername', '');
    commit('setLoggedIn', false);
  },
};

const mutations = {
  setUsername: async (state, username) => {
    if (username === '') {
      state.user = null;
    } else {
      const gotUser = await UserService.getUserByUsername(username);
      state.user = gotUser[0];
    }
  },
  setLoggedIn: (state, loggedIn) => (state.loggedIn = loggedIn),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
