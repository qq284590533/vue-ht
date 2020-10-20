<template>
  <div class="data-content">
    <div class="main">
      <transition name="slide-right">
        <div v-if="showDataScreen" class="left">
          <environment />
          <machineRoom style="margin-top: 40px" />
          <airConditioner style="margin-top: 40px" />
        </div>
      </transition>
      <transition name="slide-left">
        <div v-if="showDataScreen" class="right">
          <power />
          <ups style="margin-top:40px" />
          <airConditioner1 style="margin-top:40px" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import airConditioner from './airConditioner'
import airConditioner1 from './airConditioner1'
import environment from './environment'
import machineRoom from './machineRoom'
import power from './power'
import ups from './ups'
export default {
  components: {
    environment,
    machineRoom,
    airConditioner,
    power,
    ups,
    airConditioner1
  },
  data() {
    return {
      showDataScreen: false
    }
  },
  mounted() {
    this.showDataScreen = true
  }
}
</script>

<style lang="scss" scoped>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.5s ease-out;
}

.slide-left-enter,
.slide-left-leave-to {
  transform: translateX(100px);
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s ease-out;
}

.slide-right-enter,
.slide-right-leave-to {
  transform: translateX(-100px);
  opacity: 0;
}
.data-content {
  pointer-events: none;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  .main {
    position: absolute;
    top: 81px;
    bottom: 0;
    left: 0;
    right: 0;
    .left,
    .right {
      position: absolute;
      width: 360px;
      height: 100%;
      // background: rgba($color: #00ffaa, $alpha: 0.4);
      box-sizing: border-box;
      padding-top: 44px;
    }
    .left {
      left: 30px;
    }
    .right {
      right: 30px;
    }
  }
}
</style>
