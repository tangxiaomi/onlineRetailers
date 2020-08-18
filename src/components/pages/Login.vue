<template>
  <div>
    <van-nav-bar
      title="用户登录"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <div class="register-panel">
      <van-field
          v-model="userName"
          label="用户名"
          icon="clear"
          placeholder="请输入用户名"
          required
          @click-icon="userName = ''"
          :error-message="usernameErrorMsg"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        :error-message="passwordErrorMsg"
      />
      <div class="register-button">
        <van-button type="primary" size="large" :loading="openLoading" @click="loginAction">登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import  axios from 'axios';
  import url from '@/serviceAPI.config.js';
  import { Toast } from 'vant' // 提示插件
  export default {
    create(){
     // 页面初始化的时候 只需登录一次
     if(localStorage.userInfo){
       Toast.success('您已经登录');
       this.$router.push('/');
     }
    },
    methods: {
      goBack(){
        // 可以直接返回前一页
        this.$router.go(-1);
      },
      loginAction(){
        this.checkForm() && this.$router.push('/');
      },
      axiosRegisterUser(){ // 由于么有接入后端的接口所以暂时没有调用次方法
        // 注册用户方法
        axios({
          url: url.login,
          method: 'post',
          data: {
            userName: this.username,
            password: this.password
          }
        }).then(response => {
          if(response.data.code === 200){
            // 等待本地存储成功之后(括号就是里边的逻辑)  将登录信息存储到localStrorage中
           new Promise((resolve, reject) => {
            localStorage.userInfo = {userName: this.userName}
            setTimeout(() => {
              resolve()
            },500) // 半秒钟应该存储好了
          }).then(() => {
             Toast.success('登录成功');
             this.$router.push('/');
          }).catch(err => {
             Toast.fail('登录失败')
             console.log(err)
          })
          } else {
            Toast.fail('登录失败')
            this.openLoading = false;
          }
        }).catch((error) => {
         Toast.fail('登录失败')
         this.openLoading = false;
        })
      },
      checkForm(){
        // 验证表单是否合格
        let isSuccess = true;
        if(this.userName.length < 5 ){
          isSuccess = false;
          this.usernameErrorMsg = '用户名不能小于5位数'
        } else {
          this.usernameErrorMsg = ''
        }
        if(this.password.length < 5){
          isSuccess = false;
          this.passwordErrorMsg = '密码不能小于6位数'
        } else {
          this.passwordErrorMsg = ''
        }
        return isSuccess;
      }
    },
    data() {
      return {
        userName: '',
        password: '',
        openLoading: false, // 是否开启用户的loading 解决用户重复提交的可能
        usernameErrorMsg: '', // 用户名出现错误的时候的提示信息
        passwordErrorMsg: '', // 用户密码错误的时候还的提示信息
      }
    },
  }
</script>

<style scoped>
  .register-panel{
        width:96%;
        border-radius: 5px;
        margin:20px auto;
        padding-bottom:50px;
    }

  .register-button{
        padding-top:10px;
    }
</style>