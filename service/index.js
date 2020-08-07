const Koa = require('koa');
const app = new Koa();
const { connect, initSchemas } = required('./database/init.js');
const mongoose = require('mongoose');

const Router = require('koa-router');
let user = require('./aooApi/user.js');
//装载所有子路由
let router = new Router();
router.use('/user', user.routes())

// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods());



// ;(async () => { // ?
//   await connect();
//   initSchemas();
//   const User = mongoose.model('User');
//   let oneUser = new userScheme({userName: 'JS', password: '123456'});
//   oneUser.save().then(() => {
//     console.log('插入成功')
//   })
//   let user = await User.findOne({}).exec()
//   console.log(user);
// })()

app.use(async(ctx) => {
  ctx.body = '<h1>hello koa2</h1>'
})

app.listen(3000, ()=> {
  console.log('service start success')
})
