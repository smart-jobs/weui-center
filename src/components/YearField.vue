<template>
  <div>
    <mt-cell class="mint-field" :title="label" :class="[{ 'is-nolabel': !label }]" :is-link="true" @click.native="showSelect">
      <input ref="input" class="mint-field-core" :placeholder="placeholder" :readonly="true" :value="value" />
      <span class="mint-field-state" v-if="state" :class="['is-' + state]">
        <i class="mintui" :class="['mintui-field-' + state]"></i>
      </span>
    </mt-cell>
    <mt-popup v-model="popupVisible" position="bottom">
      <mt-picker :slots="slots" @change="onValuesChange" show-toolbar>
        <span
          class="mt-picker-action mt-picker-cancel"
          @click="
            popupVisible = false;
            $emit('cancel');
          "
          >取消</span
        >
        <span class="mt-picker-action mt-picker-confirm" @click="confirm">确定</span>
      </mt-picker>
    </mt-popup>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String, required: true },
    required: { String, Boolean },
    placeholder: { type: String },
    state: { type: String },
    value: { type: [String, Object], default: '' },
  },
  created() {},
  data() {
    return {
      popupVisible: false,
      selected: this.value,
      datas: [],
      slots: [
        {
          flex: 1,
          values: ['2015', '2016', '2017', '2018', '2019', '2020'],
        },
      ],
    };
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    value(val, oldVal) {
      if (val != null && val !== undefined && this.items) {
        this.selected = val;
      }
      // console.log('new: %s, old: %s', val, oldVal)
    },
  },
  computed: {},
  methods: {
    handleSelect() {},
    showSelect() {
      this.popupVisible = true;
    },
    confirm() {
      this.popupVisible = false;
      this.$emit('input', this.selected);
    },
    onValuesChange(picker, values) {
      // eslint-disable-next-line prefer-destructuring
      this.selected = values[0];
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
.mint-popup {
  width: 100%;
  display: flex;
  flex-direction: column;
  .weui-panel,
  .weui-panel__bd {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .weui-panel__bd {
    overflow-y: scroll;
    .mint-radiolist {
      margin-bottom: 20px;
    }
  }
}
.mt-picker-action {
  display: inline-block;
  width: 50%;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  color: #26a2ff;
}
.mt-picker-cancel {
  float: left;
}
.mt-picker-confirm {
  float: right;
}
</style>
