<template>
  <div class="home">
    <div v-for="route in routerList" @click="toHTView(route)" :key="route.path">
      {{ route.mate.name }}
    </div>
  </div>
</template>

<script>
import htRouter from '@/router/htRouter'
export default {
  name: 'Home',
  data() {
    return {
      routerList: htRouter
    }
  },
  methods: {
    toHTView(route) {
      this.$router.push({
        name: route.name
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  background: #000;
  color: #fff;
}
</style>
