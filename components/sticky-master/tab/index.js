Component({
  externalClasses: ['i-class', 'i-class-title', 'i-class-tab-bar'],

  relations: {
    '../tabs/index': {
      type: 'parent'
    }
  },

  properties: {
    key: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    dot: {
      type: Boolean,
      value: false
    },
    count: {
      type: Number,
      value: 0
    },
  },

  data: {
    current: false,
    currentColor: '',
    width: 0,
    scroll: false
  },

  methods: {
    changeCurrent(current) {
      this.setData({ current });
    },
    changeCurrentColor(currentColor) {
      this.setData({ currentColor });
    },
    changeScroll(scroll) {
      this.setData({ scroll });
    },
    changeWidth(width) {
      this.setData({
        width
      })
    },
    handleClickItem() {
      const parent = this.getRelationNodes('../tabs/index')[0];
      parent.emitEvent(this.data.key);
    }
  }
});