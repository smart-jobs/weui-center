<template>
  <div>
    <mt-field :label="label" :value="codeName" :placeholder="placeholder" @click.native="showSelect" :readonly="true" :required="required">
    </mt-field>
    <mt-popup v-model="popupVisible" position="right" :modal="false" class="fullscreen">
      <mt-header title="请选择">
        <mt-button slot="left" icon="back" @click="popupVisible = false"></mt-button>
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
    required: { type: String || Boolean },
    placeholder: { type: String },
    type: { type: String, required: true },
    typeDesc: { type: String },
    value: { type: String, default: '' },
  },
  async mounted() {
    const res = await this.load(this.type);
    if (!res.errcode) {
      this.items = res;
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
      items: [],
    };
  },
  computed: {
    ...mapState(['codes']),
    codeName() {
      const val = this.value && _.get(this.codes, [this.type, this.value]);
      return val || this.value;
    },
    options() {
      return this.items.map(p => ({ label: p.name, value: p.code }));
    },
  },
  methods: {
    ...mapActions(['load']),
    handleSelect() {
      if (this.selected) {
        this.$emit('input', this.selected);
        this.popupVisible = false;
      }
    },
    showSelect() {
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
