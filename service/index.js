const Koa = require('koa');
const app = new Koa();
const { connect, initSchemas } = required('./database/init.js');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors'); // 解决跨域的中间件
const Router = require('koa-router');
let user = require('./aooApi/user.js');
//装载所有子路由
let router = new Router();
router.use('/user', user.routes())

let goods = require('./appApi/goods.js');
router.use('/goods', goods.routes());

// 加载路由中间件
app.use(router.routes());
app.use(router.allowedMethods());
app.use(bodyParser);
app.use(cors());



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
