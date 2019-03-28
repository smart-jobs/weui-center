import Vue from 'vue';
import App from './App.vue';
import '@/plugins/meta';
import '@/plugins/axios';
import '@/plugins/loading';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
