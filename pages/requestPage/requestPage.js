// pages/requestPage/requestPage.js
var app = getApp();
var request = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 发起请求(函数节流阻止重复提交)
   */
  toRequest:request.throttle(function(e){
    var that = this;
    that.ajaxRequestFn();
  }),

  /**
   * 查询接口
   */
  ajaxRequestFn: function(){
    var that = this;
    request.postWithLoading('program/blackHouse/getLittleBlackHouseList.htm', {
      userId: '3004', 
      search:'',
    },true).then(res => {//接口200
      //此处其他业务代码
      console.log(res);
      if(res.success){
        
      }else{
        
      }
    }).catch(err => {//捕获代码错误
      console.log(err);
      wx.showToast({
        title: '请检查request.js',
        icon: 'none',
        duration: 2000
      })
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