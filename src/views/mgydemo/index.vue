<template>
  <div class="warpper">
    <div class="ht-cont" ref="htCont"></div>
    <scale-box style="pointer-events: none" :full-width="true">
      <transition name="slide-down">
        <Header
          :dataView="dataView"
          :show-back="showBack"
          :htObject="htObject"
          v-if="dataView || dataView === ''"
        />
      </transition>
      <transition name="fade">
        <div v-if="dataView" class="bg"></div>
      </transition>
      <component v-bind:is="componentName" />
    </scale-box>
  </div>
</template>

<script>
import createScript from '@/utils/createScript'
import MainEntry from './js/main'
import ScaleBox from '@/components/ScaleBox'
import Header from './components/header'
import index from './modules/index/index'
import machineRoom from './modules/machineRoom/index'
export default {
  components: {
    ScaleBox,
    Header,
    index,
    machineRoom
  },
  data() {
    return {
      dataView: false,
      htObject: null,
      isFirst: false,
      showBack: false
    }
  },
  computed: {
    componentName() {
      if (this.dataView === 'buildFloor') return 'index'
      return this.dataView
    }
  },
  created() {
    createScript(['libs/plugin/ht-obj.js', '/libs/plugin/ht-vector.js'])
      .then(res => {
        this.htObject = window.htObject = new MainEntry(this.$refs['htCont'], this)
      })
      .catch(e => {
        console.log(e)
      })
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-out;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: scale(1.2);
}
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.5s ease-out;
}

.slide-down-enter,
.slide-down-leave-to {
  transform: translateY(-60px);
  opacity: 0;
}
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
  /deep/.bg {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-image: url('./image/shade.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
}
</style>
