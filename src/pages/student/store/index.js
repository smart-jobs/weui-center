/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import * as types from './mutation-types';
import util from '@/util/user-util';
import * as dict from '@/store/dict';

Vue.use(Vuex);

const api = {
  login: '/mshp/user/login',
  create: '/mshp/user/create',
  register: '/mshp/user/register',
  find: '/user/base/find',
};

export default new Vuex.Store({
  modules: {
    dict,
  },
  state: {
    userinfo: null,
    reginfo: null,
    regform: null,
    infobase: null,
    step: 0,
    loading: false,
  },
  mutations: {
    [types.USER_INFO](state, { userinfo }) {
      state.userinfo = userinfo;
      state.reginfo = userinfo && userinfo.reg;
    },
    [types.REG_UPDATED](state, payload) {
      state.reginfo = payload;
    },
    [types.BASE_LOADED](state, payload) {
      state.infobase = payload;
    },
    [types.REG_STEP](state, payload) {
      state.step = payload;
    },
    [types.REG_FORM](state, payload) {
      state.regform = payload;
    },
  },
  actions: {
    async load({ commit, state }) {
      commit(types.USER_INFO, { userinfo: util.user, token: util.token });
      if (!state.userinfo) return;
      const res = await this.$axios.$post(api.login);
      if (!res.errcode) {
        const { userinfo, token } = res;
        // 保存用户信息
        util.save({ userinfo, token });
      }
    },
    async createUser({ commit }, payload) {
      // eslint-disable-next-line no-console
      const { name, mobile, email, password } = payload;
      const res = await this.$axios.$post(api.create, {}, { name, mobile, email, password });
      if (!res.errcode) {
        const { userinfo, token } = res;
        // 保存用户信息
        util.save({ userinfo, token });
        commit(types.USER_INFO, { userinfo, token });
      }
      return res;
    },
    async register({ commit, state }, payload) {
      const _tenant = _.get(state, 'infobase.yxdm');
      const res = await this.$axios.$post(api.register, { _tenant }, payload);
      if (!res.errcode) {
        const { userinfo, token, newReg } = res;
        // 保存用户信息
        util.save({ userinfo, token });
        commit(types.USER_INFO, { userinfo, token });
        commit(types.REG_UPDATED, newReg);
      }
      return res;
    },
    async findBase({ commit }, { year, sfzh }) {
      const res = await this.$axios.$get(api.find, { year, sfzh });
      if (res && !res.errcode) {
        commit(types.BASE_LOADED, res);
      }
      return res;
    },
  },
});
