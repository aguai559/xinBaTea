// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'wihabing-4gw9evgy6af01a88'
})
const db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try{
    return await db.collection('order').add({
      data:{
        openid:event.openid,
        username:event.username,
        buy:event.buy,
        date:event.date,
        isbuy:event.isbuy,
        image:event.image,
        // quantity:event.quantity,
        price:event.price,
        num:event.num,
        isfinish:event.isfinish,
        totalNum:event.totalNum
      }
    })
  }catch(e){
    console.log(e)
  }
}