<template>
  <div>
    <form ref="form" class="label-right">
      <mt-field label="毕业年份" placeholder="请选择毕业年份" v-model="form.year" required
        :state="errors.year" :readonly="true"></mt-field>
      <code-field label="身份证号" placeholder="请输入身份证号" v-model="form.sfzh" required
        :state="errors.sfzh" :readonly="true"></code-field>
      <code-field label="姓名" placeholder="请输入姓名" v-model="form.xm" required
        :state="errors.xm"></code-field>
      <code-field label="性别" placeholder="请输入性别" v-model="form.xb" required
        :state="errors.xb"></code-field>
      <code-field label="院校名称" placeholder="请输入院校名称" v-model="form.yxmc" required
        :state="errors.yxmc"></code-field>
      <code-field label="专业名称" placeholder="请输入专业名称" v-model="form.zymc" required
        :state="errors.zymc"></code-field>
      <code-field label="学历" placeholder="请输入学历" v-model="form.xl" required
        :state="errors.xl"></code-field>
    </form>
    <div class="weui-msg__opr-area">
      <p class="weui-btn-area">
        <button class="weui-btn weui-btn_default" @click="$router.push('step1')">上一步</button>
        <button class="weui-btn weui-btn_primary">完成注册</button>
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

export default {
  name: 'Step3',
  metaInfo: {
    title: '完善信息',
  },
  mounted() {
    this.setStep(2);
  },
  data() {
    return {
      form: {
        year: this.register && this.register.year,
        sfzh: this.register && this.register.sfzh,
        xm: this.userinfo && this.userinfo.name,
      },
      errors: {},
      validator: new Validator({
        // 表单验证规则
        year: { type: 'string', required: true, message: '毕业年份不能为空' },
        sfzh: { type: 'string', required: true, message: '身份证号不能为空' },
        xm: { type: 'string', required: true, message: '姓名不能为空' },
        xb: { type: 'string', required: true, message: '性别不能为空' },
        yxmc: { type: 'string', required: true, message: '院校名称不能为空' },
        zymc: { type: 'string', required: true, message: '专业名称不能为空' },
        xl: { type: 'string', required: true, message: '学历不能为空' },
      }),
    };
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
        this.handleNext();
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
      const res = await this.handleRegister(this.form);
      this.$checkRes(res, () => {
        MessageBox.alert('注册学籍信息成功').then(() => {
          this.$router.push('/');
        });
      });
    },
  },
  computed: {
    ...mapState(['register']),
  },
};
</script>
