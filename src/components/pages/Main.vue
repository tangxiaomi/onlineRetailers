// 主页面
<template>
  <div>
    <!-- 用来存放各个页面的 -->
    <div class="main-div">
      <!-- 每次切换不需要再次进行服务器端获取 -->
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
    <van-tabbar v-model="active" @change="changeTabbar(active)">
      <van-tabbar-item icon="shop">首页</van-tabbar-item>
      <van-tabbar-item icon="records">列表</van-tabbar-item>
      <van-tabbar-item icon="cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact">会员中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        active: 0,
        nowPath: '', // 当前路径
      }
    },
    created(){
      this.changeTabbarActive();
    },
    updated(){
      // 页面发生改变的时候这个生命周期会被触发
      this.changeTabbarActive();
    },
    methods: {
      // 当不是通过点击下边footer 通过页面的路由跳转也可以实现下边图标的高亮
      changeTabbarActive(){
        this.nowPath = this.$route.path
        if(this.nowPath === '/cart'){
          this.active = 2;
        }
      },
      changeTabbar(active){
        switch(active){
          case 0:
            this.$router.push({name:'ShoppingMall'}) // 用name的好处就是无论怎么样改路径都不会受影响
            break;
          case 1:
            this.$router.push({name:'CategoryList'})
            break;
          case 2:
            this.$router.push({name:'Cart'})
            break;
          case 3:
            this.$router.push({name:'Member'})
            break;
        }
      }
    }
  }
</script>

<style scoped>

</style>