var wxCharts = require('../../../utils/wxcharts.js');
var app = getApp();
var columnChart = null;
var chartData = {
    main: {
        title: '总成交量',
        data: [15, 20, 45, 37],
        categories: ['2012', '2013', '2014', '2015']
    },
    sub: [{
        title: '2012年度成交量',
        data: [70, 40, 65, 100, 34, 18],
        categories: ['1', '2', '3', '4', '5', '6']
    }, {
        title: '2013年度成交量',
        data: [55, 30, 45, 36, 56, 13],
        categories: ['1', '2', '3', '4', '5', '6']
    }, {
        title: '2014年度成交量',
        data: [76, 45, 32, 74, 54, 35],
        categories: ['1', '2', '3', '4', '5', '6']                
    }, {
        title: '2015年度成交量',
        data: [76, 54, 23, 12, 45, 65],
        categories: ['1', '2', '3', '4', '5', '6']
    }]
};
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
      
        chartTitle: '总成交量',
        isMainChartDisplay: true
    },
    backToMainChart: function () {
        this.setData({
            chartTitle: chartData.main.title,
            isMainChartDisplay: true
        });
        columnChart.updateData({
            categories: chartData.main.categories,
            series: [{
                name: '成交量',
                data: chartData.main.data,
                format: function (val, name) {
                    return val.toFixed(2) + '万';
                }
            }]
        });
    },
    touchHandler: function (e) {
        var index = columnChart.getCurrentDataIndex(e);
        if (index > -1 && index < chartData.sub.length && this.data.isMainChartDisplay) {
            this.setData({
                chartTitle: chartData.sub[index].title,
                isMainChartDisplay: false
            });
            columnChart.updateData({
                categories: chartData.sub[index].categories,
                series: [{
                    name: '成交量',
                    data: chartData.sub[index].data,
                    format: function (val, name) {
                        return val.toFixed(2) + '万';
                    }
                }]
            });

        }
    },
    onReady: function (e) {
        var windowWidth = 320;
        try {
          var res = wx.getSystemInfoSync();
          windowWidth = res.windowWidth;
        } catch (e) {
          console.error('getSystemInfoSync failed!');
        }

        columnChart = new wxCharts({
            canvasId: 'columnCanvas',
            type: 'column',
            animation: true,
            categories: chartData.main.categories,
            series: [{
                name: '成交量',
                data: chartData.main.data,
                format: function (val, name) {
                    return val.toFixed(2) + '万';
                }
            }],
            yAxis: {
                format: function (val) {
                    return val + '万';
                },
                title: 'hello',
                min: 0
            },
            xAxis: {
                disableGrid: false,
                type: 'calibration'
            },
            extra: {
                column: {
                    width: 15
                }
            },
            width: windowWidth,
            height: 200,
        });
    }
});