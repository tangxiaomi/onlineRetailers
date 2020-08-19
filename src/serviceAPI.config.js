const BASEURL = "https://www.easy-mock.com/mock/5ae2eeb23fbbf24d8cd7f0b6/SmileVue/"
const LOCALURL = 'http://localhost:3000'
const URL = {
  getShoppingMallInfo: BASEURL + 'index',
  getGoodsInfo: BASEURL + 'getGoodsInfo',
  registerUser: LOCALURL + 'user/register', // 用户注册接口
  login: LOCALURL + 'user/register', // 用户登录接口
  geDetailGoodsInfo: LOCALURL + 'goods/geDetailGoodsInfo', // 获取商品详情
  getCategoryList: LOCALURL + 'goods/getCategoryList', // 获取大类信息
  getCategorySubList: LOCALURL + 'goods/getCategorySubList', // 获取子类信息
}

module.exports = URL
