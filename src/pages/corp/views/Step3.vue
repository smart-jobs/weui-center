<template>
  <div>
    <div class="page__hd">
      <h1 class="page__title">等待审核结果</h1>
      <p class="page__desc">{{$route.path}}</p>
    </div>
    <div class="weui-msg__opr-area">
      <p class="weui-btn-area">
        <button class="weui-btn weui-btn_default" @click="$router.push('step2')"
          v-if="$router.replace('step2')">上一步</button>
        <button class="weui-btn weui-btn_primary" v-else>完成</button>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import * as types from '../store/mutation-types';

export default {
  name: 'Step3',
  metaInfo: {
    title: '等待审核结果',
  },
  methods: {
    ...mapMutations({
      setStep: types.REG_STEP,
    }),
  },
  computed: {
    ...mapState(['step', 'status']),
  },
};
</script>
