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
            v-if="userinfo && userinfo.role == 'corp'" @click="handleRegister({})">开通学校账号</button>
        </div>
        <div class="weui-panel__bd" v-if="units && units.length>0">
          <div class="weui-media-box weui-media-box_text" v-for="(item,index) in units" :key="'unit_' + index">
            <div class="weui-media-box__title">
              <button class="weui-btn weui-btn_mini weui-btn_plain-primary right"
                v-if="item.status != 0" @click="handleRegister(item)">{{item.status | status}}</button>
              <h4>{{item._tenant | dict(codes['unit'])}}</h4>
            </div>
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
// eslint-disable-next-line object-curly-newline
import { mapState, mapActions, createNamespacedHelpers, mapMutations } from 'vuex';
import { date, dict } from '@/util/filters';
import * as types from '../store/mutation-types';

const { mapState: dictState, mapActions: dictActions } = createNamespacedHelpers('dict');

export default {
  name: 'CorpHome',
  metaInfo: {
    title: '企业用户',
    titleTemplate: null,
  },
  async mounted() {
    // this.load();
    await this.loadDict('unit');
  },
  methods: {
    ...mapActions(['load']),
    ...mapMutations({ setReg: types.REG_INFO }),
    ...dictActions({ loadDict: 'load' }),
    handleCreate() {
      this.$router.push('/create_user');
    },
    handleRegister(reg) {
      this.setReg(reg);
      let step = Number(reg.status || '0');
      if (step > 2) step = 2;
      if (reg.status === '0') step = 3;
      const to = `/register/step${step + 1}`;
      this.$router.push(to);
    },
  },
  computed: {
    ...mapState(['userinfo', 'units', 'register']),
    ...dictState(['codes']),
    username() {
      return (this.userinfo && this.userinfo.name) || '未注册';
    },
    corpname() {
      return (this.userinfo && this.userinfo.corpname) || '未登记企业信息';
    },
  },
  filters: {
    date,
    dict,
    status(value) {
      if (value === '0') return '注册完成';
      if (value === '1') return '未完善信息';
      if (value === '2') return '待审核';
      if (value === '3') return '审核失败';
      return '错误状态';
    },
  },
};
</script>
<style scoped>
.weui-panel__hd>.weui-btn{
  line-height: 1.4;
}
.weui-media-box__title>.weui-btn{
  line-height: 1.6;
}
</style>
