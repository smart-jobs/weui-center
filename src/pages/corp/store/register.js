
export const state = () => ({
  step: 0,
  status: '3', // 审核状态: 0-审核通过；1-新申请；2-完善信息；3-审核失败
});

// getters
export const getters = {
};

// actions
export const actions = {

};

// mutations
export const mutations = {
  // eslint-disable-next-line no-shadow
  nextStep(state, payload) {
    // eslint-disable-next-line no-param-reassign
    state.step = payload;
  },
};

export const namespaced = true;
