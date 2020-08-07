// 模块 就是个service/controller
const Router = require('koa-route');

let router = new Router();
router.get('/', async(ctx) => {
  ctx.body = '这是用户操作页面'
})
router.get('/register', async(ctx) => {
  ctx.body="用户注册接口"
})