<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',
  metaInfo: {
    title: '学生用户',
    titleTemplate: '学生用户 - %s',
  },
  mounted() {
    this.load();
  },
  methods: {
    ...mapActions(['load']),
  },
};
</script>

<style lang="less">
@import '~@/style/common.less';

.weui-loadmore {
  position: absolute;
  top: 40%;
  width: 100%;
}
</style>
