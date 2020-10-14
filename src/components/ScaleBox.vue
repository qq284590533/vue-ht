<template>
  <div class="scale-box" :style="style">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    // 适应全屏宽度
    fullWidth: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  created() {
    document.body.style.overflow = 'hidden'
    this.$on('hook:beforeDestroy', () => {
      document.body.style.overflow = 'initial'
    })
  },
  computed: {
    statedScreenSize() {
      return this.$store.state.statedScreenSize
    },
    screenSize() {
      return this.$store.state.screenSize
    },
    scale() {
      return this.$store.state.scale
    },
    style() {
      return {
        transform: `scale(${this.scale}) translate(-50%, -50%)`,
        WebkitTransform: `scale(${this.scale}) translate(-50%, -50%)`,
        width: this.fullWidth
          ? `${this.screenSize.width / this.scale}px`
          : `${this.statedScreenSize.width}px`,
        height: `${this.statedScreenSize.height}px`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.scale-box {
  transform-origin: 0 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transition: 0.3s;
  pointer-events: none;
}
</style>
