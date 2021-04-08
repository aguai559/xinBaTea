// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList:[],
    sum:0,
    buy:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const ui = wx.getStorageSync('userInfo')
    wx.cloud.callFunction({
      name:'getOrder',
      data:{
        openid:ui.openid
      }
    }).then(res=>{
      res.result.data.reverse()
      // let buy=res.result.data.buy.join(',')
      // console.log(res.result.data.buy)
      // res.result.data.forEach(item=>{
      //   item.buy.join()
      // })
      this.setData({
        orderList:res.result.data,
        // buy
      })
      // console.log(this.data.orderList)

    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})