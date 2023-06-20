// pages/marketingMode/bigWheel/bigWheel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  

  award: 1,
  mode: 2, // 旋转模式
  awardList: [
      { title: '10个金币' },
      { title: '20个金币' },
      { title: '30个金币' },
      { title: '50个金币' },
      { title: '80个金币' },
      { title: '200个金币' }
  ] // 顺时针对应每个奖项

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

    // 用户点击开始抽奖
    wheelStart() {
      // 设置奖项
      this.setData({
          award: Math.floor(Math.random() * 6 + 1) //安全起见生成奖项应该由后端完成，生成1到6随机
      })
      // 触发组件开始方法
      this.selectComponent('#sol-wheel').begin()
  },
  // 抽奖完成后操作
  wheelSuccess() {
      const index = this.data.award - 1
      console.log('bind:success', this.data.awardList[index])
      wx.showToast({
          title: `恭喜你获得${this.data.awardList[index].title}`,
          icon: 'none'
      })
  },
  // 切换模式
  switchMode(e) {
      const { type } = e.currentTarget.dataset
      this.setData({
          mode: type
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