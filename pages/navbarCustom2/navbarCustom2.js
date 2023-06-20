var app = getApp();
var utils = require('../../utils/activity_util');

Page({
  data: {
        //自定义胶囊组件参数设置
        navbarData: {
        showCapsule: 1, // 导航文字1显示0不显示
        showRightIcon:1,//是否展示右箭头1显示0不显示
        storeName:utils.textLimit('薪太软上海科技发展有限公司公司'),//控制显示位数
        nameColor: '#fff', // 文字颜色
        nameFontSize:'15',//文字大小
        bgColor:'none',//导航栏背景色
      },

  },

 /**
     * 监听页面滚动
     */
    onPageScroll (e) {
      var that = this;
      console.log(e.scrollTop);
      if (e.scrollTop > 50) {
        //修改导航栏背景色和文字颜色
        that.setData({
          ["navbarData.bgColor"]: '#fff',
          ["navbarData.nameColor"]: '#000',
        });
      } else {
        that.setData({
          ["navbarData.bgColor"]: 'none',
          ["navbarData.nameColor"]: '#fff',
        });
      }
    },


     /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      var that = this;
      that.changeNavBarStyle();
    },
  
  
    /**
   * 动态修改胶囊的样式
   */
  changeNavBarStyle:function(){
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#ff0000',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
  },

})

