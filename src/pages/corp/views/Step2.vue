<template>
  <div>
    <form ref="form" class="label-right">
      <div class="weui-cells__title">基本信息</div>
      <div class="weui-cells">
        <code-field label="代码类型" type='corpcode' v-model="form.info.corptype" placeholder="请选择代码类型" required></code-field>
        <mt-field label="企业代码" v-model="form.info.corpcode" placeholder="请输入企业代码" required></mt-field>
        <code-field label="单位规模" type="dwgm" mode="pair" v-model="form.scale" placeholder="请选择单位规模" required></code-field>
        <code-field label="单位性质" type="dwxz" mode="pair" v-model="form.nature" placeholder="请选择单位性质" required></code-field>
        <code-field label="行业类别" type="hylb" mode="pair" v-model="form.industry" placeholder="请选择行业类别" required></code-field>
        <mt-field label="所在城市" v-model="form.city.name" placeholder="请选择城市" required></mt-field>
        <mt-field label="企业法人" v-model="form.info.legalPerson" placeholder="请输入企业法人" required></mt-field>
        <mt-field label="注册时间" type="date" v-model="form.info.registerTime" placeholder="请选择企业工商注册时间" required></mt-field>
        <mt-field label="注册资金" v-model="form.info.registerMoney" placeholder="请输入注册资金" required></mt-field>
      </div>

      <div class="weui-cells__title">联系方式</div>
      <div class="weui-cells">
        <mt-field label="联系人" v-model="form.contact.person" placeholder="请输入联系人" required></mt-field>
        <mt-field label="手机" v-model="form.contact.mobile" placeholder="请输入手机" required></mt-field>
        <mt-field label="电话" type="tel" v-model="form.contact.phone" placeholder="请输入电话"></mt-field>
        <mt-field label="邮箱" type="email" v-model="form.contact.email" placeholder="请输入邮箱"></mt-field>
        <mt-field label="企业网址" type="url" v-model="form.contact.url" placeholder="请输入企业网址"></mt-field>
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
        scale: {},
        nature: {},
        industry: {},
        city: {},
        info: {},
        contact: {},
      },
      errors: {},
      infoRules: new Validator({
        // 表单验证规则
        corptype: {
          type: 'string',
          required: true,
          message: '代码类型不能为空',
        },
        corpcode: {
          type: 'string',
          required: true,
          message: '企业代码不能为空',
        },
      }),
      validator: new Validator({
        // 表单验证规则
        'scale.code': {
          type: 'string',
          required: true,
          message: '企业规模不能为空',
        },
        'industry.code': {
          type: 'string',
          required: true,
          message: '行业类别不能为空',
        },
        'city.code': {
          type: 'string',
          required: true,
          message: '所在城市不能为空',
        },
        'contact.person': {
          type: 'string',
          required: true,
          message: '联系人不能为空',
        },
        'contact.mobile': {
          type: 'string',
          required: true,
          message: '手机不能为空',
        },
      }),
    };
  },
  mounted() {
    this.setStep(1);
  },
  methods: {
    ...mapMutations({
      setStep: types.REG_STEP,
    }),
    ...mapActions(['register']),
    onSubmit() {
      this.validator.validate(this.form, (errors, fields) => {
        if (errors) {
          return this.handleErrors(errors, fields);
        }
        this.handleRegister();
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
    async handleRegister() {
      const res = await this.register(this.form);
      this.$checkRes(res, () => {
        MessageBox.alert('完善企业信息成功').then(() => {
          this.$router.push('/step3');
        });
      });
    },
  },
  computed: {
    ...mapState(['step', 'status']),
  },
};
</script>
