import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    screenSize: {
      width: 1920,
      height: 1080
    },
    statedScreenSize: {
      width: 1920,
      height: 1080
    },
    scale: 1
  },
  mutations: {
    setScale(state, scale) {
      state.scale = scale
    },
    setScreenSize(state, screenSize) {
      state.screenSize = screenSize
    }
  },
  actions: {},
  modules: {}
})
