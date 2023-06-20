// pages/uploadImageWithPopUp/uploadImageWithPopUp.js
const app = getApp()//获取应用实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
   //身份证
   idcardType:'',//正反面类型
   idcardUrl_rx:"https://img.yzcdn.cn/vant/leaf.jpg",
   idcardUrl_gh:"",

   //下拉弹出层
   bottomPopShow: false,
   actions: [
     {
       name: '查看图片',
     },
     {
       name: '更换员工身份证',
     },
   ],
  },

 /**
   * 身份证人像面
   * @param {*} e 
   */
  chooseImage: function(e) {
    var that = this;
    if(e){
      that.setData({
        idcardType:e.currentTarget.dataset.idcardtype,
      })
    }
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        that.selectComponent("#loading").showLoading('上传中...');//loading
          let tempFilePaths = res.tempFilePaths;
          //上传图片到后台
          wx.uploadFile({
            url: app.globalData.URL + 'program/assign/submitUploadPdf.htm',
            filePath: tempFilePaths[0],
            name: "file",
            header: { 
              'Content-Type': 'multipart/form-data',
              ["sprit-program-core-" + wx.getStorageSync("id") + "-token"]: wx.getStorageSync("token"),
            },
            formData: {
              id:"3004",
              fileType: "1",//银行卡不传该字段 身份证传1
              name:that.data.name ||"",//fileType:1时必传
              idCard:that.data.idcard || "",//fileType:1时必传
              photoType:that.data.idcardType == '1' ? '1' : '2',//1人像面 2国徽面 fileType:1时必传
              test:'88888888',
            },
            success: function (res) {
              that.selectComponent("#loading").hideLoading();//loading
              var data = JSON.parse(res.data)

              if(data.success){
                if(that.data.idcardType == '1'){
                  that.setData({
                    idcardUrl_rx: data.data.url,//图片url
                  })
                }else{
                  that.setData({
                    idcardUrl_gh: data.data.url,//图片url
                  })
                }
               
              }else{
                wx.showToast({
                  title: data.message,
                  icon: 'none'
                })
              }
      
    
    
            }
            
            })

    
        }
    })
  },

  /**
   * 更换身份照片
   */
  replaceImage:function(e){
    var that = this;
    that.setData({
      idcardType:e.currentTarget.dataset.idcardtype,
      bottomPopShow:true,
    })
    
  },

  /**
   * 查看身份证照片
   */
  watchIdcardImage:function(idcard_img_list){
    wx.previewImage({
      urls: idcard_img_list,//必须为数组形式
    })
  },

  /**
   * 更换图片弹出层
   */
  onClose() {
    this.setData({ bottomPopShow: false });
  },
  onSelect(event) {
    var that = this
    if(event.detail.name == '查看图片'){
      let idcard_img_list = [];
      if(that.data.idcardType == '1'){
        idcard_img_list.push(that.data.idcardUrl_rx);
      }else{
        idcard_img_list.push(that.data.idcardUrl_gh);
      }
      this.watchIdcardImage(idcard_img_list);//查看图片
    
    }else if(event.detail.name == '更换员工身份证'){
      that.chooseImage();//上传
    }else{
      wx.showToast({
        title: "event.detail.name is error",
        icon: 'none'
      })
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