var app = getApp();
var utils = require('../../utils/activity_util');

Page({
  data: {



    list: [
      {
        mydateStr: "2020-05-12",
        agentName:'张三',
        clueNum: '1111',
        reportNum: '2222',
        interviewSuccessNum: '3333',
        onboardingNum: '4444',
      },
      {
        mydateStr: "2022-05-13",
        agentName:'王武',
        clueNum: '777',
        reportNum: '888',
        interviewSuccessNum: '9999',
        onboardingNum: '1212',
      },
      {
        mydateStr: "2022-05-14",
        agentName:'王武',
        clueNum: '777',
        reportNum: '888',
        interviewSuccessNum: '9999',
        onboardingNum: '1212',
      },
    ],
    scrollTop: true,
    left: 0
  },

  // 监听左右滚动
  scroll: function (e) {
    let that = this;
    that.setData({
      left: e.detail.scrollLeft,
    })
  },
  // 监听上下滚动
  // onPageScroll (e) { 
  //   let that = this;
  //   if(e.scrollTop>10){
  //     that.setData({
  //       top:e.scrollTop,
  //       scrollTop:false
  //     })
  //   }else{
  //     that.setData({
  //       scrollTop:true
  //     })
  //   }
  //   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowWidth)
        console.log(res.windowWidth / 5)
        that.setData({
          // 设置紫色框 scroll-view 的高度
          wHeight: res.windowWidth,
          width: res.windowWidth / 3.8,
        })
      }
    })
  },
  
})

