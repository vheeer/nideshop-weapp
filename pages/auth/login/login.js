var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var user = require('../../../services/user.js');
var app = getApp();
Page({
  data: {
    username: '',
    password: '',
    code: '',
    loginErrorCount: 0
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 页面渲染完成
    if(wx.getStorageSync("userInfo")){
    // if(1){
      wx.switchTab({
        url: '../../index/index'
      });
    }
  },
  onReady: function () {

  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  startLogin: function () {
    var that = this;

    user.loginByWeixin().then(res => {
      that.setData({
        userInfo: res.data.userInfo
      });
      app.globalData.token = res.data.token;
      wx.switchTab({
        url: '../../index/index'
      });
    }).catch((err) => {
      console.log(err)
    });
  },
  bindUsernameInput: function (e) {

    this.setData({
      username: e.detail.value
    });
  },
  bindPasswordInput: function (e) {

    this.setData({
      password: e.detail.value
    });
  },
  bindCodeInput: function (e) {

    this.setData({
      code: e.detail.value
    });
  },
  clearInput: function (e) {
    switch (e.currentTarget.id) {
      case 'clear-username':
        this.setData({
          username: ''
        });
        break;
      case 'clear-password':
        this.setData({
          password: ''
        });
        break;
      case 'clear-code':
        this.setData({
          code: ''
        });
        break;
    }
  }
})