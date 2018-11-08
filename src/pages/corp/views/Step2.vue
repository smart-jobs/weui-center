<template>
  <div>
    <div class="page__hd">
      <h1 class="page__title">完善企业信息</h1>
      <p class="page__desc">{{$route.path}}</p>
    </div>
    <div class="weui-msg__opr-area">
      <p class="weui-btn-area">
        <button class="weui-btn weui-btn_primary" @click="$router.push('step3')">下一步</button>
      </p>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapMutations } = createNamespacedHelpers('register');

export default {
  name: 'Step1',
  metaInfo: {
    title: '完善企业信息',
  },
  mounted() {
    this.nextStep(1);
  },
  methods: {
    ...mapMutations(['nextStep']),
  },
  computed: {
    ...mapState(['step', 'status']),
    processStatus() {
      return (this.step === 2 && this.status === '3') ? 'error' : 'process';
    },
  },
};
</script>
