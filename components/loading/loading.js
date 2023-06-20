// components/Dialog/dialog.js
Component({
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
  
  },

  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data: {
    // 弹窗显示控制
    isShow: false,
    title:'加载中...',//默认值，父级调用this.loading.data.title
  },

  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
    //展示弹框
    showLoading(val) {//传入ttile
      this.setData({
        isShow: true,
      })
      wx.showLoading({
        title: val,
      })
    },


    //隐藏弹框
    hideLoading() {
      this.setData({
        isShow: false,
      })
      wx.hideLoading();
    },

  }
})