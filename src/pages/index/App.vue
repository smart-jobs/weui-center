<template>
  <div id="app">
    <div v-if="guest">
      <div class="page__hd">
        <h1 class="page__title">用户注册</h1>
        <p class="page__desc">选择用户身份</p>
      </div>
      <div class="page__bd">
        <p class="weui-btn-area">
          <a href="student.html" class="weui-btn weui-btn_primary">学生入口</a>
          <a href="corp.html" class="weui-btn weui-btn_primary">企业入口</a>
        </p>
      </div>
    </div>
    <weui-msg type="waiting" title="个人中心" message="正在加载用户信息，请稍候..." v-else />
    <div class="weui-footer weui-footer_fixed-bottom">
      <p class="weui-footer__text">吉林省高校毕业生就业指导中心</p>
      <p class="weui-footer__text">Copyright &copy; 2018-2019</p>
    </div>
  </div>
</template>

<script>
import WeuiMsg from '@/components/WeuiMsg.vue';
import util from '@/util/user-util';

export default {
  components: {
    WeuiMsg,
  },
  name: 'CenterHome',
  metaInfo: {
    title: '个人中心',
  },
  async mounted() {
    const res = await this.$axios.$post('/mshp/login');
    if (!res.errcode) {
      const { userinfo, token } = res;
      // 保存用户信息
      util.save({ userinfo, token });
    }

    if (this.guest) {
      return;
    }
    if (this.user.role === 'corp') {
      // eslint-disable-next-line no-restricted-globals
      location.replace('corp.html');
    } else {
      // eslint-disable-next-line no-restricted-globals
      location.replace('student.html');
    }
  },
  data() {
    return {
      user: util.user,
      guest: util.isGuest,
    };
  },
};
</script>

<style lang="less">
@import '~@/style/common.less';
</style>
