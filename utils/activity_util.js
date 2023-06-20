/**
 * 用于判断空，Undefined String Array Object Number boolean
 */
const isNull =(str) =>{
  if (Object.prototype.toString.call(str) === '[object Undefined]') { //空
    return true
  } else if (
    Object.prototype.toString.call(str) === '[object String]' ||
    Object.prototype.toString.call(str) === '[object Array]') { //字条串或数组
    return str.length == 0 ? true : false
  } else if (Object.prototype.toString.call(str) === '[object Object]') {
    return JSON.stringify(str) == '{}' ? true : false
  } else if (typeof(str) == 'number') { //Number 型
    if (str) {
      return false
    } else { //数字0 不算空
      if (str == 0) {
        return false
      }
      return true
    }
  } else if (typeof(str) == 'boolean') {
    if (!param) {
      return true;
    } else {
      return false;
    }
  } else {
    return true
  }
}


/**
 * 系统当前时间,timeType传入需要的类型
 * @param {*} timeType 
 */
function writeCurrentDate(timeType) {
  var now = new Date();
  var year = now.getFullYear(); //得到年份
  var month = now.getMonth();//得到月份
  var date = now.getDate();//得到日期
  var day = now.getDay();//得到周几
  var hour = now.getHours();//得到小时
  var minu = now.getMinutes();//得到分钟
  var sec = now.getSeconds();//得到秒
　var MS = now.getMilliseconds();//获取毫秒
  var week;
  month = month + 1;
  if (month < 10) month = "0" + month;
  if (date < 10) date = "0" + date;
  if (hour < 10) hour = "0" + hour;
  if (minu < 10) minu = "0" + minu;
  if (sec < 10) sec = "0" + sec;
  if (MS < 100) MS = "0" + MS;
  var arr_week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
  week = arr_week[day];
  // time = year + "年" + month + "月" + date + "日" + " " + hour + ":" + minu + ":" + sec + " " + week;
  //设置得到当前日期的函数的执行间隔时间，每1000毫秒刷新一次。
  // var timer = setTimeout("writeCurrentDate()", 1000);
  if(timeType == 'ymd'){
    return year + "-" + month + "-" + date;
  }
  if(timeType == 'hms'){
   return hour + ":" + minu + ":" + sec;
  }
}

/**
 * 会计金额格式
 * @param {*} str 
 */
const toMoney = (str) => {
  return ((Number(str).toFixed(2) + "").replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,'))
}

 /**
  * 是否是合格手机号
  */
 const parsePhone = (val) => {
  if (!(/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(val)))
    return false;
  else
    return true;
}

/**
 * 邮箱验证
 */
const parseEmail = (val) => {
  var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
  if (!val) {
    return false;
  }
  if (!reg.test(val)) {
    return false;
  } else {
    return true;
  }
  }

  /**
   * 身份证验证
   * @param {*} val 
   */
  const parseIdNumber = (val) => {
    if (!val) {
      return false;
    }
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/.test(val))) {
      return false;
    } else {
      return true;
    }
  }


  
/**
 * 转换时间
 * @param {*} year 
 * @param {*} month 
 * @param {*} day 
 * @param {*} hour 
 * @param {*} minute 
 */
const getDate = (year, month, day, hour, minute) => {
  const newyear = year.substr(0, year.length - 1);
  const setmonth = month.substr(0, month.length - 1);
  const newmonth = setmonth < 10 ? '0' + setmonth : setmonth;
  const setday = day.substr(0, day.length - 1);
  const newday = setday < 10 ? '0' + setday : setday;
  // const sethour = hour.substr(0, hour.length - 1);
  const newhour = hour < 10 ? '0' + hour : hour;
  // const setminute = minute.substr(0, minute.length - 1);
  const newminute = minute < 10 ? '0' + minute : minute;
  return newyear + '-' + newmonth + '-' + newday + ' ' + newhour + ":" + newminute;
}

const getDateYMD = (year, month, day) => {
  const newyear = year.substr(0, year.length - 1);
  const setmonth = month.substr(0, month.length - 1);
  const newmonth = setmonth < 10 ? '0' + setmonth : setmonth;
  const setday = day.substr(0, day.length - 1);
  const newday = setday < 10 ? '0' + setday : setday;
  return newyear + '-' + newmonth + '-' + newday;
}

/**
 * 将时间戳转换为时间
 * @param {*} date 
 */
