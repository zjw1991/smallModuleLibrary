var app = getApp();
const utils = require('../../utils/activity_util');

// 初始化日期模态框数据
let date = new Date();
let years = [];
let months = [];
let days = [];


for (let i = date.getFullYear()-50; i <= (date.getFullYear()+50); i++) {//可扩大日期范围
  years.push(i + "年")
}
for (let i = 1; i <= 12; i++) {
  months.push(i + "月")
}
for (let i = 1; i <= 31; i++) {
  days.push(i + "日")
}





Page({

  /**
   * 页面的初始数据
   */
  data: {

    //picker
    changefalg:false,
    value: [0, 1, 1, 1, 1],
    openflag: true,  //1日期控件显示  2控件滚动选择 底部页面不滚动
    years: years,   //时间可选范围模态框数据
    months: months,
    days: days,
    year:'',  //时间值
    month:'',
    day:'',
    showPickAllBtn:false,//是否显示全部按钮
    starttime: utils.getobjDateYMD(),//获取当前时间

  },


  /**
   * 点击选择器
   */
  tap(ev) {
    // 根据选择项目  传去对应数据  根据开始结束时间获取索引  设置面板默认数据
    let value = [2019,0,0];
    let arr=[];
      arr = utils.getarrWithtimeYMD(this.data.starttime);//转换年月日
    const { years, months, days, openflag } = this.data;
    //根据arr  数据索引
    value[0] = years.indexOf(arr[0]+'年');
    value[1] = months.indexOf(arr[1] + '月');
    value[2] = days.indexOf(arr[2] + '日');
  
    this.setData({
      value,
      openflag: false,
      years,   //日期模态框数据
      months,
      days,
    })

  },
  
  /**
   * 日期全部
   */
  pickAllBtn (){
    this.setData({
      openflag: true,
      changefalg: false,
    })
  },

  /**
   * 日期取消
   */
  canslebtn (){
    this.setData({
      openflag: true,
      changefalg: false,
    })
  },

  /**
   * 日期确定  如果不选择那么默认重置
   */
  closebtn () {
    this.setData({
      openflag: true,
    })
    const { curindex, year, month, day } = this.data;
    if (this.data.changefalg){
      let starttime = utils.getDateYMD(year, month, day)
      console.log(starttime);
        this.setData({
          starttime,
          changefalg:false,
        })
    }else{
      //未滑动日历，当前状态
    }
  },


  /**
   * 滑动日期
   */
  bindChange: function (ev) {
    const e = ev;
    let val = e.detail.value;
    const year = this.data.years[val[0]];
    const month = this.data.months[val[1]];
    const day = this.data.days[val[2]];
    //如果点击月份  那么后面日跟着变换数据
    let days = [];
    const daynum = utils.mGetDate(year.substr(0, year.length - 1), month.substr(0, month.length - 1));
    for (let i = 1; i <= daynum; i++) {
      days.push(i + "日")
    }
    this.setData({
      days,
      year,
      month,
      day,
      changefalg:true,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(utils.isNull(undefined));
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