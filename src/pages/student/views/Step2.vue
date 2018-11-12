<template>
  <div>
    <el-steps :active="1" finish-status="success" simple>
      <el-step title="步骤1" ></el-step>
      <el-step title="步骤2" ></el-step>
    </el-steps>
    <div class="weui-form-preview">
      <div class="weui-form-preview__hd">
        <label class="weui-form-preview__label">姓名</label>
        <em class="weui-form-preview__value">{{infobase.xm}}</em>
      </div>
      <div class="weui-form-preview__bd">
        <p>
          <label class="weui-form-preview__label">性别</label>
          <span class="weui-form-preview__value">{{infobase.xb}}</span>
        </p>
        <p>
          <label class="weui-form-preview__label">民族</label>
          <span class="weui-form-preview__value">{{infobase.mz}}</span>
        </p>
        <p>
          <label class="weui-form-preview__label">身份证号</label>
          <span class="weui-form-preview__value">{{infobase.sfzh}}</span>
        </p>
      </div>
    </div>
    <div class="weui-form-preview">
      <div class="weui-form-preview__hd">
        <label class="weui-form-preview__label">院校名称</label>
        <em class="weui-form-preview__value">{{infobase.yxmc}}</em>
      </div>
      <div class="weui-form-preview__bd">
        <p>
          <label class="weui-form-preview__label">专业名称</label>
          <span class="weui-form-preview__value">{{infobase.zymc}}</span>
        </p>
      </div>
      <div class="weui-form-preview__bd">
        <p>
          <label class="weui-form-preview__label">学历</label>
          <span class="weui-form-preview__value">{{infobase.xl}}</span>
        </p>
      </div>
      <div class="weui-form-preview__bd">
        <p>
          <label class="weui-form-preview__label">毕业年份</label>
          <span class="weui-form-preview__value">{{infobase.year}}</span>
        </p>
      </div>
    </div>
    <div class="weui-msg__opr-area">
      <p class="weui-btn-area">
        <button class="weui-btn weui-btn_primary" @click="onSubmit">完成注册</button>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { MessageBox } from 'mint-ui';
import * as types from '../store/mutation-types';

export default {
  name: 'Step2',
  metaInfo: {
    title: '确认学籍信息',
  },
  mounted() {
    this.setStep(1);
  },
  methods: {
    ...mapMutations({
      setStep: types.REG_STEP,
    }),
    async handleNext() {
      const res = await this.register(this.infobase);
      this.$checkRes(res, () => {
        MessageBox.alert('注册学籍信息成功').then(() => {
          this.$router.push('/');
        });
      });
    },
  },
  computed: {
    ...mapState(['infobase']),
  },
};
</script>
