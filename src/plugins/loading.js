/* eslint-disable no-console */
/* eslint-disable no-param-reassign */

import Vue from 'vue';

const Plugin = {

  // eslint-disable-next-line no-unused-vars
  install(vue, options) {
    // 3. 注入组件
    vue.mixin({
      created() {
        const isRoot = this.constructor === Vue;
        if (isRoot) {
          const el = document.getElementById('loading');
          if (el) el.style.display = 'none';
        }
      },
    });
  },

};

Vue.use(Plugin, { baseUrl: process.env.VUE_APP_AXIOS_BASE_URL });
