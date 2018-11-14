<template>
  <div>
    <mt-field :label="label" :value="codeName" :placeholder="placeholder" @click.native="showSelect" :readonly="true" :required="required">
    </mt-field>
    <mt-popup v-model="popupVisible" position="right" :modal="false" class="fullscreen">
      <mt-header title="请选择">
        <mt-button slot="left" icon="back" @click="handleBack"></mt-button>
        <mt-button slot="right" @click="handleSelect">选择</mt-button>
      </mt-header>
      <mt-radio :title="typeDesc || label" v-model="selected" :options="options" class="left">
      </mt-radio>
    </mt-popup>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import _ from 'lodash';
import { Message } from 'element-ui';

const { mapState, mapActions } = createNamespacedHelpers('dict');
export default {
  props: {
    label: { type: String, required: true },
    required: { String, Boolean },
    placeholder: { type: String },
    type: { type: String, required: true },
    typeDesc: { type: String },
    value: { type: [String, Object], default: '' },
    mode: { type: String, default: 'code' }, // 选值模式：code、name、pair
  },
  async created() {
    const res = await this.load(this.type);
    if (!res.errcode) {
      this.datas.push(res);
    } else {
      // eslint-disable-next-line no-console
      console.error(`数据字典[${this.type}]加载失败：`, res);
      Message.error('加载数据字典失败');
    }
  },
  data() {
    return {
      popupVisible: false,
      selected: null,
      datas: [],
      level: 0,
    };
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    value(val, oldVal) {
      if (val != null && val !== undefined && this.items) {
        if (this.mode === 'name') {
          const item = this.items.find(p => p.name === val);
          this.selected = item.code;
          return;
        }
        if (this.mode === 'pair') {
          const item = this.items.find(p => p.code === val.code);
          this.selected = item.code;
          return;
        }
        this.selected = val;
      }
      // console.log('new: %s, old: %s', val, oldVal)
    },
  },
  computed: {
    ...mapState(['codes']),
    codeName() {
      if (this.mode === 'pair') {
        return this.value.name;
      }
      if (this.mode === 'code') {
        const val = this.value && _.get(this.codes, [this.type, this.value]);
        return val || this.value;
      }
      return this.value;
    },
    options() {
      const items = this.datas[this.level] || [];
      return items.map(p => ({ label: p.name, value: p.code }));
    },
  },
  methods: {
    ...mapActions(['load']),
    handleSelect() {
      if (this.selected) {
        const items = this.datas[this.level];
        const item = items.find(p => p.code === this.selected);
        // TODO: 显示下级选项
        if (_.isArray(item.children) && item.children.length > 0) {
          this.datas.push(item.children);
          this.level = this.level + 1;
          return;
        }

        // TODO: 选中子项并返回
        this.popupVisible = false;
        if (item && this.mode === 'name') {
          this.$emit('input', item.name);
          return;
        }
        if (this.mode === 'pair') {
          this.$emit('input', item);
          return;
        }
        this.$emit('input', this.selected);
        // const data = items.find(p=>p.code===this.selected);
      }
    },
    handleBack() {
      if (this.level > 0) {
        this.level = this.level - 1;
        this.datas.pop();
      } else {
        this.popupVisible = false;
      }
    },
    showSelect(event) {
      this.popupVisible = true;
    },
  },
};
</script>

<style scoped lang="less">
.fullscreen {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.mint-radiolist.left {
  /deep/ .mint-cell-title {
    text-align: left;
  }
}
</style>
