import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/plugins/meta';
import '@/plugins/element';
import '@/plugins/mint-ui';
import '@/plugins/axios';
import '@/plugins/check-res';
import '@/plugins/loading';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
