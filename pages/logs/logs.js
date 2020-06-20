// pages/hot/hot.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {
      username: '江上雨',
      password: '123456'
    }
  },


  setinfo: function (e) {
    // console.log(e.detail.value)
    // console.log(e.currentTarget.dataset.name)
    if (e.currentTarget.dataset.name == 'name') {
      this.setData({ 'userinfo.username': e.detail.value })
    } else {
      this.setData({ 'userinfo.password': e.detail.value })
    }
    console.log(this.data.userinfo)
  },
  dl: function () {
    // console.log(e)
    // this.setData({'userinfo.username':})
    var that = this
    wx.request({
      url: 'http://127.0.0.1/login/users',
      method: 'POST',
      data: this.data.userinfo,
      success: function (res) {
        console.log(res.data.token)
        console.log(res.data)
        console.log(res.data.id)
        wx.setStorageSync('username', that.data.userinfo.username)
        wx.setStorageSync('id', res.data.id)
        wx.setStorageSync('userdatas', res.data.userinfo)
        // console.log(app.globalData.userInfo)
        app.globalData.userInfo = res.data.userinfo
        console.log(app.globalData.userInfo)
        wx.setStorageSync('password', that.data.userinfo.password)
        wx.setStorageSync('token', res.data.token)
        wx.switchTab({
          url: '/pages/my/my',
        })
      }
    })
  },
  zc: function () {
    wx.redirectTo({
      url: '/pages/register/register',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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