const state = {
  username: '',
  loggedIn: false,
};

const getters = {
  username: (state) => state.username,
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
  setUsername: (state, username) => (state.username = username),
  setLoggedIn: (state, loggedIn) => (state.loggedIn = loggedIn),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
