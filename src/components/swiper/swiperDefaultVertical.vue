<template>
  <div>
    <swiper :options="swiperOption" class="swiper">
      <swiper-slide class="swiper-slide" v-for="(item, index) in slide" :key="index">
        Slide {{item}}
      </swiper-slide>
      <!-- 用来添加分页器的 就是小圆点 -->
      <div class="swiper-pagination" slot="pagination">

      </div>
    </swiper>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide} from 'vue-awesome-swiper'
  export default {
    data() {
      return {
        slide: [1,2,3,4,5,6],
        swiperOption: {
          direction: "vertical",
          loop: true, // 从最后一个图划到最前边一个图
          pagination:{
            el:'.swiper-pagination',
            clickable: true, // 让小圆点可以点击
          }
        }
      }
    },
    components: {swiper, swiperSlide}
  }
</script>

// scoped说明只对当前组件有用
<style scoped>
.swiper-slide{
  height: 4rem;
  text-align: center;
  line-height: 4rem;
}
.swiper{
  height: 7rem;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
</style>