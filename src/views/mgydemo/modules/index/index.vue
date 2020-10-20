<template>
  <div class="data-content">
    <div class="main">
      <transition name="slide-right">
        <div v-if="showDataScreen" class="left">
          <VisitorData />
          <CarData style="margin-top: 50px" />
          <Safety style="margin-top: 50px" />
        </div>
      </transition>
      <transition name="slide-left">
        <div v-if="showDataScreen" class="right">
          <TeacherAttendance />
          <Monitoring style="margin-top:40px" />
          <StudentAttendance style="margin-top:40px" />
        </div>
      </transition>
      <transition name="fade">
        <div v-if="showDataScreen" class="buttons">
          <div class="night active"></div>
          <div class="day"></div>
          <div
            class="buidlings"
            :class="{ active: htObject.buildNamesVisible }"
            @click="showBuildNames"
          ></div>
          <div
            class="cameras"
            :class="{ active: htObject.cameraVisible }"
            @click="showCamera"
          ></div>
          <div class="weilan"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import VisitorData from './VisitorData'
import CarData from './CarData'
import Safety from './Safety'
import TeacherAttendance from './TeacherAttendance'
import StudentAttendance from './StudentAttendance'
import Monitoring from './Monitoring'
export default {
  components: {
    VisitorData,
    CarData,
    Safety,
    TeacherAttendance,
    StudentAttendance,
    Monitoring
  },
  data() {
    return {
      showDataScreen: false
    }
  },
  computed: {
    htObject() {
      return window.htObject
    }
  },
  mounted() {
    this.showDataScreen = true
  },
  methods: {
    showBuildNames() {
      if (this.htObject.buildNamesVisible) return
      this.htObject.showBuildNames()
    },
    showCamera() {
      if (this.htObject.cameraVisible) return
      this.htObject.showCamera()
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
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
      width: 344px;
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
    .buttons {
      width: 440px;
      height: 60px;
      padding: 10px 20px;
      box-sizing: border-box;
      border-radius: 10px;
      position: absolute;
      bottom: 76px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(13, 20, 31, 0.6);
      display: flex;
      justify-content: space-around;
      & > div {
        width: 40px;
        pointer-events: auto;
        background-position: center;
        background-size: 100%;
        background-repeat: no-repeat;
        cursor: pointer;
      }
      .night {
        background-image: url('../../image/night.png');
        background-size: 26px;
        &.active {
          background-image: url('../../image/night-active.png');
        }
      }
      .day {
        background-image: url('../../image/day.png');
        background-size: 30px;
        &.active {
          background-image: url('../../image/day-active.png');
        }
      }
      .buidlings {
        background-image: url('../../image/build.png');
        &.active {
          background-image: url('../../image/build-active.png');
        }
      }
      .cameras {
        background-image: url('../../image/jiankong.png');
        &.active {
          background-image: url('../../image/jiankong-active.png');
        }
      }
      .weilan {
        background-image: url('../../image/weilan.png');
        &.active {
          background-image: url('../../image/weilan-active.png');
        }
      }
    }
  }
}
</style>
