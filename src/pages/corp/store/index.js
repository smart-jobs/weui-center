import Vue from 'vue';
import Vuex from 'vuex';
import * as register from './register';
import * as user from './user';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    register,
    user,
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
});
