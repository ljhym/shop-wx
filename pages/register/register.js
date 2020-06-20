// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: 'http://127.0.0.1/public/avatar/avatar.png',
    avatardata: '',
    pickerHidden: true,
    userinfo: {},
    id: ''
  },

  changeAvatar: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        console.log(res.tempFilePaths)
        var avatar = res.tempFilePaths;
        that.setData({
          avatar: avatar,
          avatardata: res.tempFilePaths[0]
        })
        console.log(that.data.avatardata)

      }
    })

  },

  formSubmit(e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    this.setData({ userinfo: e.detail.value })
    console.log(this.data.userinfo)
    var that = this
    if(this.data.avatardata==''){
      this.subuser()
      return 
    }
    wx.uploadFile({
      filePath: this.data.avatardata,
      name: 'name',
      url: 'http://127.0.0.1/users/avatar',
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        that.setData({ 'userinfo.avatar': res.data })
        console.log(that.data.userinfo)
        that.subuser()
      }
    })
    wx.redirectTo({
      url: '/pages/logs/logs',
    })
  },

  subuser: function () {
    wx.request({
      url: 'http://127.0.0.1/users',
      method: 'POST',
      data: this.data.userinfo,
      success: function (res) {
        // console.log(this.data.userinfo + '注册成功')
        console.log(res)
      }
    })
  },

  gotosubmit: function () {
    wx.redirectTo({
      url: '/pages/logs/logs',
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