// 商品详情页
<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar
      title="商品详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      />
    </div>
    <div class="topimage-div">
      <img :src="goodsInfo.image" width="100%">
    </div>
    <div class="goods-name">
      {{goodsInfo.name}}
    </div>
    <div class="goods-price">
      价格：{{goodsInfo.price | moneyFilter}}
    </div>
    <div>
      <!-- swipeable实现左右滑动切换tabs页面 -->
      <!-- sticky让tab自动吸顶 -->
      <van-tabs swipeable sticky>
        <van-tab title="商品详情">
          <div v-html="goodsInfo.detail" class="detail">
          </div>
        </van-tab>
        <van-tab title="评论">
          评论制作中
        </van-tab>
      </van-tabs>
    </div>

    <div class="goods-bottom">
      <div>
        <van-button size="large" type="primary">加入购物车</van-button>
      </div>
      <div>
        <van-button size="large" type="danger">直接购买</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import { Toast } from 'vant' 
import { toMoney } from '@/filter/moneyFilter.js'
  export default {
    data() {
      return {
       goodsId: '',
       goodsInfo: {}, // 商品详细信息
      }
    },
    filter: {
      moneyFilter(money) {
       return toMoney(money)
     }
    },
    created(){
      // 获取页面跳转的路由传递的参数
      this.goodsId = this.$route.query.goodsId ?  this.$route.query.goodsId :  this.$route.params.goodsId
      console.log(this.GoodsId);
      this.goodsInfo = {
      "mallPrice": 3.90,
      "image": "http://images.baixingliangfan.cn/compressedPic/20180415120500_6504.jpg",
      "goodsId": "fb0f913950944b66a97ae262ad14609a",
      "price": 3.90,
      "detail": '<img src="http://images.baixingliangfan.cn/compressedPic/20180415115202_8432.jpg" width="100%">,<img src="http://images.baixingliangfan.cn/compressedPic/20180415121351_6470.jpg" width="100%">,<img src="http://images.baixingliangfan.cn/compressedPic/20180415120956_8491.jpg" width="100%">',
      "name": "美汁源果粒奶优水果饮料蜜桃450ml/瓶"
    }
    },
    methods: {
      // 调后端接口获取商品详情的数据
      getInfo(){
        axios({
          url: url.geDetailGoodsInfo,
          method: 'post',
          data: {goodsId: this.goodsId}
        })
        .then(response => {
          // 从后台获取数据
          if(response === 200 && response.data.message){
            this.goodsInfo = response.data.message
          } else {
            Toast('服务器错误，数据取得失败')
          }
        })
        .catch(error => {
          console.log(error)
        })
      },
      onClickLeft(){
        //编程式路由
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>
  .goods-name .goods-price{
    background-color: #fff;
  }
  .goods-bottom{
    position: fixed;
    bottom: 0;
    left: 0px;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-flow: nowrap;
  }
  .goods-bottom>div{
    flex: 1;
    padding: 5px;
  }
</style>
