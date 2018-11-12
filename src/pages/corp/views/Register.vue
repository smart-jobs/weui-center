<template>
  <div class="page">
    <div class="page__hd">
      <h1 class="page__title">注册企业信息</h1>
      <p class="page__desc">{{steps[step]}}</p>
    </div>
    <div class="page__bd">
      <el-steps :active="step" finish-status="success" :process-status="processStatus" simple>
        <el-step title="步骤1" ></el-step>
        <el-step title="步骤2" ></el-step>
        <el-step title="步骤3" ></el-step>
      </el-steps>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Register',
  metaInfo: {
    title: '注册企业信息',
  },
  data() {
    return {
      steps: ['第一步：创建企业', '第二步：完善信息', '第三步：等待审核', '审核通过，企业信息注册完成'],
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!vm.userinfo || vm.userinfo.role !== 'corp') {
        vm.$router.replace('/');
      }
    });
  },
  computed: {
    ...mapState(['step', 'status', 'userinfo']),
    processStatus() {
      return (this.step === 2 && this.status === '3') ? 'error' : 'process';
    },
  },
};
</script>

<style lang="css" scoped>
</style>
