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
            <van-tabs v-model="active">
              <van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_CATEGORY_NAME"></van-tab>
            </van-tabs>
          </div>
          <div id="list-div">
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
              <van-list v-model="loading" :finished="finished" @load="onload">
                  <div class="list-item" v-for="item in list" :key="item">
                    {{ item }}
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
  export default {
    data(){
      return{
        category: [], // 大类类别
        categorySub: [], // 小类类别
        categoryIndex: 0,
        active: 0, // 第一个tab被激活
        loading: false, // 是否可以上拉加载 false代表可以上拉加载
        finished: false, // 上拉加载是否有数据
        list: [], // 商品数据
        isRefresh: false, // 是否下拉刷新
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
      document.getElementById('leftnav').style.height = winHeight - 46 + 'px';
      document.getElementById('list-div').style.height = winHeight - 90 + 'px';
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

      clickCategory(index, id){
        this.categoryIndex = index;
        this.active = 0;
        // this.getCategorySubByCategoryId(id);
      },

      //上拉加载
      onload(){
        setTimeout(() => {
          for(let i=0; i<10; i++){
            this.list.push(this.list.length + 1 );
          }
          this.loading = false;
          if(this.list.length >= 40){
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
          this.list = [];
          this.onload();
        }, 500)
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
   text-align: center;
   line-height: 80px;
   border-bottom: 1px solid #f0f0f0;
 }
 #list-div{
   overflow: scroll;
 }
</style>
