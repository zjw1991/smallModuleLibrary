var app = getApp();
  Page({
 
    /**
     * 页面的初始数据
     */
    data: {


      evalatImage:'',
      bgBanner:'',
      imagePath:"",
      maskHidden:false,
      qrcode_image:''
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
      var  that = this;
      wx.getImageInfo({
        src: "https://m.xinjuenet.com/images/banner/b-xldh.jpg",
        success(res) {
          console.log("banner临时路径:" + res.path);
          that.setData({
            evalatImage: res.path
          })
        }
      })

      that.qrcode_image();
      wx.getImageInfo({
        src: that.data.qrcode_image,
        success(res) {
          console.log("二维码:" + res.path);
          that.setData({
            qrcode_image: res.path
          })
        }
      })
    },
   

 
    //点击生成海报
    formSubmit: function (e) {
      var that = this;
      wx.showToast({
        title: '海报生成中...',
        icon: 'loading',
        duration: 1000
      });
      that.createNewImg();
      setTimeout(function () {
        wx.hideToast()
        that.setData({
          maskHidden: true
        });
      }, 1000);
    },
    //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
    createNewImg: function () {
      var that = this;
      var context = wx.createCanvasContext('mycanvas');
      context.clearRect(0, 0, 375, 660);
      context.setFillStyle("#fff")
      context.fillRect(0, 0, 375, 660)
      context.save();
   
      var path = that.data.evalatImage;
      context.drawImage(path, 0, 0, 375, 183);
   
   
      var path1 = that.data.bgBanner;
      console.log("海报底部背景图" + path1);
      var path2 = that.data.qrcode_image;
      console.log("海报底部二维码" + path2);
      context.setFontSize(16);
      context.setFillStyle('#333');
      context.setTextAlign('left');
      context.fillText("测试结果", 60, 230);
      context.stroke();
      context.save();
   
      var titl = "分享标题";
      context.setFontSize(18);
      context.setFillStyle('#333');
      context.setTextAlign('left');
      context.font = 'normal bold 18px sans-serif';
      context.fillText(titl, 60, 270);
      context.stroke();
      context.save();
   
   
   
      context.setFontSize(16);
      context.setFillStyle('#333');
      context.setTextAlign('left');
      context.fillText("测试说明", 60, 320);
      context.stroke();
      context.save();
      context.drawImage(path1, 0, 550, 375, 130);
   
      var results = "分享的文本信息，布上下文 canvasID";
   
      // 测试结果说明
      that.dealWords({
        ctx: context,                     //画布上下文 canvasID
        fontSize: 16,                //字体大小
        word: results,                  //需要处理的文字
        maxWidth: 270,             //一行文字最大宽度
        x: 60,                    //文字在x轴要显示的位置
        y: 340,                      //文字在y轴要显示的位置
        maxLine: 6              //文字最多显示的行数
      });
      context.stroke();
      context.save(); //保存之前的画布设置
   
      //绘制头像
      context.beginPath();
      context.arc(50, 225, 5, 0, 2 * Math.PI);
      context.setStrokeStyle("#c7eddd");
      context.setFillStyle("#44bf8c");
      context.clip(); //裁剪上面的圆形
      context.fill();//填充
      context.restore();//因为clip是剪切了画布  则后面所有的操作都会限制在被裁减的区域内可见  用restore可以恢复之前的设置
      context.closePath();
   
      context.save(); //保存之前的画布设置
      context.beginPath();
      context.arc(50, 315, 5, 0, 2 * Math.PI);
      context.setStrokeStyle("#c7eddd");
      context.setFillStyle("#44bf8c");
      context.clip(); //裁剪上面的圆形
      context.fill();//填充
      context.restore();
      context.closePath();
   
      context.save(); //保存之前的画布设置
      context.beginPath();
      context.arc(55, 610, 50, 0, 2 * Math.PI);
      context.setStrokeStyle("#ffe200");
      context.clip(); //裁剪上面的圆形
      context.drawImage(path2, 5, 560, 100, 100);
      context.restore();
      context.closePath();
   
      context.save(); //保存之前的画布设置
      context.beginPath();
      // context.setFontSize(16);
      context.setFillStyle('#fff');
      context.setTextBaseline("top");
      context.setTextAlign('left');
      // context.font = 'normal 18px arial';
      // context.fillText("预防疫情四大宅家心理健康测评", 115, 565);
      // context.fillText("预防疫情四大宅家心理健康测评", 115, 589);
      that.dealWords({
        ctx: context,                     //画布上下文 canvasID
        fontSize: 16,                //字体大小
        word: titl,                 //需要处理的文字
        maxWidth: 240,             //一行文字最大宽度
        x: 115,                   //文字在x轴要显示的位置
        y: 540,                      //文字在y轴要显示的位置
        maxLine: 2              //文字最多显示的行数
      });
      context.stroke();
      context.closePath();
      context.save(); //保存之前的画布设置
      context.draw(true);//true表示保留之前绘制内容
   
   
      //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
      setTimeout(function () {
        wx.canvasToTempFilePath({
          canvasId: 'mycanvas',
          success: function (res) {
            var tempFilePath = res.tempFilePath;
            that.setData({
              imagePath: tempFilePath
            });
          },
          fail: function (res) {
            console.log(res);
          }
        });
      }, 1000);
    },
    //文本换行
    dealWords(options) {
      options.ctx.setFontSize(options.fontSize);//设置字体大小
      var allRow = Math.ceil(options.ctx.measureText(options.word).width / options.maxWidth);//实际总共能分多少行
      var count = allRow >= options.maxLine ? options.maxLine : allRow;//实际能分多少行与设置的最大显示行数比，谁小就用谁做循环次数
   
      var endPos = 0;//当前字符串的截断点
      for (var j = 0; j < count; j++) {
        var nowStr = options.word.slice(endPos);//当前剩余的字符串
        var rowWid = 0;//每一行当前宽度    
        if (options.ctx.measureText(nowStr).width > options.maxWidth) {//如果当前的字符串宽度大于最大宽度，然后开始截取
          for (var m = 0; m < nowStr.length; m++) {
            rowWid += options.ctx.measureText(nowStr[m]).width;//当前字符串总宽度
            if (rowWid > options.maxWidth) {
              if (j === options.maxLine - 1) { //如果是最后一行
                options.ctx.fillText(nowStr.slice(0, m - 1) + '...', options.x, options.y + (j + 1) * 25);    //(j+1)*20这是每一行的高度        
              } else {
                options.ctx.fillText(nowStr.slice(0, m), options.x, options.y + (j + 1) * 25);
              }
              endPos += m;//下次截断点
              break;
            }
          }
        } else {//如果当前的字符串宽度小于最大宽度就直接输出
          options.ctx.fillText(nowStr.slice(0), options.x, options.y + (j + 1) * 25);
        }
      }
    },
    //点击保存到相册
    baocun: function () {
      var that = this
      wx.saveImageToPhotosAlbum({
        filePath: that.data.imagePath,
        success(res) {
          wx.showModal({
            content: '图片已保存到相册，赶紧晒一下吧~',
            showCancel: false,
            confirmText: '好的',
            confirmColor: '#333',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定');
                /* 该隐藏的隐藏 */
                that.setData({
                  maskHidden: false
                })
              }
            }, fail: function (res) {
              console.log(11111)
            }
          })
        }
      })
    },
    qrcode_image: function () {
      let that = this;
      wx.request({
        url: 'https://api.weixin.qq.com/cgi-bin/token',
        data: {
          grant_type: 'client_credential',
          appid: '你的APPID', //不能缺少
          secret: '你的APPID秘钥' //不能缺少
        },
        success: function (res) {
          wx.request({
            url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=' + res.data.access_token,
            data: {
              "path": "pages/index/index", //默认跳转到主页:pages/index/index，可指定
              "width": 200,
              "scene": "type=0&evaId=" + that.data.id,
            },
            responseType: 'arraybuffer', // 这行很重要,转为二进制数组
            header: {
              'content-type': 'application/json;charset=utf-8'
            },
            method: 'POST',
            success(res) {
              //转为base64
              let bin64 = wx.arrayBufferToBase64(res.data);
   
              that.setData({
                //base 64设置到页面上
                qrcode_image: "data:image/png;base64," + bin64
              });
            }
          })
        }
      })
    }
  })