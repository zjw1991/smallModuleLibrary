// pages/testQ/index.js
var app = getApp();
var utils = require('../../utils/activity_util');
var openid = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //胶囊组件参数设置
    navbarData: {
      navbarBack: 1,//返回按钮1显示0不显示
      navbarLine: 1,//竖线
      navbarHome: 1,//首页按钮1显示0不显示
      showCapsule: 0, // 胶囊1显示0不显示
      title: '首页', // 导航栏 中间的标题
      textColor: '#fff', // 标题颜色
      bgColor: '#3281ff', // 导航栏背景颜色
      btnBgColor: '#2B6ED9', // 胶囊按钮背景颜色
      iconColor: 'white', // icon颜色 black/white
      borderColor: 'rgba(255, 255, 255, 0.3)' // 边框颜色 格式为 rgba()，透明度为0.3
    },


    //底部自定义tabbar
    toBottomHeight: app.globalData.tabbarBottom,//距底部距离


    activeIndex: 0,
    icon1: {
      normal: '../../images/home-unchecked.png',//未选中图标
      active: '../../images/home.png',//选中图标
    },
    icon2: {
      normal: '../../images/mine-unchecked.png',//未选中图标
      active: '../../images/mine.png',//选中图标
    },

    //列表
    componentsList: [
      {
        title: "测试页面",
        num: '',
        children: [
          {
            url: "/pages/testpage/testpage",
            name: "测试页面",
            show: true,
          },
          {
            url: "/pages/iframePage/iframePage",
            name: "iframe页面",
            show: true,
          },
        ]
      },

      {
        title: "信息授权",
        num: '',
        children: [
          {
            url: "",
            name: "",
            show: true,
          },

          {
            url: "/pages/getUserInfo/getUserInfo",
            name: "点击获取用户信息(含手机号)",
            show: true,
          },
          {
            url: "/pages/getLocation/getLocation",
            name: "获取地理位置",
            show: true,
          },
          {
            url: "/pages/qrcodePage/qrcodePage",
            name: "二维码生成长按保存",
            show: true,
          },
          {
            url: "/pages/dingyueMsg/dingyueMsg",
            name: "订阅通知",
            show: true,
          },
        ]
      },

      {
        title: "基础组件",
        num: '',
        children: [
          {
            url: "/pages/carousel/carousel",
            name: "轮播图",
            show: true,
          },
          {
            url: "/pages/carouselAuto/carouselAuto",
            name: "轮播图-高度适应",
            show: true,
          },

          {
            url: "/pages/pickerDateYmd/pickerDateYmd",
            name: "选择器-年月日",
            show: true,
          },
          {
            url: "/pages/picker/picker",
            name: "选择器-年月日时分",
            show: true,
          },
          {
            url: "/pages/sectionPicker/sectionPicker",
            name: "选择器-年月日起止",
            show: true,
          },
          {
            url: "/pages/calendar1/calendar1",
            name: "日历-左右滑动",
            show: true,
          },
          {
            url: "/pages/requestPage/requestPage",
            name: "接口ajax请求",
            show: true,
          },

          {
            url: "/pages/loadingPage/loadingPage",
            name: "loading(按需引入)",
            show: true,
          },

          {
            url: "/pages/dialog/dialog",
            name: "对话框",
            show: true,
          },
          {
            url: "/pages/textarea/textarea",
            name: "textarea输入框",
            show: true,
          },

          {
            url: "/pages/video/video",
            name: "视频video",
            show: true,
          },
          {
            url: "/pages/morechangetab/morechangetab",
            name: "多选菜单tab",
            show: true,
          },
          {
            url: "/pages/tableLeft/tableLeft",
            name: "talbe左侧固定",
            show: true,
          },

        ],
      },


      {
        title: "业务模块",
        num: '',
        children: [
          {
            url: "/pages/navFixed/navFixed",
            name: "黏性导航条（原生）",
            show: true,
          },
          {
            url: "/pages/navFixedVant/navFixedVant",
            name: "黏性导航条（van组件）",
            show: true,
          },
          {
            url: "/pages/tabPoint/tabPoint",
            name: "tab锚点定位",
            show: true,
          },
          {
            url: "/pages/sticky-page/sticky-page",
            name: "黏性锚点定位导航",
            show: true,
          },
          {
            url: "/pages/touchMenu/touchMenu",
            name: "宫格菜单滑动切换",
            show: true,
          },
          {
            url: "/pages/scrollMenu/scrollMenu",
            name: "滑动菜单指示条",
            show: true,
          },
          {
            url: "/pages/verifyPop/verifyPop",
            name: "密码输入框",
            show: true,
          },
          {
            url: "/pages/topNav/topNav",
            name: "top导航条",
            show: true,
          },
          {
            url: "/pages/fixedBtn/fixedBtn",
            name: "悬浮home按钮",
            show: true,
          },
          {
            url: "/pages/tencentVer/tencentVer",
            name: "腾讯行为验证",
            show: true,
          },
          {
            url: "/pages/marquee/marquee",
            name: "跑马灯",
            show: true,
          },
          {
            url: "/pages/selectCity/selectCity",
            name: "城市选择列表",
            show: true,
          },
          {
            url: "/pages/jumpSystemApp/jumpSystemApp",
            name: "跳转系统地图",
            show: true,
          },
          {
            url: "/pages/capsuleCustom/capsuleCustom",
            name: "胶囊-增加回到首页",
            show: true,
          },
          {
            url: "/pages/navbarCustom/navbarCustom",
            name: "胶囊-标题文字无按钮",
            show: true,
          },

          {
            url: "/pages/navbarCustom2/navbarCustom2",
            name: "胶囊-图片顶上",
            show: true,
          },
          {
            url: "/pages/toShare/toShare",
            name: "分享",
            show: true,
          },
          {
            url: "/pages/posterShare/posterShare",
            name: "分享保存海报",
            show: true,
          },
          {
            url: "/pages/wxparsePage/wxparsePage",
            name: "富文本解析",
            show: true,
          },
          {
            url: "/pages/poster/poster",
            name: "海报生成",
            show: true,
          },

          {
            url: "/pages/photograph/index",
            name: "拍照识别",
            show: true,
          },
          {
            url: "/pages/uploadImage/uploadImage",
            name: "图片上传",
            show: true,
          },
          {
            url: "/pages/uploadImageWithPopUp/uploadImageWithPopUp",
            name: "图片上传(底部弹出层)",
            show: true,
          },
          {
            url: "/pages/dragButton/dragButton",
            name: "可拖动悬浮按钮",
            show: true,
          },
          {
            url: "/pages/dragButton2/dragButton2",
            name: "可拖动悬浮按钮自动吸附",
            show: true,
          },
          {
            url: "/pages/workCard/workCard",
            name: "务工卡",
            show: true,
          },
        ]
      },
      {
        title: "wxCharts图表",
        num: '',
        children: [
          {
            url: "/pages/wxCharts/line/line",
            name: "曲线图",
            show: true,
          },
          {
            url: "/pages/wxCharts/scrollLine/scrollLine",
            name: "可滑动曲线图",
            show: true,
          },
          {
            url: "/pages/wxCharts/column/column",
            name: "柱状图",
            show: true,
          },
          {
            url: "/pages/wxCharts/pie/pie",
            name: "扇形图",
            show: true,
          },
          {
            url: "/pages/wxCharts/ring/ring",
            name: "环形图",
            show: true,
          },
          {
            url: "/pages/wxCharts/area/area",
            name: "曲线区域",
            show: true,
          },
          {
            url: "/pages/wxCharts/radar/radar",
            name: "雷达图",
            show: true,
          },

        ]
      },
      {
        title: "营销组件",
        num: '',
        children: [
          {
            url: "/pages/marketingMode/bigWheel/bigWheel",
            name: "大转盘",
            show: true,
          },
          {
            url: "/pages/marketingMode/packetRain/packetRain",
            name: "红包雨",
            show: true,
          },
          {
            url: "/pages/marketingMode/gridCard/gridCard",
            name: "九宫格翻牌",
            show: true,
          },
          {
            url: "/pages/marketingMode/slotMachine/slotMachine",
            name: "老虎机",
            show: true,
          },
          {
            url: "/pages/marketingMode/luckDraw/luckDraw",
            name: "刮刮乐",
            show: true,
          },
        ]
      },
    ],

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getNum();//列表数量统计

    //调用appjs中获取openid方法,onload和onshow均可调用
    app.getOpenid().then(function (res) {
      if (res.status == 200) {
        that.setData({
          openid: wx.getStorageSync('openid'),
          ["componentsList[1].children[0].name"]: 'openid：' + wx.getStorageSync('openid'),//写入对象指定元素值
        })
      } else {
        console.log(res.data);
      }
    })
  },


  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    var that = this;


    //遮罩组件使用
    this.selectComponent("#showMask").showMask();
    setTimeout(() => {
      this.selectComponent("#showMask").hideMask();
    }, 1000);


  },


  /**
   * tabbar切换
   * @param {*} event 
   */
  onChange(event) {
    this.setData({ active: event.detail });
    console.log(event.detail);
    switch (event.detail) {
      case 0:
        wx.switchTab({
          url: "/pages/index/index"
        })
        break;
      case 1:
        wx.switchTab({
          url: "/pages/person/person"
        })
        break;
      default:
        wx.switchTab({
          url: "/pages/index/index"
        })
    }
  },

  /**
   * 统计数量
   */
  getNum: function () {
    for (var i = 0; i < this.data.componentsList.length; i++) {
      console.log(this.data.componentsList[i].children.length);
      this.data.componentsList[i].num = this.data.componentsList[i].children.length;
    }
    this.setData({//必须重新再赋值
      componentsList: this.data.componentsList,
    })
  },


})