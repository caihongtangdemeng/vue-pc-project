import Vue from 'vue'
import 'swiper/css/swiper.min.css'
import App from './App.vue'
import router from './router'
import TypeNav from './components/TypeNav'
import store from './store'
import './mock/mockServer'

Vue.config.productionTip = false
Vue.component('TypeNav',TypeNav)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

