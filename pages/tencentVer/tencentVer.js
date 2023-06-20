// pages/tencentVer/tencentVer.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },



    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    if (app.captchaResult != null) {
      that.setData({
        ticket: app.captchaResult.ticket,
        randstr:app.captchaResult.randstr,
      })
      console.log(app.captchaResult.ticket);
      console.log(app.captchaResult.randstr);
      app.captchaResult = null; // 验证码的票据为一次性票据，取完需要置空
    }
  },

  /**
   * 调取
   */
  toTCaptcha: function () {
    wx.navigateToMiniProgram({
      appId: 'wx5a3a7366fd07e119',
      path: '/pages/captcha/index',
      extraData: {
        appId: '2096254767'//您申请的验证码的 appId
      }
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