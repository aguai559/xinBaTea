Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    openid:'',
    rank:1
  },

  onGotUserInfo(e){
    // this.setData({
    //   userInfo:e.detail.userInfo
    // })
    console.log(e)
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo
        })
        wx.cloud.callFunction({
          name:'login'
        }).then(res=>{
          console.log('云函数调用成功')
          this.setData({
            openid:res.result.openid
          })
          this.data.userInfo.openid=this.data.openid
          wx.setStorageSync('userInfo', this.data.userInfo)
        })
      }
    })


    
      
  },
  toAdmin(){
    wx.navigateTo({
      url: '/pages/adminLogin/adminLogin'
    })
    // console.log(123)
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
    this.setData({
      userInfo:ui,
      openid:ui.openid
    })
    console.log(this.data.userInfo)
    wx.cloud.callFunction({
      name:'getOrder',
      data:{
        openid:ui.openid
      }
    }).then(res=>{
      let len=res.result.data.length
      if(len>10&&len<15){
        this.setData({
          rank:2
        })
      }else if(len>=15&&len<20){
        this.setData({
          rank:3
        })
      }else if(len>=20){
        this.setData({
          rank:4
        })
      }
      console.log(this.data.userInfo)
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