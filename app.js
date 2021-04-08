// app.js
App({
  
  onLaunch() {
    wx.cloud.init({
      env:'wihabing-4gw9evgy6af01a88',
      traceUser:true
    })
  },
  globalData:{
    num:'',
    isfinish:'未出单'
  }

})
