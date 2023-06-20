// pages/getLocation/getLocation.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    // location:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

  },



  /**
   * 信息授权
   */
  onAuthLocation: function () {
    let that = this
    wx.getSetting({
        success: (res) => {
            // res.authSetting有多种属性，比如res.authSetting['scope.userInfo']表示获取用户头像等信息，详情看官方文档

            // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
            // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
            // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
            // 拒绝授权后再次进入重新授权
            if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
            
                // console.log('authSetting:status:拒绝授权后再次进入重新授权', res.authSetting['scope.userLocation'])
                wx.showModal({
                    title: '',
                    content: '【xxx】需要获取你的地理位置，请确认授权',
                    success: function (res) {

                        if (res.cancel) {
                            wx.showToast({
                                title: '拒绝授权',
                                icon: 'none'
                            })
                            // setTimeout(() => {
                            //     wx.navigateBack()
                            // }, 1500)
                        } 
                        else if (res.confirm) {
                            wx.openSetting({
                                success: function (dataAu) {
                                    // console.log('dataAu:success', dataAu)
                                    if (dataAu.authSetting["scope.userLocation"] == true) {
                                        //再次授权，调用wx.getLocation的API
                                        that.getLocation(dataAu)
                                    } else {
                                        wx.showToast({
                                            title: '授权失败',
                                            icon: 'none'
                                        })
                                        // setTimeout(() => {
                                        //     wx.navigateBack()
                                        // }, 1500)
                                    }
                                }
                            })
                        }

                    }//success
                })
            }
            // 初始化进入，未授权
            else if (res.authSetting['scope.userLocation'] == undefined) {
                // console.log('authSetting:status:初始化进入，未授权', res.authSetting['scope.userLocation'])
                //调用wx.getLocation的API
                that.getLocation(res)
            }
            // 已授权
            else if (res.authSetting['scope.userLocation']) {
                // console.log('authSetting:status:已授权', res.authSetting['scope.userLocation'])
                //调用wx.getLocation的API
                that.getLocation(res)
            }
        }
    })
},


// 微信获得经纬度
getLocation: function (userLocation) {
    let that = this
    wx.getLocation({
        type: "wgs84",
        success: function (res) {
            // console.log('getLocation:success', res)
            var latitude = res.latitude
            var longitude = res.longitude
            console.log('latitude:' + latitude,'longitude' + longitude);
            that.setData({
                location:latitude+'-'+longitude,
            })
        },
        fail: function (res) {
            console.log('fail', res.errMsg);

            if (res.errMsg === 'getLocation:fail:auth denied') {
                wx.showToast({
                    title: '拒绝授权',
                    icon: 'none'
                })
                // setTimeout(() => {
                //     wx.navigateBack()
                // }, 1500)
                return
            }
            if (!userLocation || !userLocation.authSetting['scope.userLocation']) {
                // that.getUserLocation()
            } 
            else if (userLocation.authSetting['scope.userLocation']) {
                wx.showModal({
                    title: '',
                    content: '请在系统设置中打开定位服务',
                    showCancel: false,
                    success: result => {
                        if (result.confirm) {
                            wx.navigateBack()
                        }
                    }
                })
            }
            else {
                wx.showToast({
                    title: '授权失败',
                    icon: 'none'
                })
                // setTimeout(() => {
                //     wx.navigateBack()
                // }, 1500)
            }
        }
    })
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