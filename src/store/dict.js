/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
// import * as types from './.dict.js';
import assert from 'assert';
import { LOADED, PRESET } from './.dict';

const api = {
  listItem: catg => `/naf/code/${catg}/list`,
  listUnit: '/naf/unit/list',
};

// initial state
export const state = () => ({
  categories: [], // 字典分类
  items: {// 分项映射表
    status: [
      { code: '0', name: '正常' },
      { code: '1', name: '挂起' },
      { code: '2', name: '注销' },
    ],
    usage: [
      { code: '0', name: '正常' },
      { code: '1', name: '停用' },
    ],
  },
  codes: {// 代码映射表
    status: {
      0: '正常',
      1: '挂起',
      2: '注销',
    },
    usage: {
      0: '正常',
      1: '停用',
    },
  },
});

// actions
export const actions = {
  async load({ state, commit }, payload) {
    assert(payload);

    if (state.items[payload]) {
      return state.items[payload];
    }

    // LOAD PRESET DICT
    if (PRESET[payload]) {
      commit(LOADED, { category: payload, items: PRESET[payload] });
      return PRESET[payload];
    }

    let res;
    if (payload === 'unit') {
      // LOAD UNIT DICT
      res = await this.$axios.$get(`${api.listUnit}`);
    } else {
      // LOAD COMMONS DICT
      res = await this.$axios.$get(`${api.listItem(payload)}`);
    }

    if (!res.errcode) {
      commit(LOADED, { category: payload, items: res });
    }
    return res;
  },

};

// mutations
export const mutations = {
  [LOADED](state, { category, items }) {
    state.items[category] = items;
    state.codes[category] = items.reduce((acc, item) => {
      acc[item.code] = item.name;
      return acc;
    }, {});
  },
};

export const namespaced = true;
