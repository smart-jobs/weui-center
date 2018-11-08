<template>
  <div>
    <div class="page__hd">
      <h1 class="page__title">等待审核结果</h1>
      <p class="page__desc">{{$route.path}}</p>
    </div>
    <div class="weui-msg__opr-area">
      <p class="weui-btn-area">
        <button class="weui-btn weui-btn_default" @click="$router.push('step2')"
          v-if="status == '3'">上一步</button>
        <button class="weui-btn weui-btn_primary" v-else>完成</button>
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
    title: '等待审核结果',
  },
  mounted() {
    this.nextStep(2);
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
