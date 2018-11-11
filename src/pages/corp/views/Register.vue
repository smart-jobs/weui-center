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
  name: 'CreateUser',
  metaInfo: {
    title: '注册企业信息',
  },
  data() {
    return {
      steps: ['第一步：创建企业', '第二步：完善信息', '第三步：等待审核'],
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!vm.userinfo || vm.userinfo.role !== 'corp') {
        vm.$router.replace('/');
      }
      if (to.path === '/register') {
        vm.$router.replace(`/register/step${vm.step + 1}`);
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
