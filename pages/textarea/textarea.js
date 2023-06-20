// pages/textarea/textarea.js
Page({

  /**
   * 页面的初始数据
   */
  data: {


    texts: "",
    min: 5,//最少字数
    max:200, //最多字数 (根据自己需求改变) 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //字数限制  
  textareaInput: function (e) {
    var that = this;
    var len = e.detail.value.length;

    //最少字数限制
    if (len < that.data.min){
      that.setData({
        // texts: "加油，至少要输入5个字哦"
      })
    }else if (len >= that.data.min){
      that.setData({
        texts: " "
      })
    }
    
    //最多字数限制
    if (len > that.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    that.setData({
      currentWordNumber: len //当前字数  
    });
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