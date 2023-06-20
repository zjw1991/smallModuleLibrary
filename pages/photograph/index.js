// pages/photograph/photographIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
   * 授权
   */
  onAuthCamera: function () {
    let that = this
    wx.getSetting({
        success: (res) => {
          console.log( res.authSetting);
            if (res.authSetting['scope.camera'] != undefined && res.authSetting['scope.camera'] != true) {
                wx.showModal({
                    title: '',
                    content: '请确认授权使用摄像头',
                    success: function (res) {
                        if (res.cancel) {
                            wx.showToast({
                                title: '拒绝授权',
                                icon: 'none'
                            })
                        }else if (res.confirm) {
                            wx.openSetting({  //打开授权面板
                                success: function (dataAu) {
                                    if (dataAu.authSetting["scope.camera"] == true) { //再次授权
                                    
                                      wx.navigateTo({
                                        url: '../../pages/photograph/photograph',
                                      })

                                    } else {
                                        wx.showToast({
                                            title: '授权失败',
                                            icon: 'none'
                                        })

                                    }
                                }
                            })
                        }

                    }//success
                })
            }
            // 初始化进入，未授权
            else if (res.authSetting['scope.camera'] == undefined) {
              wx.navigateTo({
                url: '../../pages/photograph/photograph',
              })
            }
            // 已授权
            else if (res.authSetting['scope.camera']) {
              wx.navigateTo({
                url: '../../pages/photograph/photograph',
              })
            }
        }
    })
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