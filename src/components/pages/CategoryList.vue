<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="类别列表"/>
    </div> 
    <div>
      <van-row>
        <van-col span="6">
          <div id="leftnav">
            <ul>
              <li @click="clickCategory(index, item.ID)" :class="{categoryActive: categoryIndex === index}" v-for="(item, index) in category" :key="index">
                {{ item.MALL_CATEGORY_NAME }}
              </li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategortSub">
            <van-tabs v-model="active" @click="onClikCategorySub">
              <van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_CATEGORY_NAME"></van-tab>
            </van-tabs>
          </div>
          <div id="list-div">
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
              <van-list v-model="loading" :finished="finished" @load="onload">
                  <div class="list-item" @click="goGoodsInfo(item.ID)" v-for="(item, index) in goodList" :key="index">
                   <div class="list-item-img">
                     <img :src="item.IMAGE" width="50%" height="50%" :onerror="errorImg"/>
                   </div>
                   <div class="list-item-text">
                     <div>{{ item.NAME }}</div>
                    <div>￥{{ item.PRICE | moneyFilter }}</div>
                   </div>
                  </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import url from '@/serviceAPI.config.js'
  import { Toast } from 'vant' 
  import { toMoney } from '@/filter/moneyFilter.js'
  export default {
   filters: {
    moneyFilter(money) {
    return toMoney(money)
    }
   },
    data(){
      return{
        category: [], // 大类类别
        categorySub: [], // 小类类别
        categoryIndex: 0,
        active: 0, // 第一个tab被激活
        loading: false, // 是否可以上拉加载 false代表可以上拉加载
        finished: false, // 上拉加载是否有数据
        isRefresh: false, // 是否下拉刷新
        page: 1, // 商品列表的页数
        goodList: [], // 商品列表数据
        categorySubId: '', // 商品子类的Id
        errorImg: ''
        // errorImg: 'this.src="'+require('@/assets/empty_img')+'"', // 这个替补图片（假设这个图片存在）
      }
    },
    created(){
      this.category = [
        {ID: 1, MALL_CATEGORY_NAME: '新鲜水果'},
        {ID: 2, MALL_CATEGORY_NAME: '中外名酒'},
        {ID: 3, MALL_CATEGORY_NAME: '个人护理'},
        {ID: 4, MALL_CATEGORY_NAME: '食品饮料'},
      ],
      this.categorySub = [
        {ID: 1, MALL_CATEGORY_NAME: '白酒'},
        {ID: 2, MALL_CATEGORY_NAME: '海外直采'},
        {ID: 3, MALL_CATEGORY_NAME: '洋酒'},
        {ID: 4, MALL_CATEGORY_NAME: '葡萄酒'},
      ]
    },
    mounted(){
      //能操作dom的只有在这个生命周期中 设置左侧导航栏撑满整个页面
      let winHeight = document.documentElement.clientHeight; // 窗口高度
      document.getElementById('leftnav').style.height = winHeight - 46 - 50 + 'px'; // 把头和底减去
      document.getElementById('list-div').style.height = winHeight - 90 - 50 + 'px';
    },
    methods:{
      getCateGory(){
        axios({
          url: url.getCateGory,
          method: 'get',
        })
        .then(response => {
          // 从后台获取数据
          if(response === 200 && response.data.message){
            this.category = response.data.message
          } else {
            Toast('服务器错误，数据取得失败')
          }
        })
        .catch(error => {
          console.log(error)
        })
      },

      //根据大类ID读取小类类别列表
      getCategorySubByCategoryId(categoryId){
        axios({
              url:url.getCategorySubList,
              method:'post',
              data:{categoryId:categoryId}
          })
          .then(response=>{
              if(response.data.code == 200 && response.data.message ){
                  this.categorySub=response.data.message
                  this.active = 0
              }else{
                  Toast('服务器错误，数据取得失败')
              }  
          })
          .catch(error=>{
              console.log(error)
          })
      },

      // 获取子类的商品详情
      getGoodList(){
         axios({
              url:url.getGoodListByCategorySubList,
              method:'post',
              data:{
                  categorySubId: this.categorySubId,
                  page: this.page
                }
          })
          .then(response=>{
              if(response.data.code == 200 && response.data.message.length ){
                  this.page++;
                  this.goodList=this.goodList.concat(response.data.message);
              }else{
                // 说明长度是0没有数据了
                this.finished = true;
              }
              this.loading = false;
          })
          .catch(error=>{
              console.log(error)
          })
      },

     // 点击大类类别的时候
      clickCategory(index, id){
        this.categoryIndex = index;
        this.active = 0;
        this.page = 1;
        this.finished = false;
        this.goodList = [];
        this.categorySubId = this.categorySub[0].ID;
        this.onload();
        // this.getCategorySubByCategoryId(id);
      },

    // 点击tab获取子类的商品详情
      onClikCategorySub(index, title){
        this.categorySubId = this.categorySub[index].ID;
        this.goodList = [];
        this.finished = false;
        this.page = 1;
        this.onload();
      },

      //上拉加载
      onload(){
        setTimeout(() => {
          // this.categorySubId = this.categorySubId ? this.categorySubId : this.categorySub[0].ID;
          // this.getGoodList();
          for(let i=0; i<10; i++){
            const obj = {
              "IMAGE": "http://images.baixingliangfan.cn/compressedPic/20180415120500_6504.jpg",
              "PRICE": 3.90,
              "NAME": `美汁源果粒奶优水果饮料蜜桃450ml/瓶${this.goodList.length + 1}`}
            this.goodList.push(obj);
          }
          this.loading = false;
          if(this.goodList.length >= 40){
            this.finished = true; // 表示没有数据了
          }
        }, 2000)
      },

      //下拉刷新
      onRefresh(){
        // 半秒之后才执行刷新
        setTimeout(() => {
          this.isRefresh = false;
          this.finished = false;
          this.goodList = [];
          this.page = 1;
          this.onload();
        }, 500)
      },

      //跳转到商品详细页面
      goGoodsInfo(id){
        // 路由配置的name是Goods  使用name就得用户编程式导航的params进行参数的传递  如果使用的时候path: /goods则使用的就是query  当然用什么传递就用什么接收
        this.$router.push({name: 'Goods', params:{goodsId: id}})
      }
    }
  }
</script>

<style scoped>
 #leftnav ul li{
   line-height: 2rem;
   border-bottom: 1px solid #e4e7ed;
   padding: 3px;
   font-size: 0.8rem;
   text-align: center;
 }
 .categoryActive{
   background-color: red;
 }
 .list-item{
  display: flex;
  flex-direction: row;
  font-size:0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding:5px;
 }
 #list-div{
   overflow: scroll;
 }
 .list-item-img{
    flex:8;
 }
.list-item-text{
    flex:16;
    margin-top:10px;
    margin-left:10px;
 }
</style>
