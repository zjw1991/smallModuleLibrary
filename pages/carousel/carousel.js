// pages/carousel/carousel.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 此页面 页面内容距最顶部的距离
    // height: app.globalData.systeminfo.statusBarHeight * 2 + 20,

    //轮播图参数
    imgUrls: [
      '../../images/banner1.png',
      '../../images/banner2.png',
      '../../images/banner3.png',
    ],
    indicatorDots: true,//导航点
    autoplay: true,
    circular: true, //衔接滑动
    interval: 3000,//停留时间
    duration: 300,//滚动速度

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
/* 这里实现控制中间凸显图片的样式 */
  handleChange: function(e) {
    this.setData({
      currentIndex: e.detail.current
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