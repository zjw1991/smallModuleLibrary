// pages/dialog/dialog.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
    // 此页面 页面内容距最顶部的距离
    // height: app.globalData.systeminfo.statusBarHeight * 2 + 20,

    //弹框内容设置
    needErrorTips:true,//是否需要错误提示文字
    errorTipsVal:'选择的员工中，存在已入职的员工，不可删除面试数据',
  },


  //点击显示弹框
  showDialog() {
    this.dialog.showDialog();
  },


  //确认事件
  _confirmEvent() {
    console.log('你点击了确定');
    this.dialog.hideDialog();
  },
  //取消事件
  _cancelEvent() {
    console.log('你点击了取消');
    this.dialog.hideDialog();
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
    this.dialog = this.selectComponent("#dialog"); //获得dialog组件
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