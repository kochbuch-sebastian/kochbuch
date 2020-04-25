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
    return new Promise((resolve, reject) => {
      if (username === '') {
        commit('setUser', null);
        resolve(null);
      } else {
        UserService.getUserByUsername(username)
          .then((gotUser) => {
            commit('setUser', gotUser[0]);
            resolve(gotUser[0]);
          })
          .catch((err) => reject(err));
      }
    });
  },
  logout({ commit }) {
    commit('setUser', null);
  },
  fetchUser({ commit }, username) {
    return new Promise((resolve, reject) => {
      if (username === '') {
        commit('setUser', null);
        resolve(null);
      } else {
        UserService.getUserByUsername(username)
          .then((gotUser) => {
            commit('setUser', gotUser[0]);
            resolve(gotUser[0]);
          })
          .catch((err) => reject(err));
      }
    });
  },
};

const mutations = {
  setUser: (state, user) => {
    if (user === null) {
      state.user = null;
      state.loggedIn = false;
      sessionStorage.username = '';
      sessionStorage.user = null;
    } else {
      state.user = user;
      state.loggedIn = true;
      sessionStorage.username = state.user.username;
      sessionStorage.user = state.user;
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
