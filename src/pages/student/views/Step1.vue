<template>
  <div>
    <el-steps :active="0" finish-status="success" simple>
      <el-step title="步骤1"></el-step>
      <el-step title="步骤2"></el-step>
    </el-steps>
    <div class="label-right">
      <year-field label="毕业年份" placeholder="请选择毕业年份" v-model="form.year" required :state="errors.year"></year-field>
      <mt-field label="身份证号" placeholder="请输入身份证号" v-model="form.sfzh" required :state="errors.sfzh"></mt-field>
    </div>
    <div class="weui-btn-area">
      <button class="weui-btn weui-btn_primary" @click="onSubmit">下一步</button>
      <button class="weui-btn weui-btn_default" @click="$router.replace('/')">返回</button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex';
import Validator from 'async-validator';
import { Message } from 'element-ui';
import { MessageBox } from 'mint-ui';
import * as types from '../store/mutation-types';
import YearField from '@/components/YearField.vue';

export default {
  name: 'Step1',
  metaInfo: {
    title: '创建企业信息',
  },
  components: {
    YearField,
  },
  mounted() {
    this.setStep(0);
  },
  data() {
    return {
      form: this.regform || {},
      errors: {},
      validator: new Validator({
        // 表单验证规则
        year: { type: 'string', required: true, message: '毕业年份不能为空' },
        sfzh: { type: 'string', required: true, message: '身份证号不能为空' },
      }),
    };
  },
  computed: {
    ...mapState(['regform']),
  },
  methods: {
    ...mapMutations({
      setStep: types.REG_STEP,
      setReg: types.REG_FORM,
    }),
    ...mapActions(['findBase']),
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
    async handleNext() {
      const res = await this.findBase(this.form);
      this.$checkRes(res, () => {
        if (!res) {
          MessageBox.confirm('未查到您的学籍信息，请核实输入信息或联系学校；如果您不是本省应届毕业生，请手动完善信息！', '提示', {
            confirmButtonText: '手动完善',
            cancelButtonText: '重新输入',
          }).then((action) => {
            if (action === 'confirm') {
              this.setReg(this.form);
              this.$router.replace('/register/step3');
            }
          });
        } else {
          this.$router.replace('/register/step2');
        }
      });
    },
  },
};
</script>
