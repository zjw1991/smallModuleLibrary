// pages/page1/page1.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      //胶囊组件参数设置
      navbarData: {
        navbarBack: 1,//返回按钮1显示0不显示
        navbarLine: 1,//竖线
        navbarHome: 1,//首页按钮1显示0不显示
        showCapsule: 1, // 胶囊1显示0不显示
        title: '组件列表', // 导航栏 中间的标题
        textColor: '#fff', // 标题颜色
        bgColor: '#3281ff', // 导航栏背景颜色
        btnBgColor: '#2B6ED9', // 胶囊按钮背景颜色
        iconColor: 'white', // icon颜色 black/white
        borderColor: 'rgba(255, 255, 255, 0.3)' // 边框颜色 格式为 rgba()，透明度为0.3
      },
      //状态栏高度
      height: app.globalData.navBarHeight,

      headHeight:200,
  },

  //监听页面滚动
  onPageScroll: function (e) {
    this.setData({
      scrollTop: e.scrollTop
    })
    // console.log(e.scrollTop);
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // console.log(this.data.height);
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

})