const app = getApp()
// 这里随便初始化一个变量，记录滑块滑动的时候的 X,Y，之所以这样弄，是因为 setData 性能原因，写这里会好一些，不需要一直 setData 了
let movableTmpX = 0,
  movableTmpY = 0
Page({
  data: {
    x: 0,
    y: 0,
    viewportInfo: null, // 视口样式信息
    movableAreaInfo: null, // movableArea 样式信息
    movableViewInfo: null, // movableView 样式信息
    movableViewAnimation: false // movableView 动画是否开启
  },
  onLoad: function () {

  },
  onReady: function () {
    console.log('onReady')
    const query = wx.createSelectorQuery().in(this) // 这个 in(this) 在自定义组件内部使用相当有用，这里有没有都行
    query.selectViewport().boundingClientRect()
    query.selectAll('#movableArea,#movableView').boundingClientRect()
    query.exec(res => {
      let viewportInfo = res[0] // 这里可以获取当前屏幕视口的宽高，如果设置 movableArea 区域的话，这个相当有用，这里没用上
      let movableAreaInfo = res[1][0] // 这是获取的 movableArea 样式
      let movableViewInfo = res[1][1] // 这里获取的 movableView 样式
      let x = movableAreaInfo.width - movableViewInfo.width - 48 // 这里之所以多减了 48 ，只是作为展示动态的初始化 x,y 不让 movableView 过渡过去使用
      let y = movableAreaInfo.height - movableViewInfo.height - 48 // 这里之所以多减了 48 ，只是作为展示动态的初始化 x,y 不让 movableView 过渡过去使用
      this.setData({
        x,
        y,
        viewportInfo,
        movableAreaInfo,
        movableViewInfo
      })
      setTimeout(() => {
        this.setData({
          movableViewAnimation: true // 初始化 x y 之后把动画打开，注意：一定要和上边的设置 x y 初始值区分开，不然设置初始值的时候还是会过渡过去，这个就没意义了
        })
      })
    })
  },

  
  // 滑动滑块 记录滑块当前的 X,Y
  movableViewChangeHandler: function ({
    detail
  }) {
    let {
      x,
      y,
      source
    } = detail
    if (source === 'touch') {
      movableTmpX = x // 记录滑块当前的 X
      movableTmpY = y // 记录滑块当前的 Y
    }
  },
  // 手指滑动结束事件
  movableViewTouchEndHandler: function (e) {
    let {
      width: movableAreaWidth,
      height: movableAreaHeight
    } = this.data.movableAreaInfo
    let {
      width: movableViewWidth,
      height: movableViewHeight
    } = this.data.movableViewInfo
    let tmpX = 0,
      tmpY = movableTmpY
    // 计算当前 X 偏向于左还是右
    if (movableTmpX + movableViewWidth / 2 > movableAreaWidth / 2) { // 如果偏向于右侧，则向右靠拢
      tmpX = movableAreaWidth - movableViewWidth // 设置 X 为最右侧
    } else { // 如果偏向于左侧，则向左靠拢
      tmpX = 0 // 设置 X 为最左侧
    }
    // 第一次设置 X,Y
    this.setData({
      x: tmpX,
      y: tmpY
    })
    // 第二次设置 X,Y ，实际上这里只需要设置 Y 就行了，因为有问题的是 Y，不过这里把 X 也设置了，防止 X 也有问题
    setTimeout(() => {
      this.setData({
        x: tmpX,
        y: tmpY
      })
      // 其实这里延迟不给就行，但是为了确保可行性，还是协商了 20ms 的延迟，基本上没啥感知
    },20)
  }
})