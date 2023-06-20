var app = getApp();
var utils = require('../../utils/activity_util');

Page({
  data: {
      //自定义胶囊组件参数设置
      navbarData: {
        showCapsule: 1, // 导航文字1显示0不显示
        showRightIcon:1,//是否展示右箭头1显示0不显示
        storeName:utils.textLimit('薪太软上海科技发展有限公司公司'),//控制显示位数
        nameColor: '#fff', // 文字颜色
        nameFontSize:'15',//文字大小
        bgColor: '#3281ff', // 导航栏背景颜色
      },

  },


})

