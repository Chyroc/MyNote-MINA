//app.js
const VERSION = 'v0.1.0'
const APP_NAME = 'WODEBENZI'
const SENSE_NAME = `${APP_NAME}_senses`

const getSenses = () => {
  return JSON.parse(wx.getStorageSync(SENSE_NAME) || '[]')
}

const setSense = (sense) => {
  const senses = getSenses()
  wx.setStorageSync(SENSE_NAME, JSON.stringify([...senses, sense]))
}

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
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
    senses: null
  }
})
