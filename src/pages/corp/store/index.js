/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './mutation-types';
import util from '@/util/user-util';
import * as dict from '@/store/dict';

Vue.use(Vuex);

const api = {
  login: '/mshp/corp/login',
  create: '/mshp/corp/create_user',
  register: '/mshp/corp/register',
  complete: '/corp/complete',
  batch: '/corp/batch',
};

export default new Vuex.Store({
  modules: {
    dict,
  },
  state: {
    step: 0,
    status: '3', // 审核状态: 0-审核通过；1-新申请；2-完善信息；3-审核失败
    userinfo: null,
    loading: false,
    register: {},
    units: [],
  },
  mutations: {
    [types.USER_INFO](state, { userinfo }) {
      state.userinfo = userinfo;
    },
    [types.UNITS_LOADED](state, payload) {
      state.units = payload || [];
    },
    [types.REG_STEP](state, payload) {
      state.step = payload;
    },
    [types.UNIT_CREATED](state, payload) {
      state.units.push(payload);
      state.register = payload;
    },
    [types.UNIT_UPDATED](state, payload) {
      const idx = state.units.findIndex(p => p._id === payload._id);
      if (idx === -1) {
        state.units.push(payload);
      } else {
        state.units.splice(idx, 1, payload);
        state.register = payload;
      }
    },
  },
  actions: {
    async load({ commit, state }) {
      // commit(types.USER_INFO, { userinfo: util.user, token: util.token });
      // if (!state.userinfo) return;
      let res = await this.$axios.$post(api.login);
      if (!res.errcode) {
        const { userinfo, token } = res;
        // 保存用户信息
        util.save({ userinfo, token });
        commit(types.USER_INFO, { userinfo, token });
      }
      const { corpid, units = [] } = state.userinfo;
      if (corpid && units.length > 0) {
        res = await this.$axios.$post(api.batch, { corpid }, { units });
        if (!res.errcode) {
          commit(types.UNITS_LOADED, res);
        }
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
    async register({ commit }, payload) {
      const { corpname, unit } = payload;
      const res = await this.$axios.$post(api.register, { unit }, { corpname });
      if (!res.errcode) {
        const { userinfo, token, newCorp } = res;
        // 保存用户信息
        util.save({ userinfo, token });
        commit(types.USER_INFO, { userinfo, token });
        commit(types.UNIT_CREATED, newCorp);
      }
      return res;
    },
  },
});
