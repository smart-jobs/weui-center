<template>
  <div>
    <form ref="form" class="label-right">
      <div class="weui-cells__title">基本信息</div>
      <div class="weui-cells">
        <code-field label="代码类型" type='corpcode' v-model="form.info.corptype" placeholder="请选择代码类型"
          required :state="state('info.corptype')"></code-field>
        <mt-field label="企业代码" v-model="form.info.corpcode" placeholder="请输入企业代码" required></mt-field>
        <code-field label="企业规模" type="dwgm" mode="pair" v-model="form.info.scale" placeholder="请选择企业规模" required></code-field>
        <code-field label="企业性质" type="dwxz" mode="pair" v-model="form.info.nature" placeholder="请选择企业性质" required></code-field>
        <code-field label="行业类别" type="hylb" mode="pair" v-model="form.info.industry" placeholder="请选择行业类别" required></code-field>
        <code-field label="所在城市" type="xzqh" mode="pair" v-model="form.info.city" placeholder="请选择城市" required></code-field>
        <mt-field label="企业法人" v-model="form.info.legalPerson" placeholder="请输入企业法人" required></mt-field>
        <mt-field label="注册时间" type="date" v-model="form.info.registerTime" placeholder="请选择工商注册时间" required></mt-field>
        <mt-field label="注册资金" v-model="form.info.registerMoney" placeholder="请输入注册资金" required></mt-field>
      </div>

      <div class="weui-cells__title">联系方式</div>
      <div class="weui-cells">
        <mt-field label="联系人" v-model="form.contact.person" placeholder="请输入联系人" required></mt-field>
        <mt-field label="手机" v-model="form.contact.mobile" placeholder="请输入手机" required></mt-field>
        <mt-field label="电话" type="tel" v-model="form.contact.phone" placeholder="请输入联系电话" required></mt-field>
        <mt-field label="邮箱" type="email" v-model="form.contact.email" placeholder="请输入联系邮箱" required></mt-field>
        <mt-field label="网址" type="url" v-model="form.contact.url" placeholder="请输入企业网址"></mt-field>
        <mt-field label="邮编" v-model="form.contact.postcode" placeholder="请输入邮编"></mt-field>
        <mt-field label="地址" type="textarea" v-model="form.contact.address" placeholder="请输入地址"></mt-field>
      </div>

      <div class="weui-cells__title">企业介绍</div>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <textarea class="weui-textarea" placeholder="请输入企业介绍信息" rows="5" v-model="form.description"></textarea>
          </div>
        </div>
      </div>
    </form>
    <div class="weui-msg__opr-area">
      <p class="weui-btn-area">
        <button class="weui-btn weui-btn_primary" @click="onSubmit">下一步</button>
      </p>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapState, mapMutations, mapActions } from 'vuex';
import Validator from 'async-validator';
import { Message } from 'element-ui';
import { MessageBox } from 'mint-ui';
import * as types from '../store/mutation-types';
import CodeField from '@/components/CodeField.vue';

export default {
  name: 'Step2',
  metaInfo: {
    title: '完善企业信息',
  },
  components: {
    CodeField,
  },
  data() {
    return {
      form: {
        info: {},
        contact: {},
        credentials: {},
      },
      errors: {},
      validator: new Validator({
        // 表单验证规则
        info: {
          type: 'object',
          required: true,
          fields: {
            corptype: { type: 'string', required: true, message: '代码类型不能为空' },
            corpcode: { type: 'string', required: true, message: '企业代码不能为空' },
            scale: { type: 'object', required: true, message: '企业规模不能为空' },
            industry: { type: 'object', required: true, message: '行业类别不能为空' },
            city: { type: 'object', required: true, message: '所在城市不能为空' },
            legalPerson: { type: 'string', required: true, message: '企业法人不能为空' },
            registerTime: { type: 'string', required: true, message: '注册时间不能为空' },
            registerMoney: { type: 'string', required: true, message: '注册资金不能为空' },
          },
        },
        contact: {
          type: 'object',
          required: true,
          fields: {
            person: { type: 'string', required: true, message: '联系人不能为空' },
            mobile: { type: 'string', required: true, message: '手机不能为空' },
            phone: { type: 'string', required: true, message: '联系电话不能为空' },
            email: { type: 'string', required: true, message: '邮箱不能为空' },
          },
        },
        description: { type: 'string', required: true, message: '介绍信息不能为空' },
      }),
      state(path) {
        return _.get(this.errors, path);
      },
    };
  },
  methods: {
    ...mapMutations({
      setStep: types.REG_STEP,
    }),
    ...mapActions(['complete']),
    onSubmit() {
      this.validator.validate(this.form, (errors, fields) => {
        if (errors) {
          return this.handleErrors(errors, fields);
        }
        this.handleComplete();
        return true;
      });
    },
    handleErrors(errors, fields) {
      Message.error(errors[0].message);
      this.errors = errors.reduce((p, c) => {
        // eslint-disable-next-line no-param-reassign
        p[c.field] = 'error';
        return p;
      }, {});
      // eslint-disable-next-line no-console
      console.debug(errors, fields);
    },
    async handleComplete() {
      const res = await this.complete(this.form);
      this.$checkRes(res, () => {
        MessageBox.alert('完善企业信息成功').then(() => {
          this.$router.replace('step3');
        });
      });
    },
  },
  computed: {
    ...mapState({ reg: 'register' }),
  },
  // beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //     // eslint-disable-next-line no-underscore-dangle
  //     if (!vm.reg || !vm.reg._id) {
  //       vm.$router.replace('step1');
  //     }
  //   });
  // },
  activated() {
    if (this.reg.status && this.reg.status !== '1') {
      const reg = _.get(this.reg, ['info', 'contact', 'description']);
      this.form = _.merge(this.form, reg);
    }
  },
};
</script>
