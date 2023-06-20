// pages/sectionPicker/sectionPicker.js
Page({

  /**
   * 页面的初始数据
   */
  data: {



        //选择器显隐
        isPickerRender: false,
        isPickerShow: false,
        startTime: "开始时间",//默认展示
        endTime: "结束时间",
         // startTime: "2019-01-01 12:32:44",
        // endTime: "2019-12-01 12:32:44",
        pickerConfig: {
          endDate: true, // 是否要结束时间
          column: "day", //格式day、hour、minute、secend
          initStartTime: "", //初始时间（2019-01-01 12:32:44），默认当前时间
          initEndTime: "",  //初始结束时间（2019-12-01 12:32:44），默认当前时间
          dateLimit: false, //为true时配合以下范围设置，false时可选任意时间；当为数字n时，范围是当前时间的最近n天
          limitStartTime: "2015-05-06", //最小可选时间
          limitEndTime: "2055-05-06" //最大可选时间 
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
   * 选中触发
   */
  setPickerTime: function(val) {
    console.log(val);
    let data = val.detail;
    //截取掉不需要的时分秒 2021-09-29 00:00:00
    this.setData({
      // startTime: data.startTime,
      // endTime: data.endTime,
      startTime: this.interceptDate(data.startTime),
      endTime: this.interceptDate(data.endTime)
    });
  },


  /**
   * 选择器的显示隐藏
   */
  pickerShow: function() {
    this.setData({
      isPickerShow: true,
      isPickerRender: true,
      chartHide: true
    });
  },
  pickerHide: function() {
    this.setData({
      isPickerShow: false,
      chartHide: false
    });
  },

  /**
   * 清空选择器
   */
  pickerClear:function(){
    this.setData({
      isPickerShow: false,
      chartHide: false,
      startTime: "开始时间",//默认展示
      endTime: "结束时间",
    });
  },


  /**
   * 去掉日期后面时分秒（2018-01-08 00:00:00 --> 2018-01-08）
   */
  interceptDate:function(date){
    var newDate = date.substr(0,10);//截取字符串（开始位置和长度）
    return newDate;
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