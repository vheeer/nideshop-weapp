// pages/ucenter/distribute/order/order.js
var api = require('../../../../config/api.js');
var util = require('../../../../utils/util.js');
var backgrounds = require('../../../../utils/abnor.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [{
      order_sn: 1234567890,
      order_status_text: 2,
      goodsList: [],
      actual_price: 100,
      commision: 10
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    this.getList()
    .then(function (res) {
      if (res.errno === 0) {
        console.log("分销订单记录res", res.data);
        const list = res.data.map(record => {
          const { add_time, ...rest } = record;
          return { add_time: new Date(add_time*1000).format('yyyy-MM-dd h:m:s'), ...rest };
        });
        that.setData({ list });
      }
    });
    console.log("背景图： ", backgrounds);
    this.setData({ backgrounds });
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
  
  },
  getList() {
    let that = this;
    return util.request(api.DistributeList, {}, "GET");
  }
})