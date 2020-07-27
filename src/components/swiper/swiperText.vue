<template>
  <div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide class="text">
        <div class="centent">
          在移动布局里，在大段文章的下拉上拉时，有些老旧手机会有卡顿效果。都需要我们自己加入上划下拉的组件，这里就可以直接使用vue-awesome-swiper来解决。我们作一个组件，里边有一大段文字，然后给文字加入顺畅的下拉上拉效果。
          在移动布局里，在大段文章的下拉上拉时，有些老旧手机会有卡顿效果。都需要我们自己加入上划下拉的组件，这里就可以直接使用vue-awesome-swiper来解决。我们作一个组件，里边有一大段文字，然后给文字加入顺畅的下拉上拉效果。
          在移动布局里，在大段文章的下拉上拉时，有些老旧手机会有卡顿效果。都需要我们自己加入上划下拉的组件，这里就可以直接使用vue-awesome-swiper来解决。我们作一个组件，里边有一大段文字，然后给文字加入顺畅的下拉上拉效果。
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide} from 'vue-awesome-swiper'
  export default {
    data() {
      return {
        swiperOption: {
          direction: 'vertical',
          slidesPerView: 'auto', // 一屏之内显示的数量PerView  V是大写
          freeMode:true, // 每次可以滑动不止一个 也不需要每次都贴合滑动 就是无限滚动
          mousewheel:true // 鼠标滚轮也可以实现滚动 适用于pc端
        }
      }
    },
  components: {swiper,swiperSlide}
  }
</script>

<style scoped>
  .swiper{
    height: 300px;
    overflow: hidden;
  }
  .text{
    font-size: 18px;
    text-align: left;
    padding: 30px;
    height: auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
</style>