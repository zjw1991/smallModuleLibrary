var app = getApp();

Page({
  data: {


          left:0,  // 初始化滑块位置
          scrollWidth:'60',
          activeScrollWidth:'15',//长短4:1
          secIcons:[
            {
              catalogId:'1',
              name:'111',
              imgUrl:'',
            },
            {
              catalogId:'1',
              name:'111',
              imgUrl:'',
            },
            {
              catalogId:'1',
              name:'111',
              imgUrl:'',
            },
            {
              catalogId:'1',
              name:'111',
              imgUrl:'',
            },
            {
              catalogId:'1',
              name:'111',
              imgUrl:'',
            },
            {
              catalogId:'1',
              name:'111',
              imgUrl:'',
            },
          
            
            {
              catalogId:'1',
              name:'111',
              imgUrl:'',
            },
            {
              catalogId:'1',
              name:'111',
              imgUrl:'',
            },         {
              catalogId:'1',
              name:'111',
              imgUrl:'',
            },
            {
              catalogId:'1',
              name:'111',
              imgUrl:'',
            },
            {
              catalogId:'1',
              name:'111',
              imgUrl:'',
            },         {
              catalogId:'1',
              name:'111',
              imgUrl:'',
            },
            {
              catalogId:'1',
              name:'111',
              imgUrl:'',
            },
            {
              catalogId:'1',
              name:'111',
              imgUrl:'',
            },         {
              catalogId:'1',
              name:'111',
              imgUrl:'',
            },
            {
              catalogId:'1',
              name:'111',
              imgUrl:'',
            },
            {
              catalogId:'1',
              name:'111',
              imgUrl:'',
            },         {
              catalogId:'1',
              name:'111',
              imgUrl:'',
            },
            {
              catalogId:'1',
              name:'111',
              imgUrl:'',
            },
            {
              catalogId:'1',
              name:'111',
              imgUrl:'',
            },         {
              catalogId:'1',
              name:'111',
              imgUrl:'',
            },
        
            {
              catalogId:'1',
              name:'111',
              imgUrl:'',
            },
            {
              catalogId:'1',
              name:'111',
              imgUrl:'',
            },         {
              catalogId:'1',
              name:'111',
              imgUrl:'',
            },
            {
              catalogId:'1',
              name:'111',
              imgUrl:'',
            },
            {
              catalogId:'1',
              name:'111',
              imgUrl:'',
            },         {
              catalogId:'1',
              name:'111',
              imgUrl:'',
            },
            {
              catalogId:'1',
              name:'111',
              imgUrl:'',
            },
            {
              catalogId:'1',
              name:'111',
              imgUrl:'',
            },         {
              catalogId:'1',
              name:'111',
              imgUrl:'',
            },
            {
              catalogId:'1',
              name:'111',
              imgUrl:'',
            },
            {
              catalogId:'1',
              name:'111',
              imgUrl:'',
            },         {
              catalogId:'1',
              name:'111',
              imgUrl:'',
            },  
          ],
  },
  //金刚区滑动事件
  scroll(event){
    var that = this;
    let scrollLeft = event.detail.scrollLeft;
    let scrllWidth = event.detail.scrollWidth;//菜单可滚动区域长度
    let leftScroll = `${(scrollLeft) / scrllWidth * 100}%`
    
    that.setData({
      left:leftScroll, //模拟滑块滑动 根据css设置 距离左边的百分比
    })
  },

})

