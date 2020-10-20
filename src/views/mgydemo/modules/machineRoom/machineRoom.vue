<template>
  <contentBox title="机房视频监控">
    <div class="monitoring-cont">
      <div class="monitoring-item">
        <p class="title">
          机房监控(1)
        </p>
        <div class="monitoring-box">
          <img src="../../image/image-01.png" alt="" srcset="" />
        </div>
      </div>
      <div class="monitoring-item">
        <p class="title">
          机房监控(1)
        </p>
        <div class="monitoring-box">
          <img src="../../image/image-01.png" alt="" srcset="" />
        </div>
      </div>
      <div class="monitoring-item">
        <p class="title">
          机房监控(1)
        </p>
        <div class="monitoring-box">
          <img src="../../image/image-01.png" alt="" srcset="" />
        </div>
      </div>
      <div class="monitoring-item">
        <p class="title">
          机房监控(1)
        </p>
        <div class="monitoring-box">
          <img src="../../image/image-01.png" alt="" srcset="" />
        </div>
      </div>
    </div>
  </contentBox>
</template>

<script>
import contentBox from '../../components/contentBox'
export default {
  name: 'MachineRoom',
  components: {
    contentBox
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.monitoring-cont {
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  padding-top: 20px;
  .monitoring-item {
    width: 170px;
    margin-bottom: 8px;
    cursor: pointer;
    .title {
      padding-left: 16px;
      background: url('../../image/icon-13.png') no-repeat left center;
      background-size: 12px;
      font-size: 12px;
      line-height: 22px;
      color: #fff;
    }
    .monitoring-box {
      width: 100%;
      img {
        width: 100%;
      }
    }
  }
}
</style>
