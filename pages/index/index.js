// pages/hot/hot.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryInfo: {
      query: '',
      pagenum: 1,
      pagesize: 10
    },
    goodslist: {},
    isrun: true
  },
  setquery: function (e) {
    // console.log(e.detail.value)
    this.setData({ 'queryInfo.query': e.detail.value })
    // console.log(this.data.queryInfo.query)

  },
  searchqu: function () {
    this.setData({ 'queryInfo.pagenum': 1 })
    this.getdataHandle()
  },
  getdataHandle: function () {
    // console.log(11)
    var that = this

    wx.request({
      url: 'http://127.0.0.1/goods',
      data: this.data.queryInfo,
      success: function (res) {
        // console.log(that.data.queryInfo)
        console.log(res.data.pagenum)
        console.log(res.data.goods)
        that.setData({ goodslist: res.data })
        if (res.data.goods.length < 10) {
          that.setData({ isrun: false })
        }
        // console.log(that.data.goodslist)
      }
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
    var that = this
    wx.request({
      url: 'http://127.0.0.1/goods',
      data: this.data.queryInfo,
      success: function (res) {
        console.log(that.data.queryInfo)
        console.log(res)
        that.setData({ goodslist: res.data })
        console.log(that.data.goodslist)
        if (res.data.goods.length < 10) {
          that.setData({ isrun: false })
        }
      }
    })
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
    var newpage = this.data.queryInfo.pagenum += 1
    if (newpage >= this.data.goodslist.total) {
      return 0
    }
    this.setData({ 'queryInfo.pagenum': newpage })
    // console.log(11)
    var that = this

    wx.request({
      url: 'http://127.0.0.1/goods',
      data: this.data.queryInfo,
      success: function (res) {
        console.log(that.data.queryInfo)
        console.log(res.data)
        const good = that.data.goodslist.goods.concat(res.data.goods)
        that.setData({ 'goodslist.goods': good })

        console.log(res.data.pagenum)
        if (res.data.goods.length < 10) {
          that.setData({ isrun: false })
        }
        // console.log(that.data.goodslist)
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})