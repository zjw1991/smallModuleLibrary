var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
     
  },

  /**
   * 打开地图
   */
  toMapFn:function(){
    wx.openLocation({
      name: '薪太软',//位置名
      address: '梅园路77号上海人才大厦25楼',//地址的详细说明
      longitude: Number(121.460207),//必须为number类型
      latitude: Number(31.242116),
      scale: 18
    })
    
  },

})
