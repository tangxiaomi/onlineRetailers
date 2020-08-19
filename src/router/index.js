import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import ShoppingMall from '@/components/pages/ShoppingMall' // @符号就是表示src
import  Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Goods from '@/components/pages/Goods'
import CategoryList from '@/components/pages/CategoryList'
import Cart from '@/components/pages/Cart'
import Member from '@/components/pages/Member'
import Main from '@/components/pages/Main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      // 这里的路由会加载到父组件main的router插槽中
      children: [
        {
          path: '/',
          name: 'ShoppingMall',
          component: ShoppingMall
        },
        {
          path: '/categoryList',
          name: 'CategoryList',
          component: CategoryList
        },
        {
          path: '/cart',
          name: 'Cart',
          component: Cart
        },
        {
          path: '/member',
          name: 'Member',
          component: Member
        }
      ]
    },
    // 这里的路由会加载到app中的router插槽中
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
  ]
})
