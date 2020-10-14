<template>
  <div class="home">
    <div v-for="route in routerList" @click="toHTView(route)" :key="route.path" class="htview-item">
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
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  .htview-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 200px;
    margin: 40px;
    background: #fff;
    box-shadow: 0px 0px 25px 5px rgba($color: #fff, $alpha: 0.3);
    border-radius: 4px;
    font-size: 23px;
    transition: all 0.5s ease-in-out;
    &:hover {
      box-shadow: 0px 0px 25px 15px rgba($color: #fff, $alpha: 0.3);
      transform: translateY(-10px);
    }
  }
}
</style>
