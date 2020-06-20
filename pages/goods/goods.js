// pages/goods/goods.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    goods: {},
    num: 0,
    pay: 0,
    isfavourites: false
  },

  trolley: function () {
    this.cz()
    var goodinfo = { id: this.data.id, num: this.data.num == 0 ? 1 : this.data.num }
    var uid = wx.getStorageSync('userdatas')._id
    console.log(goodinfo)
    wx: wx.request({
      url: 'http://127.0.0.1/trolley',
      data: { goodinfo, uid },
      method: "PUT",
      success: (result) => {
        console.log(result)
      },
    })
  },

  sc: function () {
    this.cz()
    var that = this
    console.log(this.data.id)
    var uid = wx.getStorageSync('userdatas')._id
    console.log(uid)
    wx.request({
      url: 'http://127.0.0.1/users/sc',
      data: { id: this.data.id, uid: uid, isfavourites: this.data.isfavourites },
      method: "PUT",
      success: function (res) {
        // console.log(res.data.userinfo[0])
        wx.setStorageSync('userdatas', res.data.userinfo[0])
        // console.log(app.globalData.userInfo)
        that.isfav()
        // 判断是否收藏商品
      }
    })
  },
  cz: function () {
    var username = wx.getStorageSync('username')
    var password = wx.getStorageSync('password')
    var token = wx.getStorageSync('token')
    if (token == '' && username == '' && password == '') {
      wx.redirectTo({
        url: '/pages/logs/logs',
      })
    } else {
      console.log('已登录')
    }
  },

  numde: function () {
    if (this.data.num >= 1) {
      var newnum = this.data.num - 1
      var newpay = newnum * this.data.goods.goods_price
      this.setData({ num: newnum, pay: newpay })
    }
  },
  numup: function () {
    console.log(this.data.goods.goods_number)
    if (this.data.num < this.data.goods.goods_number) {
      var newnum = this.data.num + 1
      var newpay = newnum * this.data.goods.goods_price
      this.setData({ num: newnum, pay: newpay })
    }
  },
  inpnum: function (e) {
    if (e.detail.value.trim() == '') {
      this.setData({ num: 0, pay: 0 })
    }
    if (e.detail.value.length >= 2 && e.detail.value * 0.1 < 1) {
      console.log(e.detail.value * 0.1)
      e.detail.value = (e.detail.value * 0.1) * 10
      var newpay = e.detail.value * this.data.goods.goods_price
      this.setData({ num: e.detail.value, pay: newpay })
    }

    console.log(e.detail.value)
    var newpay = e.detail.value * this.data.goods.goods_price
    this.setData({ num: e.detail.value, pay: newpay })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id)
    console.log(app.globalData.userInfo)
    // wx.setStorageSync('userdatas', res.data.userinfo)
    console.log(wx.getStorageSync('userdatas'))
    this.setData({ id: options.id })
    var that = this
    wx.request({
      url: 'http://127.0.0.1/goods',
      data: options,
      success: function (res) {
        // console.log(options.id)
        // console.log(res.data)
        that.setData({ goods: res.data[0] })
        console.log(that.data.goods)
      }
    })
    this.isfav()
    // 判断是否收藏商品
  },
  // 判断是否收藏商品
  isfav: function () {

    // console.log()
    if (wx.getStorageSync('userdatas').favorites.length === 0) {
      this.setData({ isfavourites: false })
      return 0
    }
    var fav = wx.getStorageSync('userdatas').favorites
    console.log(fav)
    var that1 = this
    that1.setData({ isfavourites: false })
    fav.forEach(item => {
      if (item === that1.data.id) {
        that1.setData({ isfavourites: true })
        console.log(that1.data.isfavourites)
        return
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})