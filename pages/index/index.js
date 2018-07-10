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
    notice: ""
  },
  onShareAppMessage: function(res){
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
          firstCategoryList: res.data.firstCategoryList,
          banner: res.data.banner,
          channel: res.data.channel,
          others: res.data.others
        });
        app.globalData.others = res.data.others;
      }
    });
  },
  withdraw: function() {
    // 提现
    // util.request(api.c).then(function (res) {
    //   console.log(res);
    // });
  },
  onLoad: function (options) {
    console.log("index options: ", options);
    this.getIndexData();
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
