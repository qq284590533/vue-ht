<template>
  <contentBox title="空调">
    <div class="air-content">
      <div class="item">
        <div class="icon-box ib-01"></div>
        <span>53℃</span>
        <p>设定温度</p>
      </div>
      <div class="item">
        <div class="icon-box ib-02"></div>
        <span>53℃</span>
        <p>回风温度</p>
      </div>
      <div class="item">
        <div class="icon-box ib-03"></div>
        <span>开启</span>
        <p>空调状态</p>
      </div>
      <div class="item">
        <div class="icon-box ib-04"></div>
        <span>53%rh</span>
        <p>湿度设定</p>
      </div>
      <div class="item">
        <div class="icon-box ib-05"></div>
        <span>53%rh</span>
        <p>回风湿度</p>
      </div>
      <div class="item">
        <div class="icon-box ib-06"></div>
        <span>制冷</span>
        <p>空调模式</p>
      </div>
    </div>
  </contentBox>
</template>

<script>
import contentBox from '../../components/contentBox'
export default {
  components: {
    contentBox
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.air-content {
  padding-top: 20px;
  display: flex;
  flex-flow: wrap;
  .item {
    width: 33.333%;
    height: 100px;
    box-sizing: border-box;
    color: #fff;
    text-align: center;
    font-size: 12px;
    &:nth-child(1),
    &:nth-child(3) {
      border-bottom: 1px solid #4186ed;
    }
    &:nth-child(2),
    &:nth-child(5) {
      border: 1px solid #4186ed;
      border-top: none;
    }
    &:nth-child(5) {
      border-bottom: none;
    }
    span {
      color: #35cce7;
    }
    .icon-box {
      height: 48px;
      background-repeat: no-repeat;
      background-position: center 21px;
      &.ib-01 {
        background-image: url('../../image/icon-14.png');
        background-size: 22px;
      }
      &.ib-02 {
        background-image: url('../../image/icon-15.png');
        background-size: 19px;
      }
      &.ib-03 {
        background-image: url('../../image/icon-16.png');
        background-size: 23px;
      }
      &.ib-04 {
        background-image: url('../../image/icon-17.png');
        background-size: 20px;
      }
      &.ib-05 {
        background-image: url('../../image/icon-18.png');
        background-size: 22px;
      }
      &.ib-06 {
        background-image: url('../../image/icon-19.png');
        background-size: 17px;
        background-position: center 25px;
      }
    }
    p {
      margin-top: 6px;
    }
  }
}
</style>
