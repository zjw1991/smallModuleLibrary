// components/mask/mask.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    show_mask:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideMask: function () {
      this.setData({
        show_mask: false
      })
    },
    showMask() {
      var str = this.data.content;
      this.setData({
        show_mask: true
      })
    },
  }
})
