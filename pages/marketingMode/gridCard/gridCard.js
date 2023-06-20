// pages/marketingMode/gridCard/gridCard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {


     // 九宫格数据
     card: [
      {
          id: 1,
          prizeName: '10金币',
          img: 'https://www.sunniejs.cn/static/weapp/prize.png',
          status: 0 //   :0 反面 , 1 正面
      },
      {
          id: 2,
          prizeName: '10金币',
          img: 'https://www.sunniejs.cn/static/weapp/prize.png',
          status: 0
      },
      {
          id: 3,
          prizeName: '100金币',
          img: 'https://www.sunniejs.cn/static/weapp/prize.png',
          status: 0
      },
      {
          id: 4,
          prizeName: '10金币',
          img: 'https://www.sunniejs.cn/static/weapp/prize.png',
          status: 0
      },
      {
          id: 5,
          prizeName: '40金币',
          img: 'https://www.sunniejs.cn/static/weapp/prize.png',
          status: 0
      },
      {
          id: 6,
          prizeName: '20金币',
          img: 'https://www.sunniejs.cn/static/weapp/prize.png',
          status: 0
      },
      {
          id: 7,
          prizeName: '50金币',
          img: 'https://www.sunniejs.cn/static/weapp/prize.png',
          status: 0
      },
      {
          id: 8,
          prizeName: '60金币',
          img: 'https://www.sunniejs.cn/static/weapp/prize.png',
          status: 0
      },
      {
          id: 9,
          prizeName: '10金币',
          img: 'https://www.sunniejs.cn/static/weapp/prize.png',
          status: 0
      }
  ],
  ready: false // 是否点击开始抽奖

  },

      /**
     * 点击开始抽奖
     */
    start() {
      if (this.data.ready) {
          wx.showToast({
              title: `已经开启抽奖`,
              icon: 'none'
          })
          return
      }
      // 触发组件开始方法
      this.selectComponent('#sol-grid-card').start(() => {
          // 动画结束后可以点击
          this.setData({
              ready: true 
          })
      })
  },

  // 子组件触发，点击打开单个卡片奖品
  openCard(e) {
      const { item, index } = e.detail
      // 动画没有结束，或已经点开
      if (!this.data.ready || item.status == 1) {
          return
      }
      // 改变卡片翻转状态 status :0 反面 , 1 正面
      this.setData({
          [`card[${index}].status`]: 1
      })
      wx.showToast({
          title: `你点击了第${index + 1}个`,
          icon: 'none'
      })
      // 为了防止作弊，洗牌动画并不能打乱奖品数据顺序，抽出什么奖项通过再次访问接口获得
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