/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './mutation-types';

Vue.use(Vuex);

const api = {
  login: '/mshp/login',
};

export default new Vuex.Store({
  state: {
    step: 0,
    status: '3', // 审核状态: 0-审核通过；1-新申请；2-完善信息；3-审核失败
    userinfo: null,
    token: null,
  },
  mutations: {
    [types.default](state, { userinfo, token }) {
      state.userinfo = userinfo;
      state.token = token;
      sessionStorage.setItem('user', userinfo);
      sessionStorage.setItem('token', token);
    },
    [types.REG_STEP](state, payload) {
      state.step = payload;
    },
  },
  actions: {
    async load({ commit }) {
      const res = await this.$axios.$post(api.login);
      if (!res.errcode) {
        const { userinfo, token } = res;
        commit(types.default, { userinfo, token });
      }
      return res;
    },
  },
});
