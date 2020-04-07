<template>
  <div class="app">
    <Header />
    <router-view></router-view>

    <Footer v-if="!$route.meta.isHideFooter"/> 
  </div>
</template>

<script>
  import Header from './components/Header'
  import Footer from './components/Footer'
  import {reqBaseCategoryList} from './api'
export default {
  name: 'App',
 mounted(){
    // const result=await reqBaseCategoryList()
    // console.log('result',result)
    //触发vuex中的getBaseCategoryList  actions调用 切换路由时只发一次请求
    this.$store.dispatch('getBaseCategoryList') 
  },
  
  components:{
    Header,
    Footer
  }
}
</script>

<style lang="less" scoped>
  
</style>
