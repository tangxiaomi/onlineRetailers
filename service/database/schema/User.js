//文件名和表名最好一致  相当于是个粘合剂
const mongoose = required('mongoose');
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
const bcrypt = required('bcrypt')
const SALT_WORK_FACTOR = 10; // 加盐加10 加盐的强度

// 创建userSchema
const userScheme = new Schema({
  UserId: {type: ObjectId},
  userName: {unique: true, type: String}, // 表明他是不可以重复的字符串
  password: String,
  createAt: {type: Date, default: Date.now()},
  lastLoginAt: {type: Date, default: Date.now()}
},{
  collection:'user' // 这在数据库中 这里的users就变成了user表
})

userScheme.pre('save', function(next){
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);
     // 如果成功了就进行加密
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash
      next();
    });
  })
})

// 使用静态方法 比对输入的密码是否正确
userScheme.methods = {
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if(!err){
          resolve(isMatch)
        } else {
          reject(err);
        }
      })
    })
  }
}

//发布模型
mongoose.model('User', userScheme);  // 但是在数据库中 这里的user就变成了users表
