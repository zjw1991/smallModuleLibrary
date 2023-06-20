var app = getApp();
var utils = require('../../utils/activity_util');
var timerObj = null;
var times = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeNum:'',
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.takePhotoFn();
  },


  /**
   * 拍照识别
   */
  takePhotoFn() {
    var that = this;
    times = 0;
    timerObj = setInterval(function(){
      const ctx = wx.createCameraContext()
      ctx.takePhoto({
        quality: 'medium',
        success: (res) => {
          that.setData({
            src: res.tempImagePath,//图片路径
          })

          times++;
          console.log(times);

          if(times == 5){
            clearInterval(timerObj);
          }
          that.setData({
            timeNum:times,
          })
        }
      })
    },1000);
  },
  error(e) {//拒绝了授权摄像头就返回
    console.log(e.detail);
    //返回上一页
    wx.navigateBack()
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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(timerObj);
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