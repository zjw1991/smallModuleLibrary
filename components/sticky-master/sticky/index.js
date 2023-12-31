// components/sticky/index.js
var app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  options: {},
  relations: {
    '../sticky-item/index': {
      type: 'child',
      linked() {
        this._updateDataChange();
      },
      linkChanged() {
        this._updateDataChange();
      },
      unlinked() {
        this._updateDataChange();
      }
    }
  },
  properties: {
    scrollTop: {
      type: Number,
      observer(val) {
        this._updateScrollTopChange(val);
      }
    },
    tabList: Array,
    sync: { // sticky-item中是否会存在容器高度改变的情况
      type: Boolean,
      value: false
    },
    init: { // 重新计算sticky-item中的容器高度的
      type: Boolean,
      value: false,
      observer(val) {
        if (this.data.sync) {
          this._updateDataChange();
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    top: 0, // 距离顶部的距离
    timer: null,
    currentTab: 0,
    boxTopArr: [], // 存放子组件高度的数组
    scrollLock: false, // 点击tab时对滚动加锁
    offset: 0, // 偏移量
    navbarHeight: app.globalData.navBarHeight, //  整个导航栏高度
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击tab
    onTabsChange({
      detail
    }) {
      let _this = this;
      this.setData({
        currentTab: detail.key,
      })
      this.data.scrollLock = true;
      let boxTopArr = this.data.boxTopArr;
      wx.pageScrollTo({
        scrollTop: boxTopArr[detail.key] + 1 - 40,////此处控制滚动距离
        duration: 400,
        complete() {
          // todo 此处代码有时不生效
          _this.data.scrollLock = false;
        },
      })
      // _this.data.scrollLock = false;
    },
    addChildHeightToArr(item) {
      const boxTopArr = this.data.boxTopArr;
      if (!boxTopArr.length) boxTopArr.push(this.data.top);
    
      const top = boxTopArr[boxTopArr.length - 1] + item + this.data.offset;
      boxTopArr.push(top);
      this.data.boxTopArr = boxTopArr;
    },
    // 监听到页面滚动
    _updateScrollTopChange(scrollTop) {
      if (this.data.scrollLock) return;

      console.log('scrollTop', scrollTop)
      console.log('boxTopArr', this.data.boxTopArr)
      let boxTopArr = this.data.boxTopArr;
      let currentTab = this.data.currentTab;
      for (let i = 1; i < boxTopArr.length; i++) {
        if (scrollTop < boxTopArr[i] - 40) {//同步上面修改，控制tab切换样式
          this.setData({
            currentTab: i - 1
          })
          return
        }
      }


    },
    _updateDataChange() {
      // 此处设置计时器的目的是可以让所有的linked均执行完毕之后再执行下面逻辑
      clearTimeout(this.data.timer);
      const items = this.getRelationNodes('../sticky-item/index');
      const timer = setTimeout(() => {
        this.data.boxTopArr = [];
        const query = wx.createSelectorQuery().in(this);
        query.select('.i-sticky').boundingClientRect((res) => {
          const top = res.top;
          if (top > 0) {
            // 此处是为了避免当sticky中的tabs处于吸顶效果时，res.top为0会影响高度计算的问题
            this.data.top = top;
          } else {
            // 当处于吸顶效果时，为了避免所有的top计算有偏差，需要通过offset进行修订
            this.data.offset = Math.abs(top) + this.data.top;
          }
          items.forEach((item, index) => {
            item.updateDataChange(index);
          })
        }).exec()
      }, 0)
      this.data.timer = timer;
    }
  }
})