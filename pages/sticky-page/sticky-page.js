var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarHeight: app.globalData.navBarHeight, //  整个导航栏高度
    //胶囊组件参数设置
    navbarData: {
      navbarBack: 1,//返回按钮1显示0不显示
      navbarLine: 1,//竖线
      navbarHome: 1,//首页按钮1显示0不显示
      showCapsule: 1, // 胶囊1显示0不显示
      title: '黏性锚点定位导航', // 导航栏 中间的标题
      textColor: '#fff', // 标题颜色
      bgColor: '#3281ff', // 导航栏背景颜色
      btnBgColor: '#2B6ED9', // 胶囊按钮背景颜色
      iconColor: 'white', // icon颜色 black/white
      borderColor: 'rgba(255, 255, 255, 0.3)' // 边框颜色 格式为 rgba()，透明度为0.3
    },

    scrollTop: 0, // 当前滚动的距离
    timer: null, // 计时器
    navList: [
      {
        title: '岗位说明',
      }, 
      {
        title: '企业介绍',
      }, 
      {
        title: '入职指引',
      },  
    ],
   
  },


   /**
   * 监听滚动
   */
  onPageScroll(e) {
    let scrollTop = e.scrollTop;
    this.setData({
      scrollTop
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