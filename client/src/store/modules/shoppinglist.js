const state = {
  shoppingList: [],
};

const getters = {
  shoppingList: (state) => state.shoppingList,
};

const actions = {
  addToShoppingList({ commit }, { name, amount }) {
    const included = state.shoppingList.filter(
      (element) => element.name === name,
    );

    if (included.length === 0) {
      const lastId =
        state.shoppingList.length === 0
          ? 0
          : state.shoppingList[state.shoppingList.length - 1].id;
      const newId = lastId + 1;

      commit('addToShoppingList', { id: newId, name, amount });
    } else {
      const newId = included[0].id;
      commit('patchIntoShoppingList', { id: newId, amount: amount });
    }
  },
  async removeIndexFromShoppingList({ commit }, id) {
    commit('removeRecipe', id);
  },
  clearShoppingList({ commit }, total) {
    if (total) commit('clearShoppingList');
    else commit('clearShoppingList');
  },
};

const mutations = {
  addToShoppingList: (state, { id, name, amount }) =>
    state.shoppingList.push({
      id: id,
      name: name,
      amount: amount,
    }),
  patchIntoShoppingList: (state, { id, amount }) => {
    return (state.shoppingList = state.shoppingList.map((element) => {
      if (element.id === id) {
        element.amount = element.amount + '\n' + amount;
      }
      return element;
    }));
  },
  removeIndexFromShoppingList: (state, id) =>
    (state.shoppingList = state.shoppingList.filter(
      (element) => element.id != id,
    )),
  clearShoppingList: (state) =>
    (state.shoppingList = state.shoppingList.filter((element) => {
      if (element) return false;
      else return false;
    })),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
