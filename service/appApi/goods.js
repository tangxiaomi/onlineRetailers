const Koa = require('koa')
const app = new Koa()
const Router = require ('koa-router')
let router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')


router.get('/insertAllGoodsInfo',async(ctx)=>{

     fs.readFile('./newGoods.json','utf8',(err,data)=>{
        data=JSON.parse(data)
        let saveCount=0
        const Goods = mongoose.model('Goods')
        data.map((value,index)=>{
            console.log(value)
            let newGoods = new Goods(value)
            newGoods.save().then(()=>{
                saveCount++
                console.log('成功'+saveCount)
            }).catch(error=>{
                 console.log('失败：'+error)
            })
        })


    })
    ctx.body="开始导入数据"
})

// 获取商品详情的接口
router.post('/geDetailGoodsInfo', async(ctx) => {
    let goodId = ctx.request.body.goodsId;
    const Goods = mongoose.model('Goods');
    await Goods.findOne({ID: goodsId}).exec()
    .then(async(result) => {
        ctx.body={code: 200, message:result}
    })
    .catch(error => {
        ctx.body={code: 500, message:error}
    })
})

// 获取商品详的大类别
router.get('/getCategoryList', async(ctx) => {
    try{
       const Category = mongoose.model('Category');
       let result =  await Goods.findOne({ID: goodsId}).exec()
       ctx.body={code: 200, message:result}
    }catch(error){
        ctx.body = {code: 500, message: error}
    }
})

// 获取商品详的小类别
router.post('/getCategorySubList', async(ctx) => {
    try{
        let categoryId = ctx.request.body.category; // 获取传进来的id
        const CategorySubList = mongoose.model('CategorySubList');
        let result =  await Goods.findOne({MALL_CATEGORY_ID: categoryId}).exec()
        ctx.body={code: 200, message:result}
     }catch(error){
         ctx.body = {code: 500, message: error}
     }
})

// 根据类别获取商品列表
router.get('/getGoodListByCategorySubList', async(ctx) => {
    try{
        // 后台分页
        let categoryId = ctx.request.body.categorySubId; // 获取传进来的子类id
        let page = ctx.request.body.page // 当前页数
        let num  = 10 // 每页显示的数量
        let start = (page - 1)*num// 下一页开始的index
        const Goods = mongoose.model('Goods');
        let result =  await Goods.findOne({SUB_ID: categorySubId}).skip(start).limit(num).exec()
        ctx.body={code: 200, message:result}
     }catch(error){
         ctx.body = {code: 500, message: error}
     }
})


module.exports=router;
