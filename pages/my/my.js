// pages/my/my.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: '',
    username: '',
  },
  gotofav: function () {
    wx.navigateTo({
      url: '/pages/favorites/favorites',
    })
    // wx.redirectTo({
    //   url: '/pages/favorites/favorites',
    // })
  },
  gototrolley: function () {
    wx.navigateTo({
      url: '/pages/trolley/trolley',
    })
  },
  cleartoken: function () {
    wx.clearStorageSync()
    this.checklogin()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userdatas = wx.getStorageSync('userdatas')
    var ava = 'http://127.0.0.1/public/avatar/avatar.png'
    if (userdatas.avatar != '') {
      this.setData({ avatar: 'http://127.0.0.1/public/avatar/' + userdatas.avatar })
    } else {
      this.setData({ avatar: ava })
    }
    this.checklogin()
  },
  checklogin: function () {
    var username = wx.getStorageSync('username')
    var password = wx.getStorageSync('password')
    var token = wx.getStorageSync('token')
    if (token == '' && username == '' && password == '') {
      wx.redirectTo({
        url: '/pages/logs/logs',
      })
    } else {
      this.setData({ username: username })
      console.log('已登录')
    }
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