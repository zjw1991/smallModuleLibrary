// pages/marketingMode/packetRain/packetRain.js
Page({

  /**
   * 页面的初始数据
   */
  data: {


  visible: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setPocketRain();
  },
  
    //设置红包雨参数
    setPocketRain:function(){
        var that = this;
        that.setData({
          visible: true,
          createSpeed:5, // 速度
          time: 15, // 游戏时间
          readyTime: 3, // 准备时间
          min: 0, // 金币最小是0
          max: 10 // 金币最大是10
      })
    },

    // 结束
    success() {
      console.log('bind:finish')
      this.setData({
          visible: false //  隐藏界面
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