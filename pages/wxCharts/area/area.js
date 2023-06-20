var wxCharts = require('../../../utils/wxcharts.js');
var app = getApp();
var areaChart = null;
Page({
    data: {
             //胶囊组件参数设置
             navbarData: {
              navbarBack: 1,//返回按钮1显示0不显示
              navbarLine: 1,//竖线
              navbarHome: 1,//首页按钮1显示0不显示
              showCapsule: 1, // 胶囊1显示0不显示
              title: '组件列表', // 导航栏 中间的标题
              textColor: '#fff', // 标题颜色
              bgColor: '#3281ff', // 导航栏背景颜色
              btnBgColor: '#2B6ED9', // 胶囊按钮背景颜色
              iconColor: 'white', // icon颜色 black/white
              borderColor: 'rgba(255, 255, 255, 0.3)' // 边框颜色 格式为 rgba()，透明度为0.3
            },
            
    },
    touchHandler: function (e) {
        console.log(areaChart.getCurrentDataIndex(e));
        areaChart.showToolTip(e);
    },    
    onLoad: function (e) {
        var windowWidth = 320;
        try {
          var res = wx.getSystemInfoSync();
          windowWidth = res.windowWidth;
        } catch (e) {
          console.error('getSystemInfoSync failed!');
        }
        
        areaChart = new wxCharts({
            canvasId: 'areaCanvas',
            type: 'area',
            categories: ['1', '2', '3', '4', '5', '6'],
            animation: true,
            series: [{
                name: '成交量1',
                data: [32, 45, null, 56, 33, 34],
                format: function (val) {
                    return val.toFixed(2) + '万';
                }
            }],
            yAxis: {
                title: '成交金额 (万元)',
                format: function (val) {
                    return val.toFixed(2);
                },
                min: 0,
                fontColor: '#8085e9',
                gridColor: '#8085e9',
                titleFontColor: '#f7a35c'
            },
            xAxis: {
                fontColor: '#7cb5ec',
                gridColor: '#7cb5ec'
            },
            extra: {
                legendTextColor: '#cb2431'
            },
            width: windowWidth,
            height: 200
        });
    }
});