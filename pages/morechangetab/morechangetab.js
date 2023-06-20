// pages/morechangetab/morechangetab.js
Page({

  /**
   * 页面的初始数据
   */
  data: {


checks: [
  { name: "已签到", value: '0', checked: false },
  { name: "面试成功", value: '1', checked: false },
  { name: "面试失败", value: '2', checked: false },
  { name: "放弃面试", value: '3', checked: false },
  { name: "已入职", value: '4', checked: false },
  { name: "已离职", value: '5', checked: false },
  { name: "放弃工作", value: '6', checked: false },
]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  tabClicks: function (e) {
    let index = e.currentTarget.dataset.index;
    let arrs = this.data.checks;
    if (arrs[index].checked == false) {
      arrs[index].checked = true;
    } else {
      arrs[index].checked = false;
    }
    this.setData({
      checks: arrs
    })
    // console.log(e)
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