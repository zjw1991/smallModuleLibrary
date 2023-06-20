var app = getApp()

Component({
  properties: {
    navbarData: { // navbarData 由父页面传递的数据
      type: Object,
      value: {},
      observer: function (newVal, oldVal) { }//监听和响应任何属性和数据字段的变化
    }
  },

  data: {
    statusBarHeight: app.globalData.systeminfo.statusBarHeight, // 状态栏高度
    // navbarHeight: app.globalData.headerBtnPosi.bottom + app.globalData.btnPosi.bottom, // 胶囊底部+
    navbarHeight: app.globalData.navBarHeight, //  整个导航栏高度
    navbarBtn: app.globalData.btnPosi,//胶囊信息
  },
  

  attached: function () {

  },


  methods: {
    _goBack: function () {
      wx.navigateBack({
        delta: 1
      });
    },
    _goHome: function () {
      // wx.switchTab({
      //   url: '/pages/index/index',
      // });

      wx.switchTab({
        url:"/pages/index/index",
        success(){
            let page=getCurrentPages().pop();
            if(page==undefined || page==null){
                return;
            }
            // page.getEmpowerInfoByOpenId();//到首页并执行指定方法
          }
        })
    }
  }

  
})