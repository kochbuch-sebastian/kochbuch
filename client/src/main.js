import Vue from 'vue';

import VuejsDialog from 'vuejs-dialog';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VuejsDialog);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
