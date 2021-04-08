// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'wihabing-4gw9evgy6af01a88'
})

// 云函数入口函数
exports.main = async (event, context) => {
  return cloud.database().collection('goods').get()
}