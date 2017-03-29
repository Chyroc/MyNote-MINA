//app.js
const VERSION = 'v0.1.2'
const APP_NAME = 'WODEBENZI'
const SENSE_NAME = `${APP_NAME}_senses`

const getSenses = () => {
  return JSON.parse(wx.getStorageSync(SENSE_NAME) || '[{"text": "", "image": ""}]')
}

const setSense = (sense, append = true) => {
  if (append) {
    const senses = getSenses()
    wx.setStorageSync(SENSE_NAME, JSON.stringify([...senses, sense]))
  } else {
    wx.setStorageSync(SENSE_NAME, JSON.stringify(sense))
  }
}

App({
  onLaunch: function () {

  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  getSenses: getSenses,
  setSense: setSense,
  globalData: {
    userInfo: null,
    senses: {
      text: '',
      image: ''
    }
  }
})
