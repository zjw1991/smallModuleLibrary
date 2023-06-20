// component/calendar/calendar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    calendarWeek: ["一", "二", "三", "四", "五", "六", "日"],
    currentTime: "",
    nowYear: "",
    nowMonth: "",
    swiperHeight:"",
    calendarPageIndex: 1
  },
  lifetimes: {
    attached: function () {
      this.setData({
        currentTime: `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`,
        nowYear: new Date().getFullYear(),
        nowMonth: new Date().getMonth() + 1 >9 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1)
      })
      this.getMonthDate()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    setSwiperHeight(){
      const query = wx.createSelectorQuery().in(this)
      // swiper高度
      query.select('.day-box').boundingClientRect((res)=>{
        this.setData({
          swiperHeight: res.height
        })
      }).exec()
    },
    changeSwiper(e){
      let index =  this.data.calendarPageIndex
      const diff = e.detail.current - index
      
      if(diff == 1 || diff == -2){// 向右边滑动，显示swiper左边内容
        this.nextMonth()
      }else if(diff == -1 || diff ==2){// 向左边滑动 显示swiper右边内容
        this.prevMonth()
      }
      
    },
    transitionStop(e){
      this.setData({
        calendarPageIndex: e.detail.current
      })
      this.setSwiperHeight()
    },
    prevMonth(){
      const index = this.data.calendarPageIndex
      let pre = index == 0 ? 2 : index - 1
      this.setData({
        calendarPageIndex: pre
      })
      let year = new Date(this.data.currentTime).getFullYear()
      let month =  new Date(this.data.currentTime).getMonth() - 1
      if (month < 0) {
        month = 11
        year--
      }
      this.initDate(new Date(year, month, 1))
      this.getMonthDate()
    },
    nextMonth(){
      const index = this.data.calendarPageIndex
      let next = index == 2 ? 0: index + 1
      this.setData({
        calendarPageIndex: next
      })
      let year = new Date(this.data.currentTime).getFullYear()
      let month = new Date(this.data.currentTime).getMonth() + 1
      if (month > 11) {
        month = 0
        year++
      }
      this.initDate(new Date(year,month,1))
      this.getMonthDate()
    },
    initDate(date = new Date()) {
      const year = date.getFullYear()
      const month = date.getMonth() <9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
      const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
      const currentDate = year + "/" + month + "/" +  day
      this.setData({
        currentTime: currentDate,
        nowYear: year,
        nowMonth: month
      })
      
    },
    getMonthDate() {
      let showMonthList = this.getShowMonthList()
      console.log("showMonthList", showMonthList)
      const calendarAllList = []
      showMonthList.forEach(item => {
        calendarAllList.push(this.getAllMonthDay(item))
      })
      let allList = []
      const index = this.data.calendarPageIndex
      if(index == 1){
        allList = [calendarAllList[0],calendarAllList[1],calendarAllList[2]]
      }else if(index == 2){
        allList = [calendarAllList[2],calendarAllList[0],calendarAllList[1]]
      }else if(index == 0){
        allList = [calendarAllList[1],calendarAllList[2],calendarAllList[0]]
      }
      this.setData({
        calendarAllList: allList
      })
      this.setSwiperHeight()
      console.log("calendarAllList", this.data.calendarAllList)
    },
    getAllMonthDay(time) {
      const timeArr = time.split("-")

      let dayLenth = new Date(timeArr[0], timeArr[1], 0).getDate()
      let dayList = []
      for (let i = 0; i < dayLenth; i++) {
        dayList.push({
          day: i + 1,
          timestamp: new Date(`${timeArr[0]}-${Number(timeArr[1])}-${i+1}`).getTime(),
          week: new Date(`${timeArr[0]}-${Number(timeArr[1])}-${i+1}`).getDay()
        })
      }
     

      for (let j = 0; j < 7; j++) {
        if (dayList[0].week != 1) {  // 补全月首日期
          let month = Number(timeArr[1]) - 1 == 0 ? 12 : Number(timeArr[1]) - 1
          let year = Number(timeArr[1]) - 1 == 0 ? Number(timeArr[0]) - 1 : timeArr[0]
          const lastMonthDay = new Date(timeArr[0], Number(timeArr[1])-1, 0).getDate()
          const day = {
            day: lastMonthDay - j,
            timestamp: new Date(`${year}-${month}-${lastMonthDay - j}`).getDay(),
            week: new Date(`${year}-${month}-${lastMonthDay - j}`).getDay(),
            isLastMon: true
          }
          dayList.unshift(day)
        }
        if (dayList[dayList.length - 1].week != 0) { // 补全末位 下月日期
          let month = Number(timeArr[1]) + 1 > 12 ? 1:Number(timeArr[1]) + 1
          let year = Number(timeArr[1]) + 1 > 12? Number(timeArr[0]) + 1 : timeArr[0]
          const day = {
            day: j + 1,
            timestamp: new Date(`${year}-${month}-${j + 1}`).getTime(),
            week: new Date(`${year}-${month}-${j + 1}`).getDay(),
            isNextMon: true
          }
          dayList.push(day)
        }
      }
      
      return {
        month: `${timeArr[0]}-${Number(timeArr[1])}`,
        list: dayList
      }
    },
    getShowMonthList() {
      const timeArr = this.data.currentTime.split("/")
      let searchMonthList = [`${timeArr[0]}-${timeArr[1]}`]

      if (Number(timeArr[1]) > 1 && Number(timeArr[1]) < 12) {
        const preMonth = Number(timeArr[1]) - 1 < 10 ? `0${Number(timeArr[1]) - 1}` : Number(timeArr[1]) - 1
        const nextMonth = Number(timeArr[1]) + 1 < 10 ? `0${Number(timeArr[1]) + 1}` : Number(timeArr[1]) + 1
        searchMonthList = [`${timeArr[0]}-${preMonth}`, searchMonthList[0], `${timeArr[0]}-${nextMonth}`]
      } 
      else if (Number(timeArr[1]) == 1) {
        const preYear = Number(timeArr[0]) - 1
        searchMonthList = [`${preYear}-12`, searchMonthList[0], `${timeArr[0]}-02`]
      } 
      else if (Number(timeArr[1]) == 12) {
        const nextYear = Number(timeArr[0]) + 1
        searchMonthList = [`${timeArr[0]}-11`, searchMonthList[0], `${nextYear}-01`]
      }
      return searchMonthList
    }
  }
})