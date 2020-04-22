import ItemService from '../../ItemService';

const state = {
  recipes: [],
};

const getters = {
  recipes: (state) => state.recipes,
};

const actions = {
  async fetchRecipes({ commit }) {
    const response = await ItemService.getItems();

    commit('setRecipes', response);
  },
  async deleteRecipe({ commit }, params) {
    await ItemService.deleteItem(params.id, params.username);

    commit('removeRecipe', params.id);
  },
};

const mutations = {
  setRecipes: (state, recipes) => (state.recipes = recipes),
  removeRecipe: (state, id) =>
    (state.recipes = state.recipes.filter((recipe) => recipe.id != id)),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
