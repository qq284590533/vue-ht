<template>
  <div class="model-box" :style="modelBoxStyle">
    <div class="bottom-bg" :style="bottombgStyle"></div>
    <div ref="modelBox" :style="styleObj"></div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 99
    },
    speed: {
      type: Number,
      default: 150
    },
    frameNum: {
      type: Number,
      default: 0
    },
    backgroundImage: {
      type: String,
      default: ''
    },
    bottombgStyle: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      activeIndex: 0,
      intervalFun: null,
      y: 0
    }
  },
  computed: {
    modelBoxStyle() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`
      }
    },
    styleObj() {
      return {
        backgroundImage: 'url(' + require(`../image/${this.backgroundImage}.png`) + ')',
        backgroundPositionY: `-${this.y}px`,
        backgroundSize: '100%',
        width: '100%',
        height: '100%',
        position: 'relative'
      }
    }
  },
  mounted() {
    this.init()
    this.$refs['modelBox'].addEventListener('mouseover', () => {
      clearInterval(this.intervalFun)
    })
    this.$refs['modelBox'].addEventListener('mouseout', () => {
      this.init()
    })
  },
  methods: {
    init() {
      clearInterval(this.intervalFun)
      this.intervalFun = setInterval(() => {
        this.run()
      }, this.speed)
    },
    run() {
      if (this.activeIndex < this.frameNum - 1) {
        this.activeIndex++
      } else {
        this.activeIndex = 0
      }
      this.y = this.activeIndex * this.height
    }
  }
}
</script>

<style lang="scss" scoped>
.model-box {
  position: relative;
  pointer-events: auto;
  .bottom-bg {
    position: absolute;
    background-image: url('../image/bbg.png');
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
}
</style>
