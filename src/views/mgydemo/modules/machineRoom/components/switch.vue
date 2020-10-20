<template>
  <div class="ds-switch" @click="handleClick">
    <span class="dot" :class="{ opened: value }">{{ value ? '开' : '关' }}</span>
  </div>
</template>

<script>
export default {
  name: 'DsSwitch',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    viewModel: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick() {
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.ds-switch {
  display: inline-block;
  height: 24px;
  width: 54px;
  position: relative;
  background: #003567;
  border: 1px solid #4286ed;
  border-radius: 12px;
  cursor: pointer;
  pointer-events: auto;
  .dot {
    position: absolute;
    width: 30px;
    height: 30px;
    transition: all 0.3s ease;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    left: 0;
    top: 50%;
    margin-top: -15px;
    background: #de7ce2;
    border-radius: 50%;
    color: #641867;
    box-shadow: 2px 2px 12px 2px rgba(0, 0, 0, 0.85);
    user-select: none;
    &.opened {
      left: 26px;
      background: #36cce7;
      color: #0b5664;
    }
  }
}
</style>
