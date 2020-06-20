// pages/hot/hot.js
Page({


  /**
   * 页面的初始数据
   */
  data: {
    queryInfo: {
      query: '',
      pagenum: 1,
      pagesize: 10,
      cid: 0,
      cid2: 0,
      cid3: 0
    },
    goodslist: {},
    isrun: true,

    select: false,
    select2: false,
    select3: false,
    tihuoWay: '请选择分类',
    tihuoWay2: '请选择分类',
    tihuoWay3: '请选择分类',
    catelist: [],
    catelist2: [],
    catelist3: []
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
        console.log(that.data.goodslist)
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdataHandle()
  },



  bindShowMsg(e) {
    console.log(e.currentTarget.dataset.id)
    if (e.currentTarget.dataset.id == 1) {
      this.setData({
        select: !this.data.select
      })
    } else if (e.currentTarget.dataset.id == 2) {
      this.setData({
        select2: !this.data.select2
      })
    } else {
      this.setData({
        select3: !this.data.select3
      })
    }
  },
  mySelect(e) {
    console.log(e)
    var that = this
    var name = e.currentTarget.dataset.name

    if (e.currentTarget.dataset.id == 1) {
      var k = 0
      var cids = e.currentTarget.dataset.cid
      this.setData({
        tihuoWay: name,
        tihuoWay2: '请选择分类',
        tihuoWay3: '请选择分类',
        select: false,
        'queryInfo.cid': cids,
        'queryInfo.cid2': k,
        'queryInfo.cid3': k,
      })

      this.data.catelist.forEach(element => {
        if (typeof element == 'object') {
          if (element.cat_name == name) {
            that.setData({ catelist2: element.children })
          }
        } else {
          return
        }
      });
      // 选择分类后获取数据
      this.setData({ 'queryInfo.pagenum': 1 })
      this.getdataHandle()
    } else if (e.currentTarget.dataset.id == 2) {
      var k = 0
      var cids = e.currentTarget.dataset.cid
      this.setData({
        tihuoWay2: name,
        tihuoWay3: '请选择分类',
        select2: false,
        'queryInfo.cid2': cids,
        'queryInfo.cid3': k
      })

      this.data.catelist2.forEach(element => {
        if (typeof element == 'object') {
          if (element.cat_name == name) {
            that.setData({ catelist3: element.children })
          }
        } else {
          return
        }
      });
      // 选择分类后获取数据
      this.setData({ 'queryInfo.pagenum': 1 })
      this.getdataHandle()
    } else {
      var cids = e.currentTarget.dataset.cid
      this.setData({
        tihuoWay3: name,
        select3: false,
        'queryInfo.cid3': cids
      })
      // 选择分类后获取数据
      this.setData({ 'queryInfo.pagenum': 1 })
      this.getdataHandle()
    }

    this.setData({
      select: false,
      select2: false,
      select3: false
    })

  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // /categories
    var that = this
    wx.request({
      url: 'http://127.0.0.1/categories',
      data: { type: 2 },
      success: function (res) {
        console.log(res.data)
        that.setData({ catelist: res.data })
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