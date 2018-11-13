<template>
  <div class="page">
    <div class="page__hd">
      <h1 class="page__title">企业用户 - {{username}}</h1>
      <button class="weui-btn weui-btn_mini weui-btn_primary right"
        v-if="!userinfo || userinfo.role == 'guest'" @click="handleCreate">立即注册</button>
      <p class="page__desc" v-text="corpname">未注册企业信息</p>
    </div>
    <div class="page__bd">
      <div class="weui-panel">
        <div class="weui-panel__hd">
          <span>学校分站列表</span>
          <button class="weui-btn weui-btn_mini weui-btn_plain-default right"
            v-if="userinfo && userinfo.role == 'corp'" @click="handleRegister">开通学校账号</button>
        </div>
        <div class="weui-panel__bd" v-if="units && units.length>0">
          <div class="weui-media-box weui-media-box_text" v-for="(item,index) in units" :key="'unit_' + index">
            <h4 class="weui-media-box__title">{{item._tenant | dict(codes['unit'])}}</h4>
            <ul class="weui-media-box__info">
              <li class="weui-media-box__info__meta">学校代码：{{item._tenant}}</li>
              <li class="weui-media-box__info__meta weui-media-box__info__meta_extra">注册时间：{{item.meta.createdAt | date('YYYY-MM-DD') }}</li>
            </ul>
          </div>
        </div>
        <div class="weui-loadmore weui-loadmore_line" v-else>
          <span class="weui-loadmore__tips">暂无数据</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, createNamespacedHelpers } from 'vuex';
import { date, dict } from '@/util/filters';

const { mapState: dictState, mapActions: dictActions } = createNamespacedHelpers('dict');

export default {
  name: 'CorpHome',
  metaInfo: {
    title: '企业用户',
    titleTemplate: null,
  },
  mounted() {
    // this.load();
    this.loadDict('unit');
  },
  methods: {
    ...mapActions(['load']),
    ...dictActions({ loadDict: 'load' }),
    handleCreate() {
      this.$router.push('/create_user');
    },
    handleRegister() {
      this.$router.push('/register');
    },
  },
  computed: {
    ...mapState(['userinfo', 'units']),
    ...dictState(['codes']),
    username() {
      return (this.userinfo && this.userinfo.name) || '未注册';
    },
    corpname() {
      return (this.userinfo && this.userinfo.corpname) || '未登记企业信息';
    },
  },
  filters: {
    date, dict,
  },
};
</script>
<style scoped>
.weui-panel__hd>.weui-btn {
  line-height: 1.4;
}
</style>
