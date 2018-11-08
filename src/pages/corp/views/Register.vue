<template>
  <div class="page">
    <div class="page__hd">
      <h1 class="page__title">注册企业信息</h1>
      <p class="page__desc">第一步：创建企业</p>
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
import { createNamespacedHelpers } from 'vuex';
// eslint-disable-next-line no-unused-vars
const { mapState, mapActions } = createNamespacedHelpers('register');

export default {
  name: 'CreateUser',
  metaInfo: {
    title: '注册企业信息',
  },
  computed: {
    ...mapState(['step', 'status']),
    processStatus() {
      return (this.step === 2 && this.status === '3') ? 'error' : 'process';
    },
  },
};
</script>

<style lang="css" scoped>
</style>
