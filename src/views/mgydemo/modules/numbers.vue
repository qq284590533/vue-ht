<template>
  <div class="numbers">
    <div class="students">
      <p class="title">学校总体人数</p>
      <p class="num">
        9000
        <span>人</span>
      </p>
    </div>
    <div class="classrooms">
      <p class="title">教室总数量</p>
      <p class="num">
        200
        <span>间</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.numbers {
  display: flex;
  border-bottom: 2px solid rgba($color: #2dacee, $alpha: 0.5);
  padding-bottom: 36px;
  & > div {
    flex: 1;
    .title {
      position: relative;
      font-size: 17px;
      color: rgba(#fff, 0.8);
      padding-left: 15px;
      &::before {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: 3px;
        width: 0;
        height: 0;
        border: 5px solid;
        border-left-width: 8px;
        border-color: transparent transparent transparent #2dacee;
      }
    }
    .num {
      color: #35cce7;
      font-size: 26px;
      padding-left: 35px;
      background-repeat: no-repeat;
      background-position: left center;
      background-repeat: no-repeat;
      padding-top: 20px;
      span {
        font-size: 16px;
      }
    }
  }
  .students {
    .num {
      background-image: url('../image/people.png');
      background-size: 18px;
      background-position: 0 19px;
    }
  }
  .classrooms {
    .num {
      padding-left: 40px;
      background-image: url('../image/class.png');
      background-size: 23px;
      background-position: 0 23px;
    }
  }
}
</style>
