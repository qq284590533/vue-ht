<template>
  <contentBox title="空调">
    <div class="air-content">
      <div class="item">
        <dsSwitch v-model="model.value1" />
        <p>回路1</p>
      </div>
      <div class="item">
        <dsSwitch v-model="model.value2" />
        <p>回路2</p>
      </div>
      <div class="item">
        <dsSwitch v-model="model.value3" />
        <p>回路3</p>
      </div>
      <div class="item">
        <dsSwitch v-model="model.value4" />
        <p>回路4</p>
      </div>
      <div class="item">
        <dsSwitch v-model="model.value5" />
        <p>回路5</p>
      </div>
      <div class="item">
        <dsSwitch v-model="model.value6" />
        <p>回路6</p>
      </div>
    </div>
  </contentBox>
</template>

<script>
import contentBox from '../../components/contentBox'
import dsSwitch from './components/switch'
export default {
  components: {
    contentBox,
    dsSwitch
  },
  data() {
    return {
      model: {
        value1: true,
        value2: true,
        value3: false,
        value4: true,
        value5: true,
        value6: false
      }
    }
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
    padding-top: 28px;
    user-select: none;
    &:nth-child(1),
    &:nth-child(3) {
      border-bottom: 1px solid rgba(65, 134, 237, 1);
    }
    &:nth-child(2),
    &:nth-child(5) {
      border: 1px solid rgba(65, 134, 237, 1);
      border-top: none;
    }
    &:nth-child(5) {
      border-bottom: none;
    }
    p {
      line-height: 40px;
    }
  }
}
</style>
