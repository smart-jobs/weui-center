<template>
  <div class="page">
    <div class="page__hd">
      <h1 class="page__title">学生用户 - {{username}}</h1>
      <button class="weui-btn weui-btn_mini weui-btn_primary right"
        v-if="!userinfo || userinfo.role == 'guest'" @click="handleCreate">立即注册</button>
      <p class="page__desc" v-text="yxmc">未注册学籍信息</p>
    </div>
    <div class="page__bd">
      <div class="weui-panel">
        <div class="weui-panel__hd">
          <span>我的学籍</span>
          <button class="weui-btn weui-btn_mini weui-btn_plain-default right"
            v-if="userinfo && userinfo.role == 'user'" @click="handleRegister">注册学籍信息</button>
        </div>
        <div class="weui-panel__bd" v-if="info">
          <div class="weui-media-box weui-media-box_text">
            <h4 class="weui-media-box__title">{{info.yxmc}}</h4>
            <p class="weui-media-box__desc">
              {{info.zymc}} [{{info.xl}}]
            </p>
            <ul class="weui-media-box__info">
              <li class="weui-media-box__info__meta">毕业年份：{{reginfo.year}}</li>
              <li class="weui-media-box__info__meta weui-media-box__info__meta_extra">注册时间：{{reginfo.meta.createdAt | date('YYYY-MM-DD') }}</li>
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
import { mapState } from 'vuex';
import _ from 'lodash';
import { date, dict } from '@/util/filters';

export default {
  name: 'StudentHome',
  metaInfo: {
    title: '学生用户',
    titleTemplate: null,
  },
  methods: {
    handleCreate() {
      this.$router.push('/create');
    },
    handleRegister() {
      this.$router.push('/register');
    },
  },
  computed: {
    ...mapState(['userinfo', 'reginfo']),
    username() {
      return (this.userinfo && this.userinfo.name) || '未注册';
    },
    yxmc() {
      return (this.reginfo && _.get(this.reginfo, 'info.yxmc')) || '未注册学籍信息';
    },
    info() {
      return this.reginfo && this.reginfo.info;
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
