<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  metaInfo: {
    title: '企业用户',
    titleTemplate: '企业用户 - %s',
  },
};
</script>

<style lang="less">
@import '~@/style/common.less';
</style>
