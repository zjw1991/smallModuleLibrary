// pages/poster/poster.js
Page({

  /**
   * 页面的初始数据
   */
  data: {


    //二维码参数
    showPosterPop:false,
    qrCodeImg: '../../images/qrCode.jpg', //二维码图片，一般从后台获取
    posterBg: '/images/jobDetailsavatarContent.png',//封面图
    posterBg2: '/images/jobDetailsavatarContent2.png',
    posterBg3: '/images/jobDetailsavatarContent3.png',
    labelList:['工资高','福利好','离家近'],
    userHeaderImg: '', //微信头像
  },


  /**
   * 授权并打开二维码
   */

  showExclusiveQRcode() {
    let that = this
    that.setData({
      show_bottom_info:false,
      imagePath:'',
      imagePath2:'',
      imagePath3:'',
    })
    if(wx.getStorageSync('userHeaderImg')){//本地有头像和昵称
      wx.showLoading({
        title: '正在生成海报',
      })
      that.setData({
        userHeaderImg: wx.getStorageSync('userHeaderImg'),
        nickName:wx.getStorageSync('nickName'),
        showPosterPop: true,
        shareBottomPop:false,
      })
      setTimeout(() => {
        //1
        const query = wx.createSelectorQuery()
        query.select('#mycanvas')
          .fields({
            id: true,
            node: true,
            size: true
          })
          .exec(that.canvasInit.bind(this))
          setTimeout(() => {//由于canvas生成变慢，此处需要加入适当的延时才能完整生成图片
            that.savePoster();
          }, 1000);

          //2
          const query2 = wx.createSelectorQuery()
          query2.select('#mycanvas2')
            .fields({
              id: true,
              node: true,
              size: true
            })
            .exec(that.canvasInit2.bind(this))
            setTimeout(() => {
              that.savePoster2();
            }, 1000);

          //3
          const query3 = wx.createSelectorQuery()
          query3.select('#mycanvas3')
            .fields({
              id: true,
              node: true,
              size: true
            })
            .exec(that.canvasInit3.bind(this))
            setTimeout(() => {
              that.savePoster3();
            }, 1000);
          
      }, 0)

    }
    else{//本地无头像缓存
      wx.getUserProfile({
        desc: '用于生成专属代理二维码', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          wx.showLoading({
            title: '正在生成海报',
          })
          that.setData({
            userHeaderImg: res.userInfo.avatarUrl,
            nickName:res.userInfo.nickName,
            showPosterPop: true,
            shareBottomPop:false,
          })
          wx.setStorageSync('userHeaderImg', res.userInfo.avatarUrl);//微信头像
          wx.setStorageSync('nickName', res.userInfo.nickName);//微信昵称
          setTimeout(() => {
            //1
            const query = wx.createSelectorQuery()
            query.select('#mycanvas')
              .fields({
                id: true,
                node: true,
                size: true
              })
              .exec(that.canvasInit.bind(this))
              setTimeout(() => {
                that.savePoster();
              }, 1000);
    
              //2
              const query2 = wx.createSelectorQuery()
              query2.select('#mycanvas2')
                .fields({
                  id: true,
                  node: true,
                  size: true
                })
                .exec(that.canvasInit2.bind(this))
                setTimeout(() => {
                  that.savePoster2();
                }, 1000);
    
              //3
              const query3 = wx.createSelectorQuery()
              query3.select('#mycanvas3')
                .fields({
                  id: true,
                  node: true,
                  size: true
                })
                .exec(that.canvasInit3.bind(this))
                setTimeout(() => {
                  that.savePoster3();
                }, 1000);
              
          }, 0)
        }
      })

    }
    
  },



  /**
   * 调用各部分方法
   */
  canvasInit(res) {
    const canvas = res[0].node
    const ctx = canvas.getContext('2d')
    const dpr = wx.getSystemInfoSync().pixelRatio;//获取屏幕的像素比  值为2
    canvas.width = res[0].width * dpr;
    canvas.height = res[0].height * dpr;
    ctx.scale(dpr, dpr);
    this.setData({
      canvas,
      ctx
    });
    //执行顺序
    this.posterBg(ctx, canvas).then(res => {//绘制背景
      this.qrCodeImgCreat(ctx).then(rew => {//绘制二维码
        this.headerDraw(ctx).then(rew => {//绘制头像
          this.labelDraw(ctx);//绘制标签
          this.fontDraw(ctx);//绘制文字
        })
      })
    })
  },
  canvasInit2(res) {
    const canvas2 = res[0].node
    const ctx2 = canvas2.getContext('2d')
    const dpr = wx.getSystemInfoSync().pixelRatio;//获取屏幕的像素比  值为2
    canvas2.width = res[0].width * dpr;
    canvas2.height = res[0].height * dpr;
    ctx2.scale(dpr, dpr); //缩放
    this.setData({
      canvas2,
      ctx2
    });
    //执行顺序
    this.posterBg2(ctx2, canvas2).then(res => {//绘制背景
      this.qrCodeImgCreat2(ctx2).then(rew => {//绘制二维码
        this.headerDraw2(ctx2).then(rew => {//绘制头像
          this.labelDraw2(ctx2);//绘制标签
          this.fontDraw2(ctx2);//绘制文字
        })
      })
    })
  },
  canvasInit3(res) {
    const canvas3 = res[0].node
    const ctx3 = canvas3.getContext('2d')
    const dpr = wx.getSystemInfoSync().pixelRatio;//获取屏幕的像素比  值为2
    canvas3.width = res[0].width * dpr;
    canvas3.height = res[0].height * dpr;
    ctx3.scale(dpr, dpr); //缩放
    this.setData({
      canvas3,
      ctx3
    });
    //执行顺序
    this.posterBg3(ctx3, canvas3).then(res => {//绘制背景
      this.qrCodeImgCreat3(ctx3).then(rew => {//绘制二维码
        this.headerDraw3(ctx3).then(rew => {//绘制头像
          this.labelDraw3(ctx3);//绘制标签
          this.fontDraw3(ctx3);//绘制文字
        })
      })
    })
  },


  /**
   * 绘制海报背景
   */
  posterBg(ctx, canvas) {
    return new Promise(res => {
      let img = this.data.canvas.createImage(); //创建img对象
      img.src = this.data.posterBg;
      img.onload = () => {
        this.data.ctx.drawImage(img, 0, 0, 380, 560);
        setTimeout(() => {
          res(true);//回调
        }, 100);
      };
    })
  },
  posterBg2(ctx2, canvas2) {
    return new Promise(res => {
      let img = this.data.canvas2.createImage(); //创建img对象
      img.src = this.data.posterBg2;
      img.onload = () => {
        this.data.ctx2.drawImage(img, 0, 0, 380, 560);
        setTimeout(() => {
          res(true)
        }, 100);
      };
    })
  },
  posterBg3(ctx3, canvas3) {
    return new Promise(res => {
      let img = this.data.canvas3.createImage(); //创建img对象
      img.src = this.data.posterBg3;
      img.onload = () => {
        this.data.ctx3.drawImage(img, 0, 0, 380, 560);
        setTimeout(() => {
          res(true)
        }, 100);
      };
    })
  },


  /**
   * 绘制二维码
   */
  qrCodeImgCreat(ctx) {
    const that = this;
    return new Promise(rrr => {
      let img = that.data.canvas.createImage(); //创建img对象
      img.src = that.data.qrCodeImg
      img.onload = () => {
        that.data.ctx.drawImage(img, 220, 400, 100, 100);
      };
      setTimeout(() => {
        rrr(true)
      }, 100);
    })
  },
  qrCodeImgCreat2(ctx2) {
    const that = this;
    return new Promise(rrr => {
      let img = that.data.canvas2.createImage(); //创建img对象
      img.src = that.data.qrCodeImg
      img.onload = () => {
        that.data.ctx2.drawImage(img, 220, 400, 100, 100);
      };
      setTimeout(() => {
        rrr(true)
      }, 100);
    })
  },
  qrCodeImgCreat3(ctx3) {
    const that = this;
    return new Promise(rrr => {
      let img = that.data.canvas3.createImage(); //创建img对象
      img.src = that.data.qrCodeImg
      img.onload = () => {
        that.data.ctx3.drawImage(img, 220, 400, 100, 100);
      };
      setTimeout(() => {
        rrr(true)
      }, 100);
    })
  },


  
  
  /**
   * 绘制头像
   */
  headerDraw(ctx) {
    const that = this;
    return new Promise(rrr => {
      let imgTwo = this.data.canvas.createImage(); //创建img对象
      imgTwo.src = this.data.userHeaderImg;

      imgTwo.onload = () => {
        ctx.arc(46, 432, 24, 0, 2 * Math.PI)
        // ctx.clip()
        ctx.drawImage(imgTwo, 22, 408, 48, 48);//此处位置变动需要同步上面位置
        setTimeout(() => {
          rrr(true)
        }, 100);
      };

    })
  },
  headerDraw2(ctx2) {
    const that = this;
    return new Promise(rrr => {
      let imgTwo = this.data.canvas2.createImage(); //创建img对象
      imgTwo.src = this.data.userHeaderImg;

      imgTwo.onload = () => {
        ctx2.arc(46, 432, 24, 0, 2 * Math.PI)
        // ctx2.clip()
        ctx2.drawImage(imgTwo, 22, 408, 48, 48);//此处位置变动需要同步上面位置
        setTimeout(() => {
          rrr(true)
        }, 100);
      };

    })
  },
  headerDraw3(ctx3) {
    const that = this;
    return new Promise(rrr => {
      let imgTwo = this.data.canvas3.createImage(); //创建img对象
      imgTwo.src = this.data.userHeaderImg;

      imgTwo.onload = () => {
        ctx3.arc(46, 432, 24, 0, 2 * Math.PI)
        // ctx3.clip()
        ctx3.drawImage(imgTwo, 22, 408, 48, 48);//此处位置变动需要同步上面位置
        setTimeout(() => {
          rrr(true)
        }, 100);
      };

    })
  },

  

  /**
   * 绘制图形标签
   */
  labelDraw(ctx) {
    var that = this;
    for(var i = 0; i < that.data.labelList.length; i++){
    let text = that.data.labelList[i];
     //画圆角边框
     ctx.font = 'normal  14px sans-serif';
     ctx.fillStyle = "#fff";
     ctx.textAlign='left';
     var discountText = text
     var bdColor = '#ededed';
     var bdBackground = 'transparent';
     var bdRadius = 4;
     var textPadding = 6;
     var boxHeight = 20;
     console.log(ctx.measureText(discountText).width);//每个标签的宽度
     var boxWidth,boxWidth1,boxWidth2;
     //标签之间等距
     if(i == 0){
       boxWidth = ctx.measureText(discountText).width + textPadding * 2;
      ctx.fillText(discountText, 30, 220);
      that.roundRect(ctx, 25, 205, boxWidth, boxHeight, bdRadius, bdBackground, bdColor)
     }else if(i == 1){
      boxWidth1 = ctx.measureText(discountText).width + textPadding * 2;
      ctx.fillText(discountText, 30+boxWidth+5, 220);
      that.roundRect(ctx, 25+boxWidth+5, 205, boxWidth1, boxHeight, bdRadius, bdBackground, bdColor)
     }else if(i == 2){
      boxWidth2 = ctx.measureText(discountText).width + textPadding * 2;
      ctx.fillText(discountText, 30+boxWidth+boxWidth1+10, 220);
      that.roundRect(ctx, 25+boxWidth+boxWidth1+10, 205, boxWidth2, boxHeight, bdRadius, bdBackground, bdColor)
     }
    }
  },
  labelDraw2(ctx2) {
    var that = this;
    for(var i = 0; i < that.data.labelList.length; i++){
    let text = that.data.labelList[i];
     //画圆角边框
     ctx2.font = 'normal  14px sans-serif';
     ctx2.fillStyle = "#fff";
     ctx2.textAlign='left';
     var discountText = text
     var bdColor = '#ededed';
     var bdBackground = 'transparent';
     var bdRadius = 4;
     var textPadding = 6;
     var boxHeight = 20;
     console.log(ctx2.measureText(discountText).width);//每个标签的宽度
     var boxWidth,boxWidth1,boxWidth2;
     //标签之间等距
     if(i == 0){
       boxWidth = ctx2.measureText(discountText).width + textPadding * 2;
      ctx2.fillText(discountText, 30, 220);
      that.roundRect(ctx2, 25, 205, boxWidth, boxHeight, bdRadius, bdBackground, bdColor)
     }else if(i == 1){
      boxWidth1 = ctx2.measureText(discountText).width + textPadding * 2;
      ctx2.fillText(discountText, 30+boxWidth+5, 220);
      that.roundRect(ctx2, 25+boxWidth+5, 205, boxWidth1, boxHeight, bdRadius, bdBackground, bdColor)
     }else if(i == 2){
      boxWidth2 = ctx2.measureText(discountText).width + textPadding * 2;
      ctx2.fillText(discountText, 30+boxWidth+boxWidth1+10, 220);
      that.roundRect(ctx2, 25+boxWidth+boxWidth1+10, 205, boxWidth2, boxHeight, bdRadius, bdBackground, bdColor)
     }
    }
  },
  labelDraw3(ctx3) {
    var that = this;
    for(var i = 0; i < that.data.labelList.length; i++){
    let text = that.data.labelList[i];
     //画圆角边框
     ctx3.font = 'normal  14px sans-serif';
     ctx3.fillStyle = "#fff";
     ctx3.textAlign='left';
     var discountText = text
     var bdColor = '#ededed';
     var bdBackground = 'transparent';
     var bdRadius = 4;
     var textPadding = 6;
     var boxHeight = 20;
     console.log(ctx3.measureText(discountText).width);//每个标签的宽度
     var boxWidth,boxWidth1,boxWidth2;
     //标签之间等距
     if(i == 0){
       boxWidth = ctx3.measureText(discountText).width + textPadding * 2;
      ctx3.fillText(discountText, 30, 220);
      that.roundRect(ctx3, 25, 205, boxWidth, boxHeight, bdRadius, bdBackground, bdColor)
     }else if(i == 1){
      boxWidth1 = ctx3.measureText(discountText).width + textPadding * 2;
      ctx3.fillText(discountText, 30+boxWidth+5, 220);
      that.roundRect(ctx3, 25+boxWidth+5, 205, boxWidth1, boxHeight, bdRadius, bdBackground, bdColor)
     }else if(i == 2){
      boxWidth2 = ctx3.measureText(discountText).width + textPadding * 2;
      ctx3.fillText(discountText, 30+boxWidth+boxWidth1+10, 220);
      that.roundRect(ctx3, 25+boxWidth+boxWidth1+10, 205, boxWidth2, boxHeight, bdRadius, bdBackground, bdColor)
     }
    }
  },
  //标签画圆角边框
  roundRect(ctx, x, y, w, h, r, fillColor, strokeColor) {
    // 画圆角 ctx、x起点、y起点、w宽度、y高度、r圆角半径、fillColor填充颜色、strokeColor边框颜色
    // 开始绘制
    ctx.beginPath()
    // 绘制左上角圆弧 Math.PI = 180度
    // 圆心x起点、圆心y起点、半径、以3点钟方向顺时针旋转后确认的起始弧度、以3点钟方向顺时针旋转后确认的终止弧度
    ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)
    // 绘制border-top
    // 移动起点位置 x终点、y终点
    ctx.moveTo(x + r, y)
    // 画一条线 x终点、y终点
    ctx.lineTo(x + w - r, y)
    // ctx.lineTo(x + w, y + r)
    // 绘制右上角圆弧
    ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)
    // 绘制border-right
    ctx.lineTo(x + w, y + h - r)
    // ctx.lineTo(x + w - r, y + h)
    // 绘制右下角圆弧
    ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)
    // 绘制border-bottom
    ctx.lineTo(x + r, y + h)
    // ctx.lineTo(x, y + h - r)
    // 绘制左下角圆弧
    ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)
    // 绘制border-left
    ctx.lineTo(x, y + r)
    // ctx.lineTo(x + r, y)
    if (fillColor) {
      // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
      ctx.fillStyle = fillColor;
      // 对绘画区域填充
      ctx.fill()
    }
    if (strokeColor) {
      // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
      ctx.strokeStyle=strokeColor;
      // 画出当前路径的边框
      ctx.stroke()
    }
    // 关闭一个路径
    // ctx.closePath()
    // 剪切，剪切之后的绘画绘制剪切区域内进行，需要save与restore
    // ctx.clip()
  },
  roundRect2(ctx2, x, y, w, h, r, fillColor, strokeColor) {
    // 画圆角 ctx2、x起点、y起点、w宽度、y高度、r圆角半径、fillColor填充颜色、strokeColor边框颜色
    // 开始绘制
    ctx2.beginPath()
    // 绘制左上角圆弧 Math.PI = 180度
    // 圆心x起点、圆心y起点、半径、以3点钟方向顺时针旋转后确认的起始弧度、以3点钟方向顺时针旋转后确认的终止弧度
    ctx2.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)
    // 绘制border-top
    // 移动起点位置 x终点、y终点
    ctx2.moveTo(x + r, y)
    // 画一条线 x终点、y终点
    ctx2.lineTo(x + w - r, y)
    // ctx2.lineTo(x + w, y + r)
    // 绘制右上角圆弧
    ctx2.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)
    // 绘制border-right
    ctx2.lineTo(x + w, y + h - r)
    // ctx2.lineTo(x + w - r, y + h)
    // 绘制右下角圆弧
    ctx2.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)
    // 绘制border-bottom
    ctx2.lineTo(x + r, y + h)
    // ctx2.lineTo(x, y + h - r)
    // 绘制左下角圆弧
    ctx2.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)
    // 绘制border-left
    ctx2.lineTo(x, y + r)
    // ctx2.lineTo(x + r, y)
    if (fillColor) {
      // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
      ctx2.fillStyle = fillColor;
      // 对绘画区域填充
      ctx2.fill()
    }
    if (strokeColor) {
      // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
      ctx2.strokeStyle=strokeColor;
      // 画出当前路径的边框
      ctx2.stroke()
    }
    // 关闭一个路径
    // ctx2.closePath()
    // 剪切，剪切之后的绘画绘制剪切区域内进行，需要save与restore
    // ctx2.clip()
  },
  roundRect3(ctx3, x, y, w, h, r, fillColor, strokeColor) {
    // 画圆角 ctx3、x起点、y起点、w宽度、y高度、r圆角半径、fillColor填充颜色、strokeColor边框颜色
    // 开始绘制
    ctx3.beginPath()
    // 绘制左上角圆弧 Math.PI = 180度
    // 圆心x起点、圆心y起点、半径、以3点钟方向顺时针旋转后确认的起始弧度、以3点钟方向顺时针旋转后确认的终止弧度
    ctx3.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)
    // 绘制border-top
    // 移动起点位置 x终点、y终点
    ctx3.moveTo(x + r, y)
    // 画一条线 x终点、y终点
    ctx3.lineTo(x + w - r, y)
    // ctx3.lineTo(x + w, y + r)
    // 绘制右上角圆弧
    ctx3.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)
    // 绘制border-right
    ctx3.lineTo(x + w, y + h - r)
    // ctx3.lineTo(x + w - r, y + h)
    // 绘制右下角圆弧
    ctx3.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)
    // 绘制border-bottom
    ctx3.lineTo(x + r, y + h)
    // ctx3.lineTo(x, y + h - r)
    // 绘制左下角圆弧
    ctx3.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)
    // 绘制border-left
    ctx3.lineTo(x, y + r)
    // ctx3.lineTo(x + r, y)
    if (fillColor) {
      // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
      ctx3.fillStyle = fillColor;
      // 对绘画区域填充
      ctx3.fill()
    }
    if (strokeColor) {
      // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
      ctx3.strokeStyle=strokeColor;
      // 画出当前路径的边框
      ctx3.stroke()
    }
    // 关闭一个路径
    // ctx3.closePath()
    // 剪切，剪切之后的绘画绘制剪切区域内进行，需要save与restore
    // ctx3.clip()
  },



  /**
   * 绘制文字
   */
  fontDraw(ctx) {
    let text1 = '岗位名';//岗位名
    ctx.font = 'normal bold 30px sans-serif';
    ctx.fillStyle = "#fff";
    ctx.fillText(text1, 24, 60, 200)//ctx.fillText(文字, 像素, 移动y, 移动x)
    let text2 = '100';//工资金额
    ctx.fillStyle = "rgba(0,0,0)";
    ctx.font = 'normal bold 26px sans-serif';
    ctx.fillStyle = "#fff"; 
    ctx.fillText(text2, 24, 100, 200);
    let text3 = "上海";//城市
    ctx.fillStyle = "rgba(0,0,0)";
    ctx.font = 'normal 22px sans-serif';
    ctx.fillStyle = "#fff"; 
    ctx.fillText(text3, 24, 140, 200);
    let text4 = "用工单位";//用工单位
    ctx.fillStyle = "rgba(0,0,0)";
    ctx.font = 'normal 22px sans-serif';
    ctx.fillStyle = "#fff"; 
    ctx.fillText(text4, 24, 180, 200);
    // let text = (this.data.userType == '2' || this.data.userType == '3') ? this.data.clientUsersName : this.data.nickName
    let text5 = this.data.nickName;
    ctx.font = 'normal  18px sans-serif';
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillText(text5, 80, 440, 290);
    let text6 = '推荐给你一个好岗位';
    ctx.font = 'normal  14px sans-serif';
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillText(text6, 24, 480, 310);
    let text7 = '长按识别查看详情';
    ctx.fillStyle = "rgba(0,0,0)";//添加颜色
    ctx.font = 'normal  12px sans-serif';//指定文字样式
    ctx.fillStyle = "rgba(0, 0, 0, 0.4)"; //新增样式
    ctx.fillText(text7, 24, 510, 280);
  },
  fontDraw2(ctx2) {
    let text1 = '岗位名';//岗位名
    ctx2.font = 'normal bold 30px sans-serif';
    ctx2.fillStyle = "#fff";
    ctx2.fillText(text1, 24, 60, 200)//ctx2.fillText(文字, 像素, 移动y, 移动x)
    let text2 = '100';//工资金额
    ctx2.fillStyle = "rgba(0,0,0)";
    ctx2.font = 'normal bold 26px sans-serif';
    ctx2.fillStyle = "#fff"; 
    ctx2.fillText(text2, 24, 100, 200);
    let text3 = "上海";//城市
    ctx2.fillStyle = "rgba(0,0,0)";
    ctx2.font = 'normal 22px sans-serif';
    ctx2.fillStyle = "#fff"; 
    ctx2.fillText(text3, 24, 140, 200);
    let text4 = "用工单位";//用工单位
    ctx2.fillStyle = "rgba(0,0,0)";
    ctx2.font = 'normal 22px sans-serif';
    ctx2.fillStyle = "#fff"; 
    ctx2.fillText(text4, 24, 180, 200);
    // let text = (this.data.userType == '2' || this.data.userType == '3') ? this.data.clientUsersName : this.data.nickName
    let text5 = this.data.nickName;
    ctx2.font = 'normal  18px sans-serif';
    ctx2.fillStyle = "rgba(0, 0, 0, 1)";
    ctx2.fillText(text5, 80, 440, 290);
    let text6 = '推荐给你一个好岗位';
    ctx2.font = 'normal  14px sans-serif';
    ctx2.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx2.fillText(text6, 24, 480, 310);
    let text7 = '长按识别查看详情';
    ctx2.fillStyle = "rgba(0,0,0)";//添加颜色
    ctx2.font = 'normal  12px sans-serif';//指定文字样式
    ctx2.fillStyle = "rgba(0, 0, 0, 0.4)"; //新增样式
    ctx2.fillText(text7, 24, 510, 280);
  },
  fontDraw3(ctx3) {
    let text1 = '岗位名';//岗位名
    ctx3.font = 'normal bold 30px sans-serif';
    ctx3.fillStyle = "#fff";
    ctx3.fillText(text1, 24, 60, 200)//ctx3.fillText(文字, 像素, 移动y, 移动x)
    let text2 = '100';//工资金额
    ctx3.fillStyle = "rgba(0,0,0)";
    ctx3.font = 'normal bold 26px sans-serif';
    ctx3.fillStyle = "#fff"; 
    ctx3.fillText(text2, 24, 100, 200);
    let text3 = "上海";//城市
    ctx3.fillStyle = "rgba(0,0,0)";
    ctx3.font = 'normal 22px sans-serif';
    ctx3.fillStyle = "#fff"; 
    ctx3.fillText(text3, 24, 140, 200);
    let text4 = "用工单位";//用工单位
    ctx3.fillStyle = "rgba(0,0,0)";
    ctx3.font = 'normal 22px sans-serif';
    ctx3.fillStyle = "#fff"; 
    ctx3.fillText(text4, 24, 180, 200);
    // let text = (this.data.userType == '2' || this.data.userType == '3') ? this.data.clientUsersName : this.data.nickName
    let text5 = this.data.nickName;
    ctx3.font = 'normal  18px sans-serif';
    ctx3.fillStyle = "rgba(0, 0, 0, 1)";
    ctx3.fillText(text5, 80, 440, 290);
    let text6 = '推荐给你一个好岗位';
    ctx3.font = 'normal  14px sans-serif';
    ctx3.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx3.fillText(text6, 24, 480, 310);
    let text7 = '长按识别查看详情';
    ctx3.fillStyle = "rgba(0,0,0)";//添加颜色
    ctx3.font = 'normal  12px sans-serif';//指定文字样式
    ctx3.fillStyle = "rgba(0, 0, 0, 0.4)"; //新增样式
    ctx3.fillText(text7, 24, 510, 280);
  },


  /**
   * 生成图片
   */
  savePoster() {
    var that = this;
    console.log('保存canvasId', this.data.canvas._canvasId)
    wx.canvasToTempFilePath({     //将canvas生成图片
      canvas: this.data.canvas,
      x: 0,
      y: 0,
      width: 380,
      height: 562,
      destWidth: 380 * 2,     //截取canvas的宽度
      destHeight: 562 * 2,   //截取canvas的高度
      success: function (res) {
        console.log('生成图片成功1：', res)
        that.setData({
          imagePath:res.tempFilePath,
          show_bottom_info:true,
        })
        wx.hideLoading();
      },
    }, this)
  },
  savePoster2() {
    var that = this;
    console.log('保存canvasId', this.data.canvas2._canvasId)
    wx.canvasToTempFilePath({     //将canvas生成图片
      canvas: this.data.canvas2,
      x: 0,
      y: 0,
      width: 380,
      height: 562,
      destWidth: 380 * 2,     //截取canvas的宽度
      destHeight: 562 * 2,   //截取canvas的高度
      success: function (res) {
        console.log('生成图片成功2：', res)
        that.setData({
          imagePath2:res.tempFilePath,
          show_bottom_info:true,
        })
        wx.hideLoading();
      },
    }, this)
  },
  savePoster3() {
    var that = this;
    console.log('保存canvasId', this.data.canvas3._canvasId)
    wx.canvasToTempFilePath({     //将canvas生成图片
      canvas: this.data.canvas3,
      x: 0,
      y: 0,
      width: 380,
      height: 562,
      destWidth: 380 * 2,     //截取canvas的宽度
      destHeight: 562 * 2,   //截取canvas的高度
      success: function (res) {
        console.log('生成图片成功3：', res)
        that.setData({
          imagePath3:res.tempFilePath,
          show_bottom_info:true,
        })
        wx.hideLoading();
      },
    }, this)
  },


    
  //关闭海报弹框
  onClickHide() {
    this.setData({
      showPosterPop: false
    })
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