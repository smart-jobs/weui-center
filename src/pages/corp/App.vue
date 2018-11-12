<template>
  <div id="app">
    <div class="weui-loadmore" v-if="loading">
      <i class="weui-loading"></i>
      <span class="weui-loadmore__tips">正在加载</span>
    </div>
    <router-view v-else/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  metaInfo: {
    title: '企业用户',
    titleTemplate: '企业用户 - %s',
  },
  mounted() {
    this.load();
  },
  computed: {
    ...mapState(['loading']),
  },
  methods: {
    ...mapActions(['load']),
  },
};
</script>

<style lang="less">
@import '~@/style/common.less';
</style>
<style scoped>
.weui-loadmore {
  position: absolute;
  top: 40%;
  width: 100%;
}
</style>
