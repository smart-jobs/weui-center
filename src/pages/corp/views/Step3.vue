<template>
  <div class="weui-msg">
    <div class="weui-msg__icon-area">
      <i class="weui-icon-waiting weui-icon_msg"/>
    </div>
    <div class="weui-msg__text-area">
      <h2 class="weui-msg__title"><slot name="title">待审核</slot></h2>
      <p class="weui-msg__desc"><slot name="desc">信息已提交，等待管理员审核</slot></p>
    </div>
    <div class="weui-msg__opr-area">
      <p class="weui-btn-area">
        <button class="weui-btn weui-btn_default" @click="$router.push('step2')"
          v-if="register && register.status == '2'">上一步</button>
        <button class="weui-btn weui-btn_primary" @click="$router.replace('/')">完成</button>
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
    ...mapState(['step', 'register']),
  },
};
</script>
