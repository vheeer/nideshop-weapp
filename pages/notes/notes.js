var app = getApp();
var WxParse = require('../../lib/wxParse/wxParse.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
const pay = require('../../services/pay.js');
const { title } = require('../../config/api.js');

Page({
  data: {
    content: ""
  },
  onLoad: function (options) {
    console.log(app.globalData.others[0]);
    const { notes: content } = app.globalData.others[0];
    let go = { content };
    WxParse.wxParse('goodsDetail', 'html', go.content, this);

    this.setData({
      content: go.content
    });
  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  }
})