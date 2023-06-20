// pages/person/person.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarData: {//胶囊组件参数设置
      navbarBack: 1,//返回按钮1显示0不显示
      navbarLine: 1,//竖线
      navbarHome: 1,//首页按钮1显示0不显示
      showCapsule: 1, // 胶囊1显示0不显示
      title: '我的', // 导航栏 中间的标题
      textColor: '#fff', // 标题颜色
      bgColor: '#3281ff', // 导航栏背景颜色
      btnBgColor: '#2B6ED9', // 胶囊按钮背景颜色
      iconColor: 'white', // icon颜色 black/white
      borderColor: 'rgba(255, 255, 255, 0.3)' // 边框颜色 格式为 rgba()，透明度为0.3
    },

     //底部自定义tabbar
     toBottomHeight:app.globalData.tabbarBottom,//距底部距离
     activeIndex: 1,
     showtarbar2:true,//控制第二个tabbar显隐
     icon1: {
       normal: '../../images/home-unchecked.png',//未选中图标
       active: '../../images/home.png',//选中图标
     },
     icon2: {
       normal: '../../images/mine-unchecked.png',//未选中图标
       active: '../../images/mine.png',//选中图标
     },
  },


  /**
   * tabbar切换
   * @param {*} event 
   */
  onChange(event) {
    this.setData({ active: event.detail });
    console.log(event.detail);
    switch (event.detail)
      {
          case 0:
            wx.switchTab({    
              url:"/pages/index/index"
            })
              break;
          case 1:
            wx.switchTab({    
              url:"/pages/person/person"
            })
              break;
          default:
            wx.switchTab({    
              url:"/pages/person/person"
            })
      }
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