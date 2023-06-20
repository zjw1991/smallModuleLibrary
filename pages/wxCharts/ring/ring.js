var wxCharts = require('../../../utils/wxcharts.js');
var app = getApp();
var ringChart = null;
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
        console.log(ringChart.getCurrentDataIndex(e));
    },
    updateData: function () {
        ringChart.updateData({
            title: {
                name: '80%'
            },
            subtitle: {
                color: '#ff0000'
            }
        });
    },     
    onReady: function (e) {
        var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }

        ringChart = new wxCharts({
            animation: true,
            canvasId: 'ringCanvas',
            type: 'ring',
            extra: {
                ringWidth: 25,
                pie: {
                    offsetAngle: -45
                }
            },
            title: {
                name: '70%',
                color: '#7cb5ec',
                fontSize: 25
            },
            subtitle: {
                name: '收益率',
                color: '#666666',
                fontSize: 15
            },
            series: [{
                name: '成交量1',
                data: 15,
                stroke: false
            }, {
                name: '成交量2',
                data: 35,
                 stroke: false
            }, {
                name: '成交量3',
                data: 78,
                stroke: false
            }, {
                name: '成交量4',
                data: 63,
                 stroke: false
            }],
            disablePieStroke: true,
            width: windowWidth,
            height: 200,
            dataLabel: false,
            legend: false,
            background: '#f5f5f5',
            padding: 0
        });
        ringChart.addEventListener('renderComplete', () => {
            console.log('renderComplete');
        });
        setTimeout(() => {
            ringChart.stopAnimation();
        }, 500);
    }
});