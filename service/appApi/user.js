// 模块 就是个service/controller
const Router = require('koa-route');
const mongoose = require('mongoose');


let router = new Router();
router.get('/', async(ctx) => {
  ctx.body = '这是用户操作页面'
})

router.post('/register', async(ctx) => {
  // 取得Model
  const User = mongoose.model('User');
  // 把前端接收的POST数据封装成一个新的user对象
  let newUser = new User(ctx.request.body);
  // 用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
  await newUser.save().then(() => {
    ctx.body = {
      code: 200,
      message: '注册成功'
    }
  }).catch(error => {
    ctx.body = {
      code: 500,
      message: 'error'
    }
  })
})

router.post('./login', async(ctx) => {
  let loginUser = ctx.request.body;
  let userName = loginUser.username;
  let password = loginUser.password;

  // 引入User中的model
  const user = mongoose.model('User');
  await User.findOne({userName}).exec().then((result) => {
    console.log(result)
    if(result){
      //用户名存在的时候 再去比对密码 result.password这是数据库的变量
      let newUser = new User();
      await newUser.comparePassword(password, result.password)
      .then(isMatch => {
        ctx.body = {code: 200, messsage: isMatch}
      })
      .catch(error => {
        ctx.body = {code: 500, messsage: error}
      })
    } else {
      //用户名不存在的时候
    }
  }).catch(error => {
    ctx.body={code: 500, message: error}
  })
})

module.exports = routes;