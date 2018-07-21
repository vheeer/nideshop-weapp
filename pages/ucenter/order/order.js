var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var backgrounds = require('../../../utils/abnor.js');
const app = getApp();
Page({
  data:{
    orderList: []
  },
  onPullDownRefresh: function() {
    console.log("onPullDownRefreshing");
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    // 避免报错
    if(!options)
      options = {};
    if(app.globalData.need_showToast_in_order){
      wx.showToast({
        title: app.globalData.need_showToast_in_order,
        icon: 'success',
        duration: 2000,
        success: function(){
          app.globalData.need_showToast_in_order = "";
        }
      })
    }
    console.log("背景图： ", backgrounds);
    this.setData({ backgrounds });
  },
  getOrderList(){
    const that = this;
    util.request(api.OrderList).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          orderList: res.data.data
        });
      }
    });
  },
  getExpress() {
    const that = this;
    util.request(api.OrderExpress, {
      orderId: 510
    }, "GET")
    .then(res => {
      console.log("物流查询结果： ", res);
    });
  },
  payOrder(event) {
    console.log("payOrder event", event);
    const { orderid, actualprice } = event.target.dataset;
    wx.redirectTo({
      url: '/pages/pay/pay?orderId=' + orderid + "&actualPrice=" + actualprice,
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    this.getOrderList();
    this.getExpress();
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})