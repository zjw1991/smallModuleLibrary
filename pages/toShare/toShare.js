// pages/dialog/dialog.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    img: "../../images/banner2.png"
  },

  /**
   * 显示与隐藏右上角转发按钮
   */
  showShareMenu() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: [
      'shareTimeline',//分享到朋友圈
      'shareAppMessage',//发送给朋友
      ]
    })
    console.log("显示了转发按钮");
  },

  //隐藏“发送给朋友”按钮时必须同时隐藏“分享到朋友圈”按钮，
  //隐藏“分享到朋友圈”按钮时则允许不隐藏“发送给朋友”按钮
  hideShareMenu() {
    wx.hideShareMenu({
      menus: [
        'shareTimeline',//分享到朋友圈
        'shareAppMessage',//发送给朋友
        ]
    });
    console.log("隐藏了转发按钮");
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      console.log("来自页面内转发按钮");
      console.log(res.target);
     }else {
      console.log("来自右上角转发菜单")
     }
     
     return {
      title: '自定义标题部分',//标题
      path: '/pages/index/index?id=123',//打开页面路径
      imageUrl: "../../images/banner1.png",//封面
      success: (res) => {
       console.log("转发成功", res);
      },
      fail: (res) => {
       console.log("转发失败", res);
      }
     }
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


})