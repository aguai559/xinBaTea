// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'wihabing-4gw9evgy6af01a88'
})

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
  // return cloud.database().collection('user').where({
  //   openid:event.openid
  // }).get()
  try{
    return cloud.database().collection('order').where({
      openid:event.openid
    }).get()
  }catch(e){
    console.log(e)
  }
}