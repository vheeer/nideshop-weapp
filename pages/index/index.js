const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');
const { title, shop_type } = require('../../config/api.js');

//获取应用实例
const app = getApp()
Page({
  data: {
    newGoods: [],
    hotGoods: [],
    topics: [],
    brands: [],
    floorCategorys: [],
    floorGoods: [],
    banner: [],
    channel: [],
    others: [],
    tags: [],
    notice: "",
    invitation_open: false
  },
  onShareAppMessage: function (res) {
    return {
      title,
      path: '/pages/index/index?referee=' + app.globalData.userInfo.id
    }
  },
  getIndexData: function () {
    let that = this;
    util.request(api.IndexUrl + "&type=" + shop_type).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          newGoods: res.data.newGoodsList,
          hotGoods: res.data.hotGoodsList,
          topics: res.data.topicList,
          brands: res.data.brandList,
          categoryGoodsList: res.data.categoryGoodsList,
          topCategoryList: res.data.topCategoryList,
          firstCategoryList: res.data.firstCategoryList,
          banner: res.data.banner,
          channel: res.data.channel,
          others: res.data.others,
          tags: res.data.tagList
        });
        app.globalData.others = res.data.others;
      }
    });
  },
  withdraw: function () {
    // 提现
    // util.request(api.c).then(function (res) {
    //   console.log(res);
    // });
  },
  go_distribute: function() {
    wx.navigateTo({ url: '/pages/ucenter/distribute/join/join' })
  },
  goCata(e) {
    console.log(e);
    const { id } = e.currentTarget.dataset;
    app.globalData.currentTopcategoryId = id;
    wx.switchTab({
      url: '/pages/catalog/catalog?id=' + id
    })
  },
  close: function() {
    this.setData({
      invitation_open: false
    })
  },
  onLoad: function (options) {
    console.log("index options: ", options)

    this.getIndexData()

    const userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userInfo: userInfo,
      invitation_open: !userInfo.is_distributor
    })
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
  },
})
