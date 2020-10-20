<template>
  <div class="content-box">
    <p class="title">{{ title }}</p>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Title'
    }
  }
}
</script>

<style lang="scss" scoped>
.content-box {
  width: 100%;
  & > .title {
    height: 30px;
    line-height: 30px;
    background: linear-gradient(90deg, #2081ff57 0%, rgba(48, 83, 201, 0) 100%);
    padding-left: 16px;
    color: rgba($color: #fff, $alpha: 0.85);
    font-size: 17px;
    position: relative;
    box-sizing: border-box;
    &::before {
      content: '';
      display: block;
      width: 3px;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: #2081ff;
    }
  }
}
</style>
