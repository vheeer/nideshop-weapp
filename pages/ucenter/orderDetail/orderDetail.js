var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
const app = getApp();

Page({
  data: {
    orderId: 0,
    orderInfo: {},
    orderGoods: [],
    handleOption: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      orderId: options.id,
      read_only: options.read_only
    });
    this.getOrderDetail();
  },
  getOrderDetail() {
    let that = this;
    util.request(api.OrderDetail, {
      orderId: that.data.orderId
    }).then(function (res) {
      if (res.errno === 0) {
        console.log(res.data);
        that.setData({
          orderInfo: res.data.orderInfo,
          orderGoods: res.data.orderGoods,
          handleOption: res.data.handleOption
        });
        //that.payTimer();
      }
    });
  },
  payTimer() {
    let that = this;
    let orderInfo = that.data.orderInfo;

    setInterval(() => {
      console.log(orderInfo);
      orderInfo.add_time -= 1;
      that.setData({
        orderInfo: orderInfo,
      });
    }, 1000);
  },
  payOrder() {
    let that = this;
    util.request(api.PayPrepayId, {
      orderId: that.data.orderId
    }).then(function (res) {
      if (res.errno === 0) {
        const payParam = res.data;
        wx.requestPayment({
          'timeStamp': payParam.timeStamp,
          'nonceStr': payParam.nonceStr,
          'package': payParam.package,
          'signType': payParam.signType,
          'paySign': payParam.paySign,
          'success': function (res) {
            console.log(res)
          },
          'fail': function (res) {
            console.log(res)
          }
        });
      }
    });
  },
  commentOrder(event) {
    console.log("event", event);
    const goods_id = event.target.dataset.goods_id;
    let that = this;
    wx.navigateTo({
      url: '/pages/commentPost/commentPost?typeId=0&valueId=' + goods_id,
    })
  },
  returnOrder() {
    let that = this;
  },
  confirmOrder() {
    let that = this;
    util.request(api.OrderConfirm, {
      orderId: that.data.orderId
    }).then(function (res) {
      console.log("cancelOrder res: ", res);
      wx.navigateBack({
        url: '/pages/ucenter/order/order',
        success: function (e) {
          let page = getCurrentPages().pop();
          if (page == undefined || page == null)
            return;
          //回到订单页面时候显示成功提示
          app.globalData.need_showToast_in_order = "确认收货成功";
          page.onLoad();
        }
      })
    });
  },
  cancelOrder() {
    let that = this;
    util.request(api.OrderCancel,{
      orderId: that.data.orderId
    }).then(function (res) {
      console.log("cancelOrder res: ", res);
      wx.navigateBack({
        url: '/pages/ucenter/order/order',
        success: function(e){
          let page = getCurrentPages().pop();
          if(page == undefined || page == null)
            return;
          //回到订单页面时候显示成功提示
          app.globalData.need_showToast_in_order = "取消订单成功";
          page.onLoad();
        }
      })
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
  }
})