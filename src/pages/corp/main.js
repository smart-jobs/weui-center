import Vue from 'vue';
import { Steps, Step } from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/plugins/meta';

// 注册element-ui组件
Vue.use(Steps);
Vue.use(Step);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
