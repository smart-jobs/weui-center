<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  metaInfo: {
    title: '学生用户',
    titleTemplate: '学生用户 - %s',
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
