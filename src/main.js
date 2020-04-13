import Vue from 'vue'
import 'swiper/css/swiper.min.css'
import App from './App.vue'
import router from './router'
import TypeNav from './components/TypeNav'
import Carousel from './components/carousel'
import Pagination from './components/Pagination'
import store from './store'
import './mock/mockServer'

Vue.config.productionTip = false
Vue.component('TypeNav',TypeNav)
Vue.component('Carousel',Carousel)
Vue.component('Pagination',Pagination)

new Vue({
  beforeCreate(){
    Vue.prototype.$bus=this//将当前VM作为事件总线保存到vue原型对象上，所有组件都可见
  },
  render: h => h(App),
  router,
  store
}).$mount('#app')

