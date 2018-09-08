var util = require('../../utils/util.js');
var api = require('../../config/api.js');
const { title } = require('../../config/api.js');

//获取应用实例
const app = getApp()
Page({
  data: {
    navList: [],
    categoryList: [],
    currentCategory: {},
    scrollLeft: 0,
    scrollTop: 0,
    goodsCount: 0,
    scrollHeight: 0
  },
  onShow: function (options) {
    const { currentTopcategoryId } = app.globalData;
    if (currentTopcategoryId) {
      const currentCategory = this.getCurrentCategory(currentTopcategoryId)
      this.setData({
        currentCategory
      })
    }
  },
  getCatalog: function () {
    //CatalogList
    let that = this;
    wx.showLoading({
      title: '加载中...',
    });
    util.request(api.CatalogList).then(function (res) {
        that.setData({
          navList: res.data.categoryList,
          currentCategory: res.data.currentCategory
        });
        wx.hideLoading();
      });
    util.request(api.GoodsCount).then(function (res) {
      that.setData({
        goodsCount: res.data.goodsCount
      });
    });

  },
  getCurrentCategory: function (id) {
    let that = this;
    util.request(api.CatalogCurrent, { id: id })
      .then(function (res) {
        that.setData({
          currentCategory: res.data.currentCategory
        });
        app.globalData.currentTopcategoryId = res.data.currentCategory.id
      });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onLoad: function () {
    console.log()
    // 页面加载
    this.getCatalog();
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  switchCate: function (event) {
    var that = this;
    var currentTarget = event.currentTarget;
    if (this.data.currentCategory.id == event.currentTarget.dataset.id) {
      return false;
    }

    this.getCurrentCategory(event.currentTarget.dataset.id);
  },
  onShareAppMessage: function (res) {
    return {
      title: title + '-分类'
    }
  }
})