import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/reset.scss'

import { Swiper as SwiperClass, Pagination, Mousewheel, Autoplay } from 'swiper/swiper.esm'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
SwiperClass.use([Pagination, Mousewheel, Autoplay])
Vue.use(getAwesomeSwiper(SwiperClass))
import 'swiper/swiper-bundle.css'

import dataV from '@jiaminghi/data-view'
Vue.use(dataV)

import VCharts from 'v-charts'
Vue.use(VCharts)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
