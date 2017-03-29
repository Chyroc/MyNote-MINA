// index.js
// 获取应用实例
var uuidv4 = require('../../lib/uuid/we-uuidv4');
const _ = require('../../lib/lodash/lodash')

var app = getApp()
Page({
  data: {
    inputValue: '',
    userInfo: {},
    senses: []
  },
  // 事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindFormSubmit: function (e) {
    if (_.isEmpty(e.detail.value.textarea)) {
      wx.showToast({
        title: '文字不能为空',
        icon: 'success',
        duration: 800
      })
    } else {
      app.setSense(e.detail.value.textarea)
      this.setData({
        senses: app.getSenses()
      })
      this.setData({
        textValue: null
      })
    }
  },
  onLoad: function () {
    console.log('onLoad')
    this.setData({
      senses: app.getSenses()
    })
    var that = this
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })
  }
})
