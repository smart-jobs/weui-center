<template>
  <div class="page">
    <div class="page__hd">
      <h1 class="page__title">注册学籍信息</h1>
      <p class="page__desc">{{steps[step]}}</p>
    </div>
    <div class="page__bd">
      <el-steps :active="step" finish-status="success" simple>
        <el-step title="步骤1" ></el-step>
        <el-step title="步骤2" ></el-step>
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
      steps: ['第一步：查询学籍信息', '第二步：确认学籍，完成注册', '第二步：完善学籍信息'],
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!vm.userinfo || vm.userinfo.role !== 'user') {
        vm.$router.replace('/');
      }
      if (to.path === '/register') {
        vm.$router.replace(`/register/step${vm.step + 1}`);
      }
    });
  },
  computed: {
    ...mapState(['step', 'status', 'userinfo']),
  },
};
</script>

<style lang="css" scoped>
</style>
