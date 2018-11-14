<template>
  <div class="page">
    <div class="page__hd">
      <h1 class="page__title">企业用户注册</h1>
      <p class="page__desc">为企业管理员注册通行证</p>
    </div>
    <form ref="form" class="label-right">
      <mt-field label="姓名" placeholder="请输入企业管理员姓名" v-model="form.name" required
        :state="errors.name"></mt-field>
      <mt-field label="手机号" placeholder="请输入手机号" type="number" v-model="form.mobile" required
        :state="errors.mobile"></mt-field>
      <mt-field label="邮箱" placeholder="请输入邮箱地址" type="email" v-model="form.email" required
        :state="errors.email"></mt-field>
      <!-- <mt-field label="密码" placeholder="请输入安全密码" type="password" v-model="form.password" required
        :state="errors.password"></mt-field>
      <mt-field label="确认" placeholder="请重新输入密码" type="password" v-model="form.confirm" required
        :state="errors.confirm"></mt-field> -->
    </form>
    <div class="weui-btn-area">
        <button class="weui-btn weui-btn_primary" @click="onSubmit">提交</button>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import Validator from 'async-validator';
import { mapActions, mapState } from 'vuex';
import { MessageBox } from 'mint-ui';

export default {
  name: 'CreateUser',
  metaInfo: {
    title: '注册用户',
  },
  data() {
    return {
      form: {},
      errors: {},
      validator: new Validator({
        // 表单验证规则
        name: { type: 'string', required: true, message: '姓名不能为空' },
        mobile: [
          { type: 'string', required: true, message: '手机号不能为空' },
          { type: 'regexp', pattern: /^1[3-8]\d{9}$/, message: '手机号不正确' },
        ],
        email: { type: 'email', required: true, message: '电子邮箱不正确' },
        // password: { type: 'string', required: true, message: '密码不能为空' },
        // confirm: (rule, value, callback) => {
        //   const errors = [];
        //   if (this.form.password !== value) {
        //     errors.push(new Error('密码输入不一致', rule.field));
        //   }
        //   callback(errors);
        // },
      }),
    };
  },
  computed: {
    ...mapState(['userinfo']),
  },
  methods: {
    ...mapActions(['createUser']),
    onSubmit() {
      // eslint-disable-next-line consistent-return
      this.validator.validate(this.form, (errors, fields) => {
        if (errors) {
          return this.handleErrors(errors, fields);
        }
        this.handleCreate();
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
    async handleCreate() {
      const res = await this.createUser(this.form);
      this.$checkRes(res, () => {
        MessageBox.alert('注册用户成功').then(() => {
          this.$router.replace('/');
        });
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.userinfo && vm.userinfo.role !== 'guest') {
        vm.$router.replace('/');
      }
    });
  },
};
</script>
