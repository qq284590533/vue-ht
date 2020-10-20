import Vue from 'vue'

class Store {
  constructor() {
    this.state = Vue.observable({
      activeTempIndex: '',
      templateList: []
    })
  }

  updateState(key, value) {
    this.state[key] = value
  }
}

export default new Store()
