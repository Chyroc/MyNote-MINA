// index.js
// 获取应用实例
var uuidv4 = require('../../lib/uuid/we-uuidv4');
const _ = require('../../lib/lodash/lodash')

var app = getApp()
Page({
  data: {
    inputValue: '',
    userInfo: {},
    senses: [],
    image: ''
  },
  bindFormSubmit: function (e) {
    if (_.isEmpty(e.detail.value.textarea)) {
      wx.showToast({
        title: '文字不能为空',
        icon: 'success',
        duration: 800
      })
    } else {
      app.setSense({
        text: e.detail.value.textarea,
        image: this.data.image
      })
      this.setData({
        senses: app.getSenses()
      })
      this.setData({
        textValue: null,
        image: ''
      })
    }
  },
  deleteText: function (e) {
    const deletetextindex = e.target.dataset.deletetextindex
    const senses = app.getSenses()
    const sense_new = [...senses.slice(0, deletetextindex), ...senses.slice(deletetextindex + 1, senses.length + 1)]
    app.setSense(sense_new, false)
    this.setData({
      senses: sense_new
    })
  },
  chooseImage: function (e) {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        that.setData({
          image: tempFilePaths[0]
        })
      }
    })
  },
  previewImage: function (e) {
    const url = e.target.dataset.url
    wx.previewImage({
      urls: [url]
    })
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
