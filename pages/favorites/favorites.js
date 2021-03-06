// pages/favorites/favorites.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodslist: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.stopPullDownRefresh()
    var that = this
    console.log(wx.getStorageSync('userdatas').favorites)
    if (wx.getStorageSync('userdatas').favorites.length === 0) {
      console.log('购物车空空如也！')
      return
    }
    var ids = wx.getStorageSync('userdatas').favorites
    console.log(ids)
    var bs = []
    ids.forEach(items => {
      var item = { _id: items }
      bs.push(item)
    });
    console.log(bs)
    wx.request({
      url: 'http://127.0.0.1/favorites',
      method: 'POST',
      data: { id: bs },
      success: function (res) {
        console.log(res.data)
        that.setData({ goodslist: res.data })
      }
    })
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
    // wx.switchTab({
    //   url: '/pages/my/my',
    // })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      goodslist: {},
    })
    this.onLoad()
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