<template>
  <ht-container>
    <div class="ht-cont" ref="htCont"></div>
  </ht-container>
</template>

<script>
import createScript from '@/utils/createScript'
import HtContainer from '@/components/HtContainer'
import MainEntry from './js/container/index/main'
export default {
  name: 'HtDemo',
  components: {
    HtContainer
  },
  data() {
    return {}
  },
  created() {
    createScript(['libs/plugin/ht-obj.js', '/libs/plugin/ht-vector.js'])
      .then(res => {
        new MainEntry(this.$refs['htCont'])
      })
      .catch(e => {
        console.log(e)
      })
  }
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
</style>
