<template>
  <ht-container>
    HT for Web Demo
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
  mounted() {
    createScript(['libs/plugin/ht-obj.js', '/libs/plugin/ht-vector.js'])
      .then(res => {
        new MainEntry()
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>

<style lang="scss" scoped></style>
