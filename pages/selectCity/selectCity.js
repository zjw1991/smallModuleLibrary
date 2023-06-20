var app = getApp();
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');//测试打开调试模式，线上需要配置白名单https://apis.map.qq.com
let qqmapsdk;
var request = require('../../utils/request.js');
const cityData = require('../../utils/city.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bottomHeight:app.globalData.navBarHeight,//胶囊的高度


    //城市list
    lists: [],
    touchmove: false, // 是否在索引表上滑动
    touchmoveIndex: -1,
    titleHeight: 0, // 索引二字距离窗口顶部的高度
    indexBarHeight: 0, // 索引表高度
    indexBarItemHeight: 0, // 索引表子项的高度
    scrollViewId: '', // scroll-view滚动到的子元素的id
    winHeight: 0,
    inputShowed: false, // 输入框是否显示
    inputVal: '', // 搜索框输入的内容
    hotCity: ['北京', '上海', '广州', '深圳', '杭州', '长沙', '武汉', '厦门', '西安', '昆明', '成都', '重庆'], // 热门城市
    searchResult: [], // 搜索城市的结果
    locationCity:'',//定位的城市

    //经纬度地址
    showLocationBtn:false,
    cityName:"",
    latitude:"",
    longitude:""
 
  },


  
  /**
   * 授权位置信息
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
                            that.setData({
                              showLocationBtn:true,
                            })
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
              
                                    }
                                }
                            })
                        }

                    }//success
                })
            }
            // 初始化进入，未授权
            else if (res.authSetting['scope.userLocation'] == undefined) {
                that.getLocation(res);
            }
            // 已授权
            else if (res.authSetting['scope.userLocation']) {
                that.getLocation(res);
            }
        }
    })
},


/**
 * 获取微信经纬度
 */
getLocation: function (userLocation) {
    let that = this
    wx.getLocation({
        type: "wgs84",
        success: function (res) {
            var latitude = res.latitude
            var longitude = res.longitude
            that.getLocationByLonglat(latitude,longitude);//转换成address
        },
        fail: function (res) {//30秒限制调用一次，参考文档:https://developers.weixin.qq.com/community/develop/doc/000aee91a98d206bc6dbe722b51801

            console.log('fail', res.errMsg);
            if (res.errMsg === 'getLocation:fail:auth denied') {
                wx.showToast({
                    title: '拒绝授权',
                    icon: 'none'
                })
                return
            }
            if (!userLocation || !userLocation.authSetting['scope.userLocation']) {//初次点击拒绝授权
              wx.showToast({
                title: '拒绝授权',
                icon: 'none',
              })
              that.setData({
                showLocationBtn:true,
              })
            } 
            else if (userLocation.authSetting['scope.userLocation']) {//在2.12.3更高版本频繁点击按钮会走这个
                wx.showModal({
                    title: '',
                    content: '请在系统设置中打开定位服务',
                    showCancel: false,
                    success: result => {
                        if (result.confirm) {
                     
                        }
                    }
                })
            }
            else {
                wx.showToast({
                    title: '授权失败',
                    icon: 'none'
                })
    
            }
        }
    })
},


  /**
   * 微信经纬度转地址
   */
  getLocationByLonglat: function (latitude, longitude){
    var that = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude:latitude,
        longitude:longitude
      },
      success: function (res) {
        let city = res.result.address_component.city;
        console.log(city);
        that.setData({
          currentCity:city,
          showLocationBtn:false,
        })
      }
    })
  },
  


  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

    qqmapsdk= new QQMapWX({
      key: 'W4WBZ-TUD65-IDAIR-QPM36-HMFQ5-CGBZP'
    });

    this.loadCityList();
  },

   
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onAuthLocation();//授权位置信息
  },
  


  /**
   * 城市list
   */
  loadCityList(){
    const that = this;

     setTimeout(() => {
      wx.getSystemInfo({
        success: function(res) {
          let winHeight = res.windowHeight
          let barHeight = winHeight - res.windowWidth / 750 * 204
          that.setData({
            indexBarItemHeight: barHeight / 25,//索引高度
            titleHeight: res.windowWidth / 750 * 132,
            winHeight: winHeight,
            indexBarHeight: barHeight,
            lists: cityData.list
          })
          console.log(res);
          console.log(winHeight);
          console.log(barHeight);
        }
      })
    }, 50)
  },
  showInput() {
    this.setData({
      inputShowed: true
    })
  },
  clearInput() {
    this.setData({
      inputVal:"",
      inputShowed:false,
      searchResult:[]
    })
    wx.hideKeyboard() //强行隐藏键盘
  },
  inputTyping(e) {
    this.setData({
      inputVal: e.detail.value
    },()=>{
      this.searchCity()
    })
  },
  // 搜索城市
  searchCity() {
    let result = []
    cityData.list.forEach((item1, index1) => {
      item1.data.forEach((item2, index2) => {
        if (item2.keyword.indexOf(this.data.inputVal.toLocaleUpperCase()) !== -1) {
          result.push(item2.cityName)
        }
      })
    })
    this.setData({
      searchResult: result
    })
  },
  // 选择城市
  selectCity(e) {
    let cityName = e.currentTarget.dataset.name;
    wx.showToast({
      title: cityName,
      icon: 'none'
    })
  },
  touchStart(e) {
    this.setData({
      touchmove:true
    })
    let pageY = e.touches[0].pageY
    let index = Math.floor((pageY - this.data.titleHeight) / this.data.indexBarItemHeight)
    let item = this.data.lists[index === 0 ? 1 : index]
    if (item) {
      this.setData({
        scrollViewId: item.letter,
        touchmoveIndex: index
      })
    }
  },
  touchMove(e) {
    let pageY = e.touches[0].pageY;
    let index = Math.floor((pageY - this.data.titleHeight) / this.data.indexBarItemHeight)
    let item = this.data.lists[index === 0 ? 1 : index]
    if (item) {
      this.setData({
        scrollViewId: item.letter,
        touchmoveIndex: index
      })
      console.log(index)
    }
  },
  touchEnd() {
    this.setData({
      touchmove: false,
      touchmoveIndex: -1
    })
  },
  touchCancel() {
    this.setData({
      touchmove:false,
      touchmoveIndex:-1
    })
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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