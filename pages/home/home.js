// pages/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    flash:[]
  },
  scan(){
    const ui = wx.getStorageSync('userInfo')
    
      if(ui.openid===undefined){
        wx.showToast({
          title: '请先登录'
        })
        return;
        console.log(123)
       }else{
        wx.scanCode({
          onlyFromCamera: true,
          success (res) {
          console.log(res)
          app.globalData.num = res.result
          console.log(app.globalData.num)
          wx.switchTab({
            url: '/pages/menu/menu',
            })
         }
      })
    }
  },
  goMarket(){
    wx.switchTab({
      url: '/pages/menu/menu',
    })
  },
  goMap(){
    wx.navigateTo({
      url: '/pages/map/map',
    })
  },
  goPeople(){
wx.navigateTo({
  url: '/pages/people/people',
})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.database().collection('swiper').where({}).get()
      .then(res=>{
      // console.log(res.data)
      this.setData({
        list:res.data
      })
    }).catch(err=>{
      console.log(err)
    });
    wx.cloud.database().collection('flash').get()
    .then(res=>{
    // console.log(res.data)
    this.setData({
      flash:res.data
    })
    // console.log(this.data.flash)
  }).catch(err=>{
    console.log(err)
  })
   

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

  },
  
})