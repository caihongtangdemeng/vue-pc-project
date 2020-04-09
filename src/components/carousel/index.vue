<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in carouselList" :key="item.id">
        <img :src="item.imgUrl" alt="">
      </div>

    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Swiper from 'swiper'
  export default {
    name: 'Carousel',
    props: {
      carouselList: Array
    },
    watch: {
      carouselList: {
        handler() {
          if(this.carouselList.length===0) return
          Vue.nextTick(() => {
            new Swiper(this.$refs.swiper, {
              // direction: 'vertical', // 垂直切换选项
              loop: true, // 循环模式选项

              // 如果需要分页器
              pagination: {
                el: '.swiper-pagination',
              },

              // 如果需要前进后退按钮
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }

            })
          })
        },
        immediate:true,
      },
    
    }
  }
</script>

<style lang="less" scoped>

</style>