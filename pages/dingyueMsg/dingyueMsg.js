// pages/dialog/dialog.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    dingyueState:[],
  },

/**
 * 点击订阅
 */
dingyue: function (){
  var that = this
  that.setData({
    dingyueState:[],
  })
  var tmplIds = ['VBuEtjiIVm04XkTgeWXedmMNtEuRpQwA5R950B6eOoQ','ZD-sd_xRS2HXwOh74CeXEoLwZGfYiG67DNBrO7ceeNw'];

  //获取下发权限
  //根据wx.getSetting()的 withSubscriptions 这个参数获取用户是否打开订阅消息总开关。
  //后面我们需要获取用户是否同意总是同意消息推送。所以这里要给它设置为true 。
wx.getSetting({
  //这里设置为true,下面才会返回mainSwitch
  withSubscriptions: true,   
  success: function(res){   
  console.log(res);

    // 打开了订阅消息总开关，调起授权界面弹窗
    if (res.subscriptionsSetting.mainSwitch) {  
      //勾选了，不再提醒
      //勾选了，不再提醒
      //勾选了，不再提醒
      if (res.subscriptionsSetting.itemSettings != null) { 
        //遍历多条模板id
        for(var i = 0; i < tmplIds.length; i++){
          let moIdState = res.subscriptionsSetting.itemSettings[tmplIds[i]];  //同意的消息模板id
          console.log(moIdState);
          that.data.dingyueState.push(moIdState);
          that.setData({
            dingyueState:that.data.dingyueState,
          })

          if(moIdState === 'accept'){   
            console.log('接受了消息推送');

          }else if(moIdState === 'reject'){
            console.log("拒绝消息推送");
            //如果有一个拒绝的，可以设置标记，并引导用户去设置面板打开
  
          }else if(moIdState === 'ban'){
            console.log("已被后台封禁");
          }
          
        }
        console.log(that.data.dingyueState);
    
      }
     
      //未勾选，有弹框
      //未勾选，有弹框
      //未勾选，有弹框
      else { 
        //弹出授权弹框
        wx.requestSubscribeMessage({   
          tmplIds: tmplIds,
          success (res) { 
              console.log(res);
              for(var i = 0; i < tmplIds.length; i++){ //遍历多条模板id
                let moIdState = res[tmplIds[i]];  //同意的消息模板id
                that.data.dingyueState.push(moIdState);
                that.setData({
                  dingyueState:that.data.dingyueState,
                })
              }

          },
          fail (er){
            that.comfirmPop('订阅消息失败');
            console.log(er);
          }
        })   
      }
    }
    //关闭了订阅消息总开关
    else {
      console.log('订阅消息未开启');
      that.openMsgSetting();//引导用户打订阅总开关
    }      
  },
  fail: function(error){
    console.log(error);
  },
})
  
},


  /**
   * 引导打开订阅消息面板
   */
  openMsgSetting:function(){
    var that = this;
      wx.showModal({
        title: '订阅消息',
        content: '订阅后，有消息会通过微信通知您，是否去开启？',
        confirmText: '开启',
        confirmColor: '#345391',
        // showCancel: false,//隐藏取消按钮
        cancelText: '取消',
        cancelColor: '#999999',
        success: res => {
          console.log(res);
          if (res.confirm) {//点击了确定
            wx.openSetting({
              success(res) {
                that.dingyue();
              },
              fail(err) {
                //失败
                console.error(err);
              }
            })
          }else{//点击取消，跳过订阅消息
            
          }

          
        }
      })
  },


  /**
   * 封装确认弹框
   */
  comfirmPop:function(message){
    var that = this;
    wx.showModal({
      title: '温馨提示',
      content: message,
      showCancel:false,
      confirmText:'确定',
      confirmColor:'#1677FF',
      success(res) {
        if (res.confirm) {//点击了确定

        }else{

        }
      }
    })
  },





// /**
//  * 点击订阅
//  */
// dingyue: function (){
//   let that = this
//   var tmplIds = ['rrLUUtQm4yvtU4sWk29hzad5jSp4DQFl9xtcD0S261A','VBuEtjiIVm04XkTgeWXedmMNtEuRpQwA5R950B6eOoQ'];

//   wx.getSetting({
//     withSubscriptions: true,
//     success(res) {
//       // console.log(res)
//       if (res.subscriptionsSetting && res.subscriptionsSetting.mainSwitch) {
//         if (res.subscriptionsSetting.itemSettings && res.subscriptionsSetting.itemSettings[tmplIds]) {//用户点击了总是保持以上选择
          
//           let item = res.subscriptionsSetting.itemSettings[tmplIds]
//           if (item == "reject") {
//             that.dingyueComfirm(tmplIds);
//           } else if (item == "accept") {
//             console.log('提示：您已经开启订阅消息');
//           } else if (item == "ban") {
//             console.log('提示：您已经被后台封禁');
//           }
//         }
//         else{
//           that.dingyueComfirm(tmplIds);
//         }

//       } else {
//         that.dingyueComfirm(tmplIds);
//       }
//     }
//   })
// },
// dingyueComfirm: function (tmplIds){
//   wx.showModal({
//     title: '订阅消息',
//     content: '订阅后，有消息会通过微信通知您',
//     success: (res) => {
//       if (res.confirm) {
//         console.log(11111);
//         wx.requestSubscribeMessage({
//           tmplIds: ['rrLUUtQm4yvtU4sWk29hzad5jSp4DQFl9xtcD0S261A','VBuEtjiIVm04XkTgeWXedmMNtEuRpQwA5R950B6eOoQ'],
//           success: (res) => {
//             console.log(res);
//             let oneReject = false;
       
//             for (let i = 0; i < tmplIds.length; i++) {
//               const element = tmplIds[i];
//               if (res[element] == "reject") {//其中有一个通知拒绝了
//                 oneReject = true;
//               }
//             };
            
//             if (oneReject == false) {//全部都订阅了
//               wx.showToast({
//                 title: '订阅成功！',
//                 duration: 1000,
//                 success(data) {
//                   //成功
//                   console.error(data);
//                 }
//               })
//             } 
//             else{//其中至少有一个取消订阅了，引导用户，手动引导用户点击按钮，去设置页开启，## Modals是自定义组件
//               wx.showModal({
//                 title: '订阅消息',
//                 content: '您当前拒绝接受消息通知，是否去开启',
//                 confirmText: '开启授权',
//                 confirmColor: '#345391',
//                 cancelText: '仍然拒绝',
//                 cancelColor: '#999999',
//                 success: res => {
//                   wx.openSetting({
//                     success(res) {
//                       // console.log(res.authSetting)
//                       // res.authSetting = {
//                       //   "scope.userInfo": true,
//                       //   "scope.userLocation": true
//                       // }
//                     },
//                     fail(err) {
//                       //失败
//                       console.error(err);
//                     }
//                   })
//                 }
//               })
//             }
//           },

//           fail(err) {
//             console.error("失败消息");
//             console.error(err);
//             console.error("失败消息");
//           }

//         })
//       }
//     }
//   })
// },


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