<template>
  <ht-container>
    <div class="ht-cont" ref="htCont"></div>
  </ht-container>
</template>

<script>
import createScript from '@/utils/createScript'
import HtContainer from '@/components/HtContainer'
import MainEntry from './js/main'
export default {
  components: {
    HtContainer
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
.ht-cont {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.view-2d {
  position: absolute;
  z-index: 1;
  .archives-list {
    padding: 10px;
    color: #ffffff;
    border: 1px solid rgba($color: #fff, $alpha: 0.7);
    border-radius: 4px;
    width: 400px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    li {
      margin: 0 5px;
      line-height: 20px;
      text-align: center;
      cursor: pointer;
      font-size: 14px;
    }
  }
}
</style>
