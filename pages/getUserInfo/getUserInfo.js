var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },


    /**
   * 20210512新版获取用户信息
   */
  onGotUserInfo: function (e) {
    // 获取用户信息。页面产生点击事件（例如 button 上 bindtap 的回调中）后才可调用，
    // 每次请求都会弹出授权窗口，用户同意后返回 userInfo。该接口用于替换 wx.getUserInfo
    wx.getUserProfile({
      desc: "获取你的昵称、头像、地区及性别",//最新调整不返回用户性别和地区了，参考https://mp.weixin.qq.com/cgi-bin/announce?action=getannouncement&announce_id=11632637451RQs8y&nettype=WIFI&version=63030532&ascene=1&lang=zh_CN&devicetype=Windows+7+x64&fontgear=2
      success: res => {
        console.log(res)
        let wxUserInfo = res.userInfo;
        console.log(wxUserInfo);

        console.log("nickName=" + wxUserInfo.nickName);
        console.log("avatarUrl=" + wxUserInfo.avatarUrl);
        
        this.setData({
          userinfo:JSON.stringify(wxUserInfo),
        })
  
      },
      fail: res => {
         //拒绝授权
         wx.showToast({
          title: '您拒绝了授权',
          icon: 'none',
          duration: 1500
        })
        return;
      }
    })

  },

  /**
   * 通过code和appid从后台获取用户手机号
   * @param {*} e 
   */
  getPhoneNumber: function (e) {
    var that = this;
  
    console.log(e.detail.errMsg);
    console.log("iv：" + e.detail.iv);
    console.log("encryptedData：" + e.detail.encryptedData);

    if(e.detail.errMsg == 'getPhoneNumber:ok'){//允许授权
      wx.login({
        success: res => {
          console.log("code：" + res.code)
          //存在code
          if (res.code) {
            // wx.request({
            //   url: 'https://xgwtest.51xtr.com/program/user/getIntellWxOpenid.htm',
            //   header: {
            //     'content-type': 'application/x-www-form-urlencoded'
            //   },
            //   method: 'POST',
            //   data: {
            //     code: res.code,
            //     appid: 'wxb0f5b85788cdeecb',
            //   },
            //   success: function (res) {
            //     //成功
            //     if (res.data.success) {
    
            //     }
            //   }
            // })
          }else{
            wx.showToast({
              title: '获取code失败',
              icon: 'none',
              duration: 1500
            })
          }
        }
      })
    }else if(e.detail.errMsg == 'getPhoneNumber:fail user deny'){//拒绝授权
      wx.showToast({
        title: '您拒绝了授权',
        icon: 'none',
        duration: 1500
      })
    }else{

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