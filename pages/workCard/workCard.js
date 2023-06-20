var app = getApp();
var utils = require('../../utils/activity_util');

Page({
  data: {
    openid:'',
    token:'',
    authenticate_number:'',
  },


  /**
   * 授权务工卡
   */
  jump1:function(){
    var that = this;
    wx.navigateToMiniProgram({
      appId: 'wxd24d9057cd83d47a',
      // oWPcX5bgaseZTpRTWAiLqCyEKSM0 //杨志远
      // oWPcX5QuaGvTTQx3fE6NiT72Hb9U //我的
      path: '/pages/card/auth?mchid=1604079590&sub_mchid=1604112249&sub_appid=wx9ffd7688c45b8a30&token='+that.data.token+'&openid='+that.data.openid+'',
      success(res) {
        // 打开成功
      }
    })
  },

  /**
   * 查看务工卡
   */
  jump2:function(){
    var that = this;
    wx.navigateToMiniProgram({
      appId: 'wxd24d9057cd83d47a',
      // oWPcX5bgaseZTpRTWAiLqCyEKSM0 //杨志远
      // oWPcX5QuaGvTTQx3fE6NiT72Hb9U //我的
      path: '/pages/card/card?mchid=1604079590&sub_mchid=1604112249&sub_appid=wx9ffd7688c45b8a30&openid='+that.data.openid+'',
      success(res) {
        // 打开成功
      }
    })
  },


  /**
   * 务工卡人脸核身
   */
  jump3:function(){
    var that = this;
    wx.navigateToMiniProgram({
      appId: 'wxd24d9057cd83d47a',
      path: '/pages/card/authenticate?mchid=1604079590&sub_mchid=1604112249&sub_appid=wx9ffd7688c45b8a30&openid='+that.data.openid+'&token='+that.data.token+'&authenticate_number='+that.data.authenticate_number+'',
      success(res) {
        // 打开成功
      }
    })
  },

  /**
   * 务工卡一键授权并核身
   */
  jump4:function(){
    var that = this;
    wx.navigateToMiniProgram({
      appId: 'wxd24d9057cd83d47a',
      path: '/pages/card/authen_with_auth?mchid=1604079590&sub_mchid=1604112249&sub_appid=wx9ffd7688c45b8a30&openid='+that.data.openid+'&token='+that.data.token+'&authenticate_number='+that.data.authenticate_number+'',
      success(res) {
        // 打开成功
      }
    })
    // wx.navigateToMiniProgram({
    //   appId: 'wxd24d9057cd83d47a',
    //   path: '/pages/card/authen_with_auth?mchid=1604079590&sub_mchid=1604112249&sub_appid=wx9ffd7688c45b8a30&openid=oWPcX5QuaGvTTQx3fE6NiT72Hb9U&token=5f8021d6-8a9d-4b6a-a8f3-1a29df8f3f64-7181013&authenticate_number=WGKYXD94353934327043192392',
    //   success(res) {
    //     // 打开成功
    //   }
    // })
  },

  openidInput:function(e){
    this.setData({
      openid:e.detail.value,
    })
  },
  tokenInput:function(e){
    this.setData({
      token:e.detail.value,
    })
  },

  authenticate_numberInput:function(e){
    this.setData({
      authenticate_number:e.detail.value,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

    /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
  
})

