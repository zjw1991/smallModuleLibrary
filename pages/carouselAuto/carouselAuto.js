// pages/carousel/carousel.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    // 此页面 页面内容距最顶部的距离
    // height: app.globalData.systeminfo.statusBarHeight * 2 + 20,



    imgheights: [],//全部图片的高度  
    imgList: [
      'https://bucketxtr-test-img.oss-cn-shanghai.aliyuncs.com/postInfo20211020164320000027.png',
      'https://bucketxtr-test-img.oss-cn-shanghai.aliyuncs.com/postInfo20211020164324000028.png',
      '../../images/banner1.png',
    ],
    circular: true,//是否采用衔接滑动  
    indicatorDots: true,//是否显示画板指示点  
    indicatorcolor: "#000",//选中点的颜色  
    vertical: false,//是否竖直  
    autoplay: true,//是否自动切换  
    interval: 2500,//自动切换的间隔
    duration: 400,//滑动动画时长毫秒  
    imgwidth: 750, //图片宽度 
    current: 0,//默认 
  },

  /**
   * 获取图片真实宽度
   */  
  imageLoad: function (e) {
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比  
      ratio = imgwidth / imgheight;
      console.log(imgwidth, imgheight)
    //计算的高度值  
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight;
    var imgheights = this.data.imgheights;
    //把每一张图片的对应的高度记录到数组里  
    imgheights[e.target.dataset.id] = imgheight;
    this.setData({
      imgheights: imgheights
    })
  },
  bindchange: function (e) {
    // console.log(e.detail.current)
    this.setData({ current: e.detail.current })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
/* 这里实现控制中间凸显图片的样式 */
  handleChange: function(e) {
    t
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