<template>
  <div class="warpper">
    <div class="ht-cont" ref="htCont"></div>
    <scale-box style="pointer-events: none" :full-width="true">
      <div class="data-content">
        <Header />
        <div class="main">
          <div class="left">
            <Numbers />
          </div>
          <div class="right"></div>
        </div>
      </div>
    </scale-box>
  </div>
</template>

<script>
import createScript from '@/utils/createScript'
import MainEntry from './js/main'
import ScaleBox from '@/components/ScaleBox'
import Header from './components/header'
import Numbers from './modules/numbers'
export default {
  components: {
    ScaleBox,
    Header,
    Numbers
  },
  data() {
    return {
      htObject: null,
      isFirst: false,
      archivesBox: []
    }
  },
  created() {
    createScript(['libs/plugin/ht-obj.js'])
      .then(res => {
        this.htObject = new MainEntry(this.$refs['htCont'], this)
      })
      .catch(e => {
        console.log(e)
      })
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.warpper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .ht-cont {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
  .data-content {
    pointer-events: none;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-image: url('./image/shade.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    .main {
      position: absolute;
      top: 81px;
      bottom: 0;
      left: 0;
      right: 0;
      .left,
      .right {
        position: absolute;
        width: 340px;
        height: 100%;
        // background: rgba($color: #00ffaa, $alpha: 0.4);
        box-sizing: border-box;
        padding-top: 70px;
      }
      .left {
        left: 30px;
      }
      .right {
        right: 30px;
      }
    }
  }
}
</style>
