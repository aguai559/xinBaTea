// pages/adminLogin/adminLogin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  submit(e){
    wx.cloud.callFunction({
      name:'loginAdmin'
    }).then(res=>{
      // console.log(res.result.data[0])
      // this.setData({
      //   admin:res.result.data[0]
      // })
      if(e.detail.value.username===res.result.data[0].username&&
        e.detail.value.password===res.result.data[0].password){
          // console.log('success')
          wx.navigateTo({
            url: '/pages/adminOrder/adminOrder'
          })
      }else{
        wx.showToast({
          title: '账号或密码错误'
        })
      }
    })

    
    
  },
  // login(){
  //   wx.cloud.database().collection('admin').get()
  //   .then(res=>{
  //     console.log(res)
  //   })
  //   .catch(err=>{
  //     console.log(err)
  //   })
  // },
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