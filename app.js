//app.js
App({
  globalData: {
    openid:'',
    userInfo: null,
    systeminfo: {}, // 系统信息
    redisKey: 'sprit_program_', //业务需求字段，后面拼接上手机号

    // URL: 'http://192.168.1.78:8764/',//我的本地
    // platformNumber: 'P10006',//平台编号
    
    URL: 'https://xgwtest.51xtr.com/',//测试
    platformNumber: 'P10006',

    // URL: 'https://xgw.51xtr.com/',//生产
    // platformNumber: 'P00006',

    imgUrl: 'https://bucketxtr-test-img.oss-cn-shanghai.aliyuncs.com/miniprogram/', // oss图片地址（测试）
    // imgUrl: 'https://bucketxtr-img.oss-cn-shanghai.aliyuncs.com/miniprogram/', // oss图片地址（生产）
  },


  /**
   * 启动第一时间加载
   */
  onLaunch: function () {
    // this.getOpenid();//获取openid和appid
    this.getCapsuleInfo();//获取设备信息空间信息等
  },

  /**
   * 页面显示加载
   */
  onShow: function (options) {
    var that = this;
    that.autoUpdate();//强制更新提醒
    that.loadTencentVer(options);//腾讯行为验证初始化
  },

  /**
   * 获取高度等空间信息
   */
  getCapsuleInfo:function(){
    // 获取设备信息
    wx.getSystemInfo({
      success: (res) => {
        console.log(res);
        console.log('微信设置的字体大小：' + res.fontSizeSetting);//微信设置的字体大小
        console.log('屏幕像素比：' + res.pixelRatio);//像素比
        //获取设备信息
        this.globalData.systeminfo = res;
        //胶囊位置信息
        let headerBtnPosi = wx.getMenuButtonBoundingClientRect();
        this.globalData.headerBtnPosi = headerBtnPosi; // 获得胶囊按钮位置信息
        // 整个导航栏高度(状态栏+胶囊)->>>状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度
        this.globalData.navBarHeight = (headerBtnPosi.top - res.statusBarHeight) * 2 + headerBtnPosi.height + res.statusBarHeight;
        console.log(this.globalData.navBarHeight);
        console.log('胶囊navBarHeight:' + this.globalData.navBarHeight);
        // 胶囊实际位置，坐标信息不是左上角原点
        this.globalData.btnPosi = { 
          height: headerBtnPosi.height,
          width: headerBtnPosi.width,
          top: headerBtnPosi.top - this.globalData.systeminfo.statusBarHeight, // 胶囊top - 状态栏高度
          // 胶囊bottom - 胶囊height - 状态栏height （胶囊实际bottom 为距离导航栏底部的长度）
          bottom: headerBtnPosi.bottom - headerBtnPosi.height - res.statusBarHeight, 
          right: res.screenWidth - headerBtnPosi.right // 屏幕宽度 - 胶囊right
        }

        //底部tabbar高度
        //判断iphonex等手机，获取各种屏幕距离底部高度
        const iphoneX = /iphone x/i.test(res.model);
        const iphoneNew = /iPhone11/i.test(res.model) && res.screenHeight === 812;
        this.globalData.isIPhoneX = iphoneX || iphoneNew
        //因为iphonex以后等全面屏手机底部有空档，所以以下计算规则：
        //screenHeight - statusBarHeight - safeArea. height
        //812 - 44 - 734 = 34，34为iphonex等手机底部空档高度
        this.globalData.tabbarBottom = this.globalData.isIPhoneX ? 84 : 50;//tabbar距离底部空间，50为底部导航的高度
        // console.log(res.model);//手机型号
        // console.log("底部导航距离底部距离：" + this.globalData.tabbarBottom);
      },
      fail(res){
        console.log(res)
      }
    })


  },


  /**
   *获取openid和appid(需要时候调用)
   */
  getOpenid: function () {
    var that = this;
    var accountInfo = wx.getAccountInfoSync();
    var appid = accountInfo.miniProgram.appId;
    wx.setStorageSync('appid', appid);//appid
    console.log('APPID：' + appid);
    return new Promise(function (resolve, reject) {
      wx.login({
        success: function (res) {
          //code 获取用户信息的凭证
          if (res.code) {
            //请求获取用户openid
            wx.request({
              url: that.globalData.URL + 'program/user/getWxOpenid.htm',
              data: {
                code: res.code,
                resourceId: appid,
                resourceType:'0',//业务字段
                platformNumber: that.globalData.platformNumber,//业务字段
              },
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                if(res.data.success == true){
                  wx.setStorageSync('openid', res.data.data || '');//存储openid
                  var res = {
                    status: 200,
                    data: res.data.data || ''
                  }
                  resolve(res);
                }else{
                  wx.showToast({
                    title: res.data.message,
                    icon: 'none',
                    duration: 1500
                  })
                }
              }
            });
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
            reject('error');  
          }
        }
      })
      
    });
  },


  /**
   * 小程序更新提醒
   */
  autoUpdate: function() {
    var that = this
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function(res) {
        if (res.hasUpdate) {
          wx.showModal({
            title: '更新提示',
            content: '检测到新版本，是否下载新版本并重启小程序？',
            // showCancel:false,//隐藏取消按钮
            success: function(res) {
              if (res.confirm) {
                that.downLoadAndUpdate(updateManager) //下载新版本，并重新应用
              } else if (res.cancel) { //用户点击取消按钮的处理，如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
                wx.showModal({
                  title: '温馨提示~',
                  content: '本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~',
                  showCancel:false,//隐藏取消按钮
                  confirmText:"确定更新",//只保留确定更新按钮
                  success: function(res) {
                    if (res.confirm) {
                      that.downLoadAndUpdate(updateManager)  //下载新版本，并重新应用
                    }
                  }
                })
              }
            }
          })
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  //下载小重启小程序
  downLoadAndUpdate: function (updateManager){
    var that=this
    wx.showLoading();
    //静默下载更新小程序新版本
    updateManager.onUpdateReady(function () {
      wx.hideLoading()
      //新的版本已经下载好，调用 applyUpdate 应用新版本并重启
      updateManager.applyUpdate()
    })
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      wx.showModal({
        title: '已经有新版本了哟~',
        content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
      })
    })
  },


  /**
   * 初始化腾讯行为验证码
   */
  loadTencentVer:function(options){
   // 解决各类回调的兼容问题
   if (!this.captchaTicketExpire) this.captchaTicketExpire = {};

   if (options.scene === 1038 && options.referrerInfo.appId === 'wx5a3a7366fd07e119') {
     const result = options.referrerInfo.extraData;
     if (result.ret === 0) {
       const ticket = result.ticket;
       if (!this.captchaTicketExpire[ticket]) {
         this.captchaResult = result;
         this.captchaTicketExpire[ticket] = true;
       }
     } else {
       // 用户关闭了验证码
       // 这里可以加上一些验证失败提示
     }
   }
  },

})