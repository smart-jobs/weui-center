<template>
  <div>
    <div class="label-right">
      <mt-field label="企业名称" placeholder="请输入企业名称" v-model="form.corpname" required
        :state="errors.corpname" :readonly="!isFirst"></mt-field>
      <code-field label="注册学校" placeholder="请选择注册学校" type="unit" v-model="form.unit" required
        :state="errors.unit"></code-field>
    </div>
    <div class="weui-btn-area">
      <button class="weui-btn weui-btn_primary" @click="onSubmit">下一步</button>
      <button class="weui-btn weui-btn_default" @click="$router.replace('/')">返回</button>
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
  name: 'Step1',
  metaInfo: {
    title: '创建企业信息',
  },
  components: {
    CodeField,
  },
  mounted() {
    if (!this.isFirst) {
      this.form.corpname = this.userinfo.corpname;
    }
  },
  data() {
    return {
      form: {
        corpname: this.userinfo && this.userinfo.corpname,
      },
      errors: {},
      validator: new Validator({
        // 表单验证规则
        corpname: { type: 'string', required: true, message: '企业名称不能为空' },
        unit: { type: 'string', required: true, message: '注册学校不能为空' },
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
        this.handleCreate();
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
    async handleCreate() {
      const res = await this.register(this.form);
      this.$checkRes(res, () => {
        MessageBox.alert('创建企业成功').then(() => {
          this.$router.replace('step2');
        });
      });
    },
  },
  computed: {
    ...mapState(['step', 'status', 'userinfo']),
    isFirst() {
      return !this.userinfo || !this.userinfo.corpname;
    },
  },
};
</script>
