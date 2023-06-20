// pages/marketingMode/slotMachine/slotMachine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {


spinDisabled: false,
result: [] // 中奖池

  },

  
    // 开始
    start() {
      const { spinDisabled } = this.data
      // 点击开始后不可点击
      if (spinDisabled) return false
      // 随机设置奖项 该数据应该从后台接口获取
      let result = []
      for (var i = 0; i < 3; i++) {
          result.push(Math.floor(Math.random() * 6 + 1))
      }
      this.setData({ spinDisabled: true, result: result })
      // 触发组件开始方法
      this.selectComponent('#sol-slot-machine').start()
  },
  // 结束
  doFinish() {
      console.log('当前项=', this.data.result)
      wx.showToast({
          title: '恭喜你获奖了',
          icon: 'none'
      })
      this.setData({
          spinDisabled: false
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