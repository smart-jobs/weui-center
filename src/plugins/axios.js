/* eslint-disable no-console */
/* eslint-disable no-param-reassign */

import Vue from 'vue';
import AxiosWrapper from '@/util/axios-wrapper';
// import { pluginOptions } from '../../vue.config';

const Plugin = {

  install(vue, options) {
    // 3. 注入组件
    vue.mixin({
      created() {
        if (this.$store && !this.$store.$axios) {
          this.$store.$axios = this.$axios;
        }
      },
    });
    // 4. 添加实例方法
    vue.prototype.$axios = new AxiosWrapper(options);
  },

};

Vue.use(Plugin, { baseUrl: '/weixin/api' });
