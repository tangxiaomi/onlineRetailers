<template>
<!-- 外层必须有一个div包裹 -->
  <div>
    <div class="nav-bar">
      <van-nav-bar title="购物车"/>
    </div>
    <div class="cart-title">
      <van-button size="small" type="danger" @click="clearCart">清空购物车</van-button>
    </div>
    <!-- 显示购物车中的商品 -->
    <div class="cart-list">
      <div class="list-row" v-for="(item, index) in cartInfo" :key="index">
        <div class="list-img">
          <img :src="item.image" width="50%" height="50%">
        </div>
        <div class="list-text">
          <div class="list-name">{{item.name}}</div>
          <div class="list-control">
            <van-stepper v-model="item.count" />
          </div>
        </div>
        <div class="list-price">
          <div> 
          ￥{{ item.price | moneyFilter }}
          </div>
          <div>
           x{{ item.count }}
          </div>
          <div class="allPrice">
           ￥{{ item.price * item.count | moneyFilter}}
          </div>
        </div>
      </div>
    </div>
    <!-- 显示总价格 -->
    <div class="total-money">
      商品总价格: ￥{{totalMoney | moneyFilter}}
    </div>
  </div>
</template>

<script>
  import { toMoney } from '@/filter/moneyFilter.js'
  export default {
   filters: {
     moneyFilter(money) {
     return toMoney(money)
     }
   },
    data() {
      return {
        cartInfo: [],
        isEmpty: false,
      }
    },
    created(){
      this.getCartInfo();
    },
    // 计算属性 就是类似于监听 你所需要的变量不在data中声明，但是需要使用要data中的其他数据来计算出你所使用数据的结果???
    computed:{
      totalMoney(){
        let allMoney = 0;
        this.cartInfo.forEach((item, index) => {
          allMoney += item.price*item.count
        })
        localStorage.cartInfo = JSON.stringify(this.cartInfo);
        return allMoney;
      }
    },
    methods: {
      // 获取购物车的内容
      getCartInfo() {
        if(localStorage.cartInfo){
          // 从localStorage拿数据，因为里边存储的是字符串所以要转换一下
          this.cartInfo = JSON.parse(localStorage.cartInfo);
          console.log(this.cartInfo);
        }
        this.isEmpty = this.cartInfo.length > 0 ? true : false;
      },
      clearCart(){
        localStorage.removeItem('cartInfo');
        this.cartInfo = [];
      }
    },
  }
</script>

<style scoped>
  .cart-title{
    height: 2rem;
    line-height: 2rem;
    border-bottom: 1px solid #e4e7ed;
    padding: 5px;
    text-align: right;
  }
  .list-row{
    display: flex;
   flex-direction: row;
   flex-wrap: nowrap;
   padding: 0.5rem;
   font-size: .8rem;
   border-bottom: 1px solid #e4e7ed;
  }
  .list-img{
    flex: 6;
  }
  .list-test{
    flex: 14;
    padding-left: 10px;
  }
  .list-control{
    padding-top: 10px;
  }
  .list-price{
    flex: 4;
    text-align: right;
  }
  .allPrice{
    color: red;
  }
  .total-money{
    text-align: right;
    border-bottom: 1px solid #e4e7ed;
    padding: 5px;
  }
</style>
