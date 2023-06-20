// pages/dialog/dialog.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    indicatorDots: true,//导航点
    swiperCurrent: 0,//当前index
    autoplay: false,//自动滚动
    circular: true, //衔接滚动
    beforeColor: "#666",//指示点颜色
    afterColor: "#666",//当前选中的指示点颜色
    duration: 500,//滚动速度
    interval: 3000,//停留时间
  

    
    // 滑动菜单数据
    scrollOne: [
      {
        'icon': '../../images/mine.png',
        'text': '第一页',
        'url': '../../pages/testpage/testpage'      
      },
      {
        'icon': '../../images/mine.png',
        'text': '第一页',
        'url': '../dev/dev'
      },
      {
        'icon': '../../images/mine.png',
        'text': '第一页',
        'url': '../dev/dev'
      },
      {
        'icon': '../../images/mine.png',
        'text': '第一页',
        'url': '../dev/dev'
      },
      {
        'icon': '../../images/mine.png',
        'text': '第一页',
        'url': '../dev/dev'
      },
      {
        'icon': '../../images/mine.png',
        'text': '第一页',
        'url': '../dev/dev'
      },
      {
        'icon': '../../images/mine.png',
        'text': '第一页',
        'url': '../dev/dev'
      },
      {
        'icon': '../../images/mine.png',
        'text': '第一页',
        'url': '../guide/guide'
      },
    ],
    scrollTwo: [
      {
        'icon': '../../images/home.png',
        'text': '第二页',
        'url': '../dev/dev'
      },
      {
        'icon': '../../images/home.png',
        'text': '第二页',
        'url': '../dev/dev'
      },
      {
        'icon': '../../images/home.png',
        'text': '第二页',
        'url': '../dev/dev'
      },
      {
        'icon': '../../images/home.png',
        'text': '第二页',
        'url': '../dev/dev'
      },
      {
        'icon': '../../images/home.png',
        'text': '第二页',
        'url': '../dev/dev'
      },
      {
        'icon': '../../images/home.png',
        'text': '第二页',
        'url': '../dev/dev'
      },
      {
        'icon': '../../images/home.png',
        'text': '第二页',
        'url': '../dev/dev'
      },
      {
        'icon': '../../images/home.png',
        'text': '第二页',
        'url': '../dev/dev'
      },
    ],
    scrollThree: [
      {
        'icon': '../../images/mine.png',
        'text': '第三页',
        'url': '../dev/dev'
      },
      {
        'icon': '../../images/mine.png',
        'text': '第三页',
        'url': '../dev/dev'
      },
      {
        'icon': '../../images/mine.png',
        'text': '第三页',
        'url': '../dev/dev'
      },
      {
        'icon': '../../images/mine.png',
        'text': '第三页',
        'url': '../dev/dev'
      },
      {
        'icon': '../../images/mine.png',
        'text': '第三页',
        'url': '../dev/dev'
      },
      {
        'icon': '../../images/mine.png',
        'text': '第三页',
        'url': '../dev/dev'
      },
      {
        'icon': '../../images/mine.png',
        'text': '第三页',
        'url': '../dev/dev'
      },
      {
        'icon': '../../images/mine.png',
        'text': '第三页',
        'url': '../dev/dev'
      },
    ],
   
  },

  //去页面
  gotoPage:function(e){
      console.log(e.currentTarget.dataset.path);
      wx.navigateTo({
        url: e.currentTarget.dataset.path,
      })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})