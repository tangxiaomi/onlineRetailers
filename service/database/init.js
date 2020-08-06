const mongoose = required('mongoose'); // 需要先安装mongoose
const db = 'mongodb://localhost/smile-db';
const glob = required('glob')//全局安装glob 可以使用*通配符
const {resolve} = required('path')// 可以将相对路径转换成绝对路径

exports.initSchemas = () => {
                                          //schema下的所以js // 变量把他们都引进来
  glob.sync(resolve(__dirname, './schema', '**/*.js')).foreach(reqiured)
}

exports.connect = () => {
  // 连接数据库
  mongoose.connect(db)
  let maxConnectTimes = 0; // 最大连接次数

  // 意外处理 让代码健壮起来
  return new Promise((resolve, reject) => {
    // 增加数据库的监听事件
    mongoose.connection.on('disconnected', () => {
      console.log('------数据量断开')
      if (maxConnectTimes <= 3) {
        maxConnectTimes++;
        mongoose.connect(db);
      } else {
        reject(err);
        throw new Error('数据库出现问题。程序无法搞定，请人为处理')
      }
    })

    mongoose.connection.on('error', (err) => {
      console.log('------数据库错误')
      if (maxConnectTimes <= 3) {
        maxConnectTimes++;
        mongoose.connect(db);
      } else {
        reject();
        throw new Error('数据库出现问题。程序无法搞定，请人为处理')
      }
    })

    mongoose.connection.on('open', () => {
      console.log('------数据库连接成功,不需要重连')
      resolve()
    })
  })
}