//年月日时分
const getobjDate = (date)=> {
  let now;
  if (date){
     now = new Date(date)
  }else{
     now = new Date()
  }
    let y = now.getFullYear(),
    m = now.getMonth() + 1,
    d = now.getDate(),
    h = now.getHours(), //获取当前小时数(0-23)
    f = now.getMinutes(),
    n = (Math.ceil((now.getMinutes()) / 10))*10; //获取当前分钟数(0-59)  取整数
  return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + (h < 10 ? "0" + h : h) + ":" + (f < 10 ? "0" + f : f);
}
//年月日
const getobjDateYMD = (date)=> {
  let now;
  if (date){
     now = new Date(date)
  }else{
     now = new Date()
  }
    let y = now.getFullYear(),
    m = now.getMonth() + 1,
    d = now.getDate(),
    h = now.getHours(), //获取当前小时数(0-23)
    f = now.getMinutes(),
    n = (Math.ceil((now.getMinutes()) / 10))*10; //获取当前分钟数(0-59)  取整数
  return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
}


/**
 * 根据年月 获取对应天数
 * @param {*} year 
 * @param {*} month 
 */
const mGetDate = (year, month) => {
  var d = new Date(year, month, 0);
  return d.getDate();
}

/**
 * 时间str转换数组arr
 * 根据时间2019-01-02 09：12  得到 ['2019','1','2','9','12']
 * @param {*} str 
 */
//年月日时分
const getarrWithtime = (str) => {
  let arr = [];
  let arr1 = str.split(' ');
  let arr2 = (arr1[0]).split('-');
  let arr3 = arr1[1].split(':');
  arr = arr2.concat(arr3);
  arr[1] = arr[1].startsWith('0') ? arr[1].substr(1, arr[1].length) : arr[1];
  arr[2] = arr[2].startsWith('0') ? arr[2].substr(1, arr[2].length) : arr[2];
  arr[3] = arr[3].startsWith('0') ? arr[3].substr(1, arr[3].length) : arr[3];
  arr[4] = arr[4].startsWith('0') ? arr[4].substr(1, arr[4].length) : arr[4];
  return arr;
}
//年月日
const getarrWithtimeYMD = (str) => {
  let arr = [];
  let arr1 = str.split(' ');
  let arr2 = (arr1[0]).split('-');//年月日
  arr = arr2;
  arr[1] = arr[1].startsWith('0') ? arr[1].substr(1, arr[1].length) : arr[1];
  arr[2] = arr[2].startsWith('0') ? arr[2].substr(1, arr[2].length) : arr[2];
  return arr;
}


const textLimit = (text) => {
  const length = text.length
  if (length > 15) {
    var str = ''
    str = text.substring(0, 15) + '...'
    return str
  } else {
    return text
  }
}　　


  /**
   * 去掉日期后面时分秒（2018-01-08 00:00:00 --> 2018-01-08）
   */
  const interceptDate = (date) => {
    var newDate = date.substr(0,10);//截取字符串（开始位置和长度）
    return newDate;
  }

  /**
 * 隐藏手机号
 * @param {*} val 
 */
const hidePhone = (val) => {
  let phone = val.substring(0, 3) + '****' + val.substring(7);
  return phone;
}
/**
 * 隐藏身份证号
 * @param {*} val 
 */
const hideIdcard = (val) => {
  let idcard =  val.replace(/^(.{3})(?:\d+)(.{3})$/,"$1************$2");
  return idcard;
}
/**
 * 隐藏姓名
 * @param {*} val 
 */
const hideName = (val) => {
  return new Array(val.length).join('*') + val.substr(-1);
}
/**
 * 银行卡处理
 * @param {*} val 
 */
const hideBankNumber = (val) => {
  let lastFour = val.slice(-4);
  //不分割，例：***************1234
  let newArr = new Array(val.length-3).join("*")+lastFour;
  //根据银行卡实际长度分割，例如：**** **** **** ***1 234
  let bankNumSpace = newArr.replace(/\s/g,'').replace(/(.{4})/g,"$1 ");//4位一空格
  //统一格式**** **** **** **** 1234
  let normalBank = "****" + " " + "****" + " " + "****" + " " + "****" + " " + lastFour;
  return normalBank;
}

module.exports = {
  getDate,
  getDateYMD,
  getobjDate,
  getobjDateYMD,
  mGetDate,
  getarrWithtime,
  getarrWithtimeYMD,
  writeCurrentDate,
  toMoney,
  parsePhone,
  parseEmail,
  parseIdNumber,
  isNull,
  textLimit,
  interceptDate,
  hidePhone,
  hideIdcard,
  hideName,
  hideBankNumber,
}
