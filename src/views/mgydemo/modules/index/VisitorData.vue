<template>
  <contentBox title="访客数据">
    <div class="visitor-data">
      <model3d
        class="car"
        :frameNum="25"
        :speed="100"
        backgroundImage="person"
        :width="150"
        :height="178.57"
        :bottombgStyle="{
          backgroundPosition: '44px 158px',
          backgroundSize: '66px'
        }"
      />
      <div class="numbers">
        <div class="in">
          <p>进入数量</p>
          <span>500</span>
        </div>
        <div class="out">
          <p>已离开数量</p>
          <span>492</span>
        </div>
        <div class="on">
          <p>未离开数量</p>
          <span>8</span>
        </div>
      </div>
    </div>
  </contentBox>
</template>

<script>
import contentBox from '../../components/contentBox'
import model3d from '../../components/model3d'
export default {
  components: {
    contentBox,
    model3d
  }
}
</script>

<style lang="scss" scoped>
.visitor-data {
  padding-top: 40px;
  .car {
    float: left;
    margin-left: -25px;
    margin-top: -20px;
    padding: 0 25px;
  }
  .numbers {
    overflow: hidden;
    position: relative;
    &::before {
      content: '';
      display: block;
      width: 2px;
      height: 70%;
      background: #2ba5bb;
      position: absolute;
      top: 50%;
      left: 7px;
      transform: translateY(-50%);
    }
    & > div {
      font-size: 14px;
      display: flex;
      align-items: flex-end;
      padding: 10px 0 10px 10px;
      color: rgba($color: #fff, $alpha: 0.85);
      position: relative;
      padding-left: 30px;
      &::before,
      &::after {
        content: '';
        display: block;
        border-radius: 100%;
        position: absolute;
        left: 0;
        width: 4px;
        height: 4px;
        background: #fff;
        border: 4px solid #000;
      }
      &::before {
        width: 16px;
        height: 16px;
        background: #2ba5bb;
        border: none;
        top: 19.5px;
      }
      &::after {
        left: 2px;
      }
      p {
        width: 71px;
        margin-right: 17px;
      }
      span {
        font-size: 28px;
        line-height: 24px;
      }
      &.out {
        span {
          color: rgba(53, 204, 231, 0.85);
        }
      }
      &.on {
        span {
          color: rgba(222, 123, 226, 0.85);
        }
      }
    }
  }
}
</style>
