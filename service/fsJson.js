const fs = require('fs');
//将goods.json文件里的数据进行提纯
fs.readFile('./goods.json', 'utf8', function(err, data){
  let newData = JSON.parse(data)
  let pushData = []
  // 只要image不为空就是我们需要的数据
  newData.RECODES.map(function(value, index){
    if(value.IMAGE1){
      pushData.push(value);
    }
  })
  fs.writeFile('./newGoods.json', JSON.stringify(pushcode), function(err){
    if(err){
      console.log('写文件失败')
    } else{
      console.log('写文件成功')
    }
  })
})
