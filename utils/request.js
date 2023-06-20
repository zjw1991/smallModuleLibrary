const app = getApp()

const request = (url, options) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: app.globalData.URL + url,
            method: options.method,
            data: options.data,
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              ["sprit-program-core-" + wx.getStorageSync("id") + "-token"]: wx.getStorageSync("token")
            },
            timeout: 10000,
            success(request) {
                if (request.statusCode === 200) {
                    resolve(request.data)
                } 
                else if (request.statusCode === 401) {
                    wx.showToast({
                      title: '登陆失败，登陆失败，请重新登录',//返回错误信息
                      icon: 'none',
                      duration: 2000
                    })
                    // wx.navigateTo({
                    //     url: '/pages/login/login'
                    // })
                    reject(request.data)
                } 
                else if (request.statusCode === 500) {
                    wx.showToast({
                      title: '系统错误',//返回错误信息
                      icon: 'none',
                      duration: 2000
                    })
                    reject(request.data)
                } 
                else {
                    reject(request.data)
                }
            },
            fail(error) {
                wx.showToast({
                  title: '系统错误',//返回错误信息
                  icon: 'none',
                  duration: 2000
                })
                reject(error.data)
            },
            complete: function (res) {
              
            }
        })
    })
}

// 把需要Loading的方法进行封装，减少不必要代码
const requestWithLoading = (url, options, showLoading) => {
    return new Promise((resolve, reject) => {
        console.log(showLoading);
        if(showLoading == true){
          wx.showLoading({  // 显示加载中loading效果 
            title: "加载中",
            mask: true  //开启蒙版遮罩
          });
        }
        wx.request({
            url: app.globalData.URL + url,
            method: options.method,
            data: options.data,
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
                ["sprit-program-core-" + wx.getStorageSync("id") + "-token"]: wx.getStorageSync("token")
              },
            timeout: 10000,
            success(request) {
                if (request.statusCode === 200) {
                    resolve(request.data)
                } else if (request.statusCode === 401) {
                    wx.showToast({
                        title: '登陆失败，请重新登录',//返回错误信息
                        icon: 'none',
                        duration: 2000
                    })
                    // wx.navigateTo({
                    //     url: '/pages/login/login'
                    // })
                    reject(request.data)
                } else if (request.statusCode === 500) {
                  wx.showToast({
                    title: '系统错误',//返回错误信息
                    icon: 'none',
                    duration: 2000
                  })
                    reject(request.data)
                } else {
                    reject(request.data)
                }
            },
            fail(error) {
              wx.showToast({
                title: '系统错误',//返回错误信息
                icon: 'none',
                duration: 2000
              })
                reject(error.data)
            },
            complete: function (res) {
                wx.hideLoading()
            }
        })
    })
}

const get = (url, options = {}) => {
    return request(url, {
        method: 'GET',
        data: options
    })
}

const getWithLoading = (url, options = {}) => {
    return requestWithLoading(url, {
        method: 'GET',
        data: options
    })
}

const post = (url, options) => {
    return request(url, {
        method: 'POST',
        data: options
    })
}

const postWithLoading = (url, options,showLoading) => {
    return requestWithLoading(url, {
        method: 'POST',
        data: options
    },showLoading)
}

const put = (url, options) => {
    return request(url, {
        method: 'PUT',
        data: options
    })
}

const putWithLoading = (url, options) => {
    return requestWithLoading(url, {
        method: 'PUT',
        data: options
    })
}
// 不能声明DELETE（关键字）
const remove = (url, options) => {
    return request(url, {
        method: 'DELETE',
        data: options
    })
}

const removeWithLoading = (url, options) => {
    return requestWithLoading(url, {
        method: 'DELETE',
        data: options
    })
}

//函数节流（防止重复请求）
const throttle = (fn, gapTime) => {
    if (gapTime == null || gapTime == undefined) {
      gapTime = 1500
    }
    let _lastTime = null
    // 返回新的函数
    return function () {
      let _nowTime = + new Date()
      if (_nowTime - _lastTime > gapTime || !_lastTime) {
        fn.apply(this, arguments)   //将this和参数传给原函数
        _lastTime = _nowTime
      }
    }
  }

module.exports = {
    get,
    getWithLoading,
    post,
    postWithLoading,
    put,
    putWithLoading,
    remove,
    removeWithLoading,
    throttle,
}