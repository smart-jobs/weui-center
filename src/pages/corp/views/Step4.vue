<template>
  <div>
    <div class="weui-msg__opr-area">
      <p class="weui-btn-area">
        <button class="weui-btn weui-btn_default" @click="$router.replace('/')">返回</button>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import * as types from '../store/mutation-types';

export default {
  name: 'Step4',
  metaInfo: {
    title: '注册完成',
  },
  mounted() {
    this.setStep(3);
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
