var util = require('../../../utils/util.js')
var formatLocation = util.formatLocation
var curDate = util.curDate
var app = getApp()
var list = []


Page({
  data: {
    isfocus: false,
    totoalPrice: '',
    stamptax: '',
    rentIncome: '',
    propertyFee: '',
    growthRate: '',
    inidata: {}
  },
  handleInput(e) {
    let obj = {};
    obj[e.target.dataset.key] = e.detail.value;
    this.setData(obj); //频繁的使用setData() 会有问题，建议分情况使用
    console.log(obj);
  },
  onLoad: function (params) {
    
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    list = wx.getStorageSync('cashflow') || []
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏
  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
  },
  // onShareAppMessage: function () {
  //   // 用户点击右上角分享
  //   return {
  //     title: 'title', // 分享标题
  //     desc: 'desc', // 分享描述
  //     path: 'path' // 分享路径
  //   }
  // },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var result = Number(e.detail.value.totoalPrice) + Number(e.detail.value.stamptax) + Number(e.detail.value.rentIncome) + Number(e.detail.value.propertyFee) + Number(e.detail.value.growthRate)
    console.log(result);
    wx.navigateTo({
      url: '/pages/index/index', // 回退前 delta(默认为1) 页面
      success: function (res) {
        // success
        console.log('goback success')
      },
      fail: function () {
        // fail
        console.log('goback fail')
      },
      complete: function () {
        // complete
      }
    })
  },
  formReset: function (e) {
    console.log('form发生了reset事件，携带数据为：', e.data)
    if (this.data.act === 'new') {
      var curdate = curDate(new Date())
      this.setData({
        act: 'new',
        date: curdate[0],
        time: curdate[1]
      })
    } else {
      var billinfo = this.data.inidata
      this.setData({
        act: 'edit',
        numberindex: billinfo.member - 1,
        subtitle: billinfo.subtitle,
        comment: billinfo.comment,
        cost: billinfo.cost,
        date: billinfo.date,
        time: billinfo.time,
        hasLocation: billinfo.hasLocation || false,
        location: billinfo.location
      })
    }
  }

})