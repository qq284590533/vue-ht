<template>
  <contentBox title="ups监控">
    <div class="content">
      <div class="item">
        <span>电池电压</span>
        <span>8V</span>
      </div>
      <div class="item">
        <span>电池温度</span>
        <span>50℃</span>
      </div>
      <div class="item">
        <span>电池电流</span>
        <span>20A</span>
      </div>
      <div class="item">
        <span>后备时间</span>
        <span>30min</span>
      </div>
      <div class="item">
        <span>运行模式</span>
        <span>后备式</span>
      </div>
    </div>
  </contentBox>
</template>

<script>
import contentBox from '../../components/contentBox'

export default {
  name: 'Ups',
  components: {
    contentBox
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding-top: 20px;
  .item {
    display: flex;
    justify-content: space-between;
    padding: 0 35px 0 58px;
    align-items: center;
    width: 100%;
    height: 50px;
    background-color: rgba($color: #2a4569, $alpha: 0.3);
    border-radius: 8px;
    margin-bottom: 10px;
    color: rgba(155, 239, 254, 1);
    background-position: 17px center;
    background-repeat: no-repeat;
    background-size: 24px;
    box-sizing: border-box;
    span {
      font-size: 15px;
      &:first-child {
        color: #fff;
      }
    }
    &:nth-child(1) {
      background-image: url('../../image/icon-20.png');
    }
    &:nth-child(2) {
      background-image: url('../../image/icon-21.png');
    }
    &:nth-child(3) {
      background-image: url('../../image/icon-22.png');
    }
    &:nth-child(4) {
      background-image: url('../../image/icon-23.png');
    }
    &:nth-child(5) {
      background-image: url('../../image/icon-24.png');
    }
  }
}
</style>
