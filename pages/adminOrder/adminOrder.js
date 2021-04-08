// pages/adminOrder/adminOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList:[]
  },
  finish(e){
    console.log(this.data.orderList[e.currentTarget.dataset.id]._id)
    wx.cloud.callFunction({
      name:'getAllOrder',
      data:{
        id:this.data.orderList[e.currentTarget.dataset.id]._id,
        isfinish:'已出单，请尽快领取'
      }
    }).then(res=>{
      // console.log(res)
      // console.log(this.data.orderList[e.currentTarget.dataset.id])
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database()
    var that=this
    db.collection('order').where({
      // isfinish:"未出单"
    }).watch({
      onChange: function (snapshot) {
        // 监控数据发生变化时触发
        // console.log('docs\'s changed events', snapshot.docChanges)
        // console.log('query result snapshot after the event', snapshot.docs)
        // console.log('is init data', snapshot.type === 'init')
        // console.log(snapshot.docs)
        snapshot.docs.reverse()
        console.log(snapshot.docs)
        that.setData({
          orderList:snapshot.docs
        })
        // console.log(that.data.orderList)
        // const innerAudioContext = wx.createInnerAudioContext()
        // innerAudioContext.autoplay = true
        // innerAudioContext.src = 'cloud://wihabing-4gw9evgy6af01a88.7769-wihabing-4gw9evgy6af01a88-1305214762/audio/order.mp3'
        // innerAudioContext.onPlay(() => {
        // console.log('开始播放')
        // })
        // innerAudioContext.onError((res) => {
        // console.log(res.errMsg)
        // console.log(res.errCode)
        // })
      },
      onError:(err) => {
        console.error(err)
      }
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

  }
})