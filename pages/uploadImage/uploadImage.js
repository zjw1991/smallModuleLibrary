var app = getApp();
var utils = require('../../utils/activity_util');

Page({
  data: {
    uploaderList: [],
    uploaderNum:0,
    showUpload:true,
    fileNameList:[],//图片名集合
    picUrlList:[],//图片链接集合
  },


/**
 * 选择图片
 * @param {*} e 
 */
chooseImage: function(e) {
  var that = this;
  // that.setData({
  //   fileNameList:[],
  // })
  wx.chooseMedia({
      count: 9 - that.data.uploaderNum, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
          console.log(res)
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          let tempFilePaths = res.tempFiles;
          
          let uploaderList = that.data.uploaderList.concat(tempFilePaths);
          if (uploaderList.length==9){
              that.setData({
                  showUpload:false
              })
          }
          that.setData({
              // uploaderList: uploaderList,//本地临时资源集合
              uploaderNum: uploaderList.length,
          })
          
          // console.log(tempFilePaths[0]);
          // console.log(uploaderList.length);
          for(var i = 0; i < uploaderList.length; i++){
            console.log(tempFilePaths[i])
          //上传图片到后台
          //上传图片到后台
          //上传图片到后台
          wx.uploadFile({
            url: app.globalData.URL + 'program/assign/submitUploadPdf.htm',
            filePath: tempFilePaths[i].tempFilePath,
            name: "file",
            header: { 
              'Content-Type': 'multipart/form-data',
              ["sprit-program-core-" + wx.getStorageSync("id") + "-token"]: wx.getStorageSync("token"),
            },
            formData: {
              id: wx.getStorageSync("id"),
            },
            success: function (res) {
              var data = JSON.parse(res.data)
                  if (that.data.fileNameList.length < 9){
                    that.setData({
                      fileNameList:that.data.fileNameList.concat(data.data.fileName),//图片名称集合
                      picUrlList:that.data.picUrlList.concat(data.data.url),//图片url集合
                    })

                  }
                  if(that.data.fileNameList.length == 9){
                    that.setData({
                      showUpload:false
                    })
                  }
              }
            
            })
          }

  
      }
  })
},


/**
 * 删除图片
 * @param {*} e 
 */
clearImg:function(e){
  var that = this;
  var nowList = [];//新数据
  var picUrlList = this.data.picUrlList;//原数据

  for (let i = 0; i < picUrlList.length;i++){
      if (i == e.currentTarget.dataset.index){
        //获取删除的文件
        //获取删除的文件

        console.log(i);
        var arr = that.data.fileNameList.splice(i,1);
        // console.log(that.data.fileNameList.splice(i));
        console.log(that.data.fileNameList);
        //获取删除文件位置索引，然后再根据索引删除数组中对应文件名
          continue;
      }else{
          nowList.push(picUrlList[i]);
      }
  }
  this.setData({
    uploaderNum: this.data.uploaderNum - 1,
    picUrlList: nowList,
    showUpload: true
  })

},

/**
 * 展示图片
 * @param {*} e 
 */
showImg:function(e){
  var that=this;
  wx.previewImage({
      urls: that.data.picUrlList,
      current: that.data.picUrlList[e.currentTarget.dataset.index]
  })
},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  
})

