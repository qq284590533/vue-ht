<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { debounce } from '@/utils'

export default {
  name: 'App',
  data() {
    return {
      // 设定屏幕尺寸
      statedScreenSize: {
        width: 1920,
        height: 1080
      }
    }
  },
  created() {
    this.setScale()
    window.addEventListener('resize', debounce(this.setScale, 100))
    this.$on('hook:beforeDestroy', () => {
      window.removeEventListener('resize', debounce(this.setScale, 100))
    })
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    getScale() {
      const { width = 1920, height = 1080 } = this.statedScreenSize
      const ww = window.innerWidth / width
      const wh = window.innerHeight / height
      return {
        scale: ww < wh ? ww : wh,
        screenSize: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      }
    },
    setScale() {
      const { scale, screenSize } = this.getScale()
      console.log(scale, screenSize)
      this.$store.commit('setScale', scale)
      this.$store.commit('setScreenSize', screenSize)
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow: hidden;
  height: 100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
