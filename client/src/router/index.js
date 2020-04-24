import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import Register from '../components/Register.vue';
import Login from '../components/Login.vue';
import SearchRecipes from '../recipes/SearchRecipes.vue';
import BrowseRecipes from '../recipes/BrowseRecipes.vue';
import ShowFavoriteRecipes from '../recipes/favorites/ShowFavoriteRecipes.vue';
import Recipe from '../recipes/Recipe.vue';
import About from '../about/About.vue';

import BrowseAppetizers from '../recipes/appetizers/Appetizers.vue';
import BrowseHearty from '../recipes/hearty/Hearty.vue';
import BrowseSweet from '../recipes/sweet/Sweet.vue';
import BrowseBakery from '../recipes/bakery/Bakery.vue';
import BrowseBread from '../recipes/bread/Bread.vue';

import EditRecipe from '../recipes/EditRecipe.vue';
import AddRecipe from '../recipes/AddRecipe.vue';

import Backend from '../Backend.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/recipes/search/:keywords?',
    name: 'SearchRecipes',
    component: SearchRecipes,
  },
  {
    path: '/recipes',
    name: 'BrowseRecipes',
    component: BrowseRecipes,
    children: [
      {
        path: '/recipes/appetizers',
        name: 'BrowseAppetizers',
        component: BrowseAppetizers,
      },
      {
        path: '/recipes/hearty',
        name: 'BrowseHearty',
        component: BrowseHearty,
      },
      {
        path: '/recipes/sweet',
        name: 'BrowseSweet',
        component: BrowseSweet,
      },
      {
        path: '/recipes/bread',
        name: 'BrowseBread',
        component: BrowseBread,
      },
      {
        path: '/recipes/bakery',
        name: 'BrowseBakery',
        component: BrowseBakery,
      },
    ],
  },
  {
    path: '/recipes/favorites',
    name: 'FavoriteRecipes',
    component: ShowFavoriteRecipes,
  },
  {
    path: '/recipes/add',
    name: 'AddRecipe',
    component: AddRecipe,
  },
  {
    path: '/recipes/edit/:id',
    name: 'EditRecipe',
    component: EditRecipe,
  },
  {
    path: '/recipes/:id',
    name: 'Recipe',
    component: Recipe,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/backend',
    name: 'Backend',
    component: Backend,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (from.name !== null) {
    document.documentElement.style.setProperty('--color1', '008, 126, 126, 1');
    document.documentElement.style.setProperty('--color2', '102, 228, 228, 1');
    document.documentElement.style.setProperty('--textColor', '#2c3e50');
  }

  next();
});

export default router;
