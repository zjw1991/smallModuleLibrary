// components/sticky-item/index.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  relations: {
    '../sticky/index': {
      type: 'parent',
    }
  },
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    navbarHeight: app.globalData.navBarHeight, //  整个导航栏高度
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateDataChange(index) {
      setTimeout(() => {//设置定时器，等待页面加载完获取view实际高度
        const className = '.i-sticky-item';
        const query = wx.createSelectorQuery().in(this);
        const parent = this.getRelationNodes('../sticky/index')[0];
        const boxTopArr = parent.data.boxTopArr;
        const length = boxTopArr.length;
        query.select(className).boundingClientRect((res) => {
          parent.addChildHeightToArr(res.height);
        }).exec()
      }, 1000);
    }
  }
})