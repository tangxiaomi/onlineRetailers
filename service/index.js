const Koa = require('koa');
const app = new Koa();
const { connect, initSchemas } = required('./database/init.js');
const mongoose = require('mongoose');

;(async () => { // ?
  await connect();
  initSchemas();
  const User = mongoose.model('User');
  let oneUser = new userScheme({userName: 'JS', password: '123456'});
  oneUser.save().then(() => {
    console.log('插入成功')
  })
  let user = await User.findOne({}).exec()
  console.log(user);
})()

app.use(async(ctx) => {
  ctx.body = '<h1>hello koa2</h1>'
})

app.listen(3000, ()=> {
  console.log('service start success')
})
