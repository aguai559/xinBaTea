var time = require("../../utils/utils")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
//   async function () {
//   console.log(this.openid = await getApp().getOpenid())
// },
  data: {
    listData:[],
    currentIndex:0,
    toView:'a0',
    cartList:[],
    currentType:0,
    currentItem:0,
    // 购物车动画
    animationData: {},
    animationMask: {},
    maskVisual: "hidden",
    maskFlag: true,
    totalNum:0,
    totalPrice:0,
    heightArr:[]
  },
    Toggle(){
    var that = this;
    var arr = this.data.cartList
    if (arr.length > 0) {
      if (that.data.maskVisual == "hidden") {
        that.cascadePopup()
      } else {
        that.cascadeDismiss()
      }
    } else {
      that.cascadeDismiss()
    }
    },
    // 打开购物车方法
    cascadePopup: function () {
      var that = this;
      // // 购物车打开动画
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease-in-out',
        delay: 0
      });
      that.animation = animation;
      animation.translate(0, -285).step();
      that.setData({
        animationData: that.animation.export(),
      });
      // 遮罩渐变动画
      var animationMask = wx.createAnimation({
        duration: 200,
        timingFunction: 'linear',
      });
      that.animationMask = animationMask;
      animationMask.opacity(0.8).step();
      this.setData({
        animationMask: that.animationMask.export(),
        maskVisual: "show",
        maskFlag: false,
      });
    },
    // 关闭购物车方法
    cascadeDismiss: function () {
       var that = this
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease-in-out',
        delay: 0
      });
       // 购物车关闭动画
      that.animation = animation;
      that.animation.translate(0, 285).step();
      that.setData({
        animationData: that.animation.export()
      });
      // 遮罩渐变动画
      var animationMask = wx.createAnimation({
        duration: 200,
        timingFunction: 'linear',
      });
      that.animationMask=animationMask
      that.animationMask.opacity(0).step();
      that.setData({
        animationMask: that.animationMask.export(),
      });
      // 隐藏遮罩层
      this.setData({
        maskVisual: "hidden",
        maskFlag: true
      });
    },
  click(e){
    // console.log(e)
    this.setData({
      currentIndex:e.currentTarget.dataset.index,
      toView:'a'+e.currentTarget.dataset.index
    })
  },
  addCount(e){
    e.currentTarget.dataset.item.quantity+=1;
    this.data.cartList.splice(e.currentTarget.dataset.inx,1,e.currentTarget.dataset.item)
    this.setData({
      cartList:this.data.cartList
    })
    this.getPrice()
    
  },
  disCount(e){
    // console.log(e.currentTarget.dataset.item)
    e.currentTarget.dataset.item.quantity-=1
    if( e.currentTarget.dataset.item.quantity>0){
      // e.currentTarget.dataset.item.quantity-=1
      this.data.cartList.splice(e.currentTarget.dataset.ind,1,e.currentTarget.dataset.item)
      this.setData({
        cartList:this.data.cartList
      })
    }else if(e.currentTarget.dataset.item.quantity==0){
      this.data.cartList.splice(e.currentTarget.dataset.ind,1)
       this.setData({
        cartList:this.data.cartList
      })
    }   
    if(this.data.cartList.length==0){
      this.Toggle()
    }
    this.getPrice()
  },
  getPrice(){
    var cartList=this.data.cartList
    var totalP = 0
    var totalN = 0
    for (var i in cartList) { // 循环列表得到每个数据
      totalP += cartList[i].quantity * cartList[i].price; // 所有价格加起来     
      totalN += cartList[i].quantity
    }
    this.setData({ // 最后赋值到data中渲染到页面
      cartList: cartList,
      totalNum: totalN,
      totalPrice: totalP
    });
  },
  addCart(e){
    // console.log(e)
    this.setData({
      currentType:e.currentTarget.dataset.type,
      currentItem:e.currentTarget.dataset.index
    })
    // var cartList=this.data.cartList
    // console.log(this.data.listData[this.data.currentType].good[this.data.currentItem])
    
    var item =this.data.listData[this.data.currentType].good[this.data.currentItem]
    
    var st=0
    
     if(this.data.cartList.length==0){
      item.quantity=0
      item.quantity++
      this.data.cartList.push(item)
       
     }else{
       for(var i in this.data.cartList){
        
        if(this.data.cartList[i].name===item.name){
          // console.log(cartList[i])
          this.data.cartList[i].quantity++
          st=1
          
        }
       }if(st==0){
        item.quantity=0
        item.quantity++
        // console.log(123)
        this.data.cartList.push(item)
        
       }
     }
    //  console.log(this.data.cartList)
     this.getPrice()
     wx.showToast({
       title: '已加入购物袋',
       icon:'none'
     })

     
    // cartList.push(item)
    // console.log(cartList)
    // for(var i in cartList){
    //   if(cartList[i].name==item.name){

    //   }
    // }


    // console.log(cartList,item.name)

    // for (var i=0;i<=cartList.length;i++) {
      
    // if(cartList.length>0){
    //   if(cartList[i].name ==item.name){
    //     cartList[i].quantity++
    //     console.log('1')
    //   }else{
    //     // cartList[i].quantity=0;
    //     cartList.push(item)
    //     console.log('2')
    //   }
    // }
      // if(cartList[i].name ==item.name){
      //   cartList[i].quantity++
      //   console.log('1')
      // }else{
      //   // cartList[i].quantity=0;
      //   cartList.push(item)
      //   console.log('2')
      // }
    // }


    this.setData({
      cartList:this.data.cartList
    })
    
    // console.log(this.data.cartList)

  },
  cleanList(){
    var cartLists= this.data.cartList
    // cartLists.forEach(item=>{
    //   item.quantity=0

    // })
    cartLists.length=0

    
    this.setData({
      cartList:cartLists,
      totalNum:0,
      totalPrice:0
    })
    // console.log(this.data.cartList)
    this.Toggle()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name:'getData'
    }).then(res=>{
      let data = [];
      res.result.data.forEach(item=>{
        data.push(item);
        let len = data.length;
        let good = [];
        item.good.forEach(items=>{
          
          good.push(JSON.parse(items))
          
        });
        data[len- 1].good = good;
      })
      // console.log(res.result.data)
      this.setData({
        listData:res.result.data
      })
      this.data.listData.forEach(item=>{
        item.good.forEach(items=>{
          items.quantity=0
        })
      })
      // console.log(this.data.listData)
    }).catch(err=>{
      console.log(err)
    })
   
    // this.getHeightArr()
    setTimeout(() => {
      let query = wx.createSelectorQuery();
      query.selectAll('.right').boundingClientRect((rect)=> {
        rect.forEach(ele => {
          this.calculateHeight(ele.height);
        })
        console.log(rect)
      }).exec();

    }, 2000);
    
  },
  scroll(e) {
    let scrollHeight = e.detail.scrollTop;
    let index = this.calculateIndex(this.data.heightArr,scrollHeight);
    this.setData({
      currentIndex: index
    })
    console.log(this.data.currentIndex)

  },
  // 计算滚动的区间
  calculateHeight(height) {
    if(!this.data.heightArr.length) {
      this.data.heightArr.push(height)
    }else {
      // this.data.heightArr.forEach(ele => {
      //   height += ele
      // })
      height +=this.data.heightArr[this.data.heightArr.length-1]
      this.data.heightArr.push(height);
    }
  },
  // 计算左边选中的下标
  calculateIndex(arr, scrollHeight) {
    let index= '';
    console.log(arr)
    for(let i =0;i<arr.length;i++) {
      if (scrollHeight >= arr[i] && scrollHeight < arr[i + 1]) {
        index=i
        return index+1;
      } else if (scrollHeight < arr[0]) {
        index = 0;
        return index
      }
    }
  },
  gotoOrder(){
  const ui = wx.getStorageSync('userInfo')
  if(this.data.cartList.length==0){
    wx.showToast({
      icon:'none',
      title: '购物袋为空'
    })
  }
  if(ui.openid===undefined){
    wx.showToast({
      icon:'none',
      title: '请先登录'
      
    })
    return;
   }
    var buy=this.data.cartList.map(item=>{
      return item.name+'X'+item.quantity
    })
    buy= buy.join(',')
    var image=this.data.cartList.map(item=>{
      return item.image
    })
    var isbuy='已付款'
    if(this.data.cartList.length>0){
      wx.cloud.callFunction({
        name:'setOrder',
        data:{
          openid:ui.openid,
          username:ui.nickName,
          buy:buy,
          date:time.formatTime(new Date(),"Y年M月D日 h时m分s秒"),
          isbuy:isbuy,
          image:image,
          price:this.data.totalPrice,
          num:app.globalData.num,
          isfinish:'未出单',
          totalNum:this.data.totalNum
        }
      })
      if(this.data.maskVisual=='hidden'){
        this.cleanList()       
      }else if(this.data.cartList.length>0&&this.data.maskVisual=='show'){
        this.cleanList()
      }
      wx.showToast({
        title: '支付成功'
      })
    }
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