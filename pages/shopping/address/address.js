var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
const pay = require('../../../services/pay.js');

Page({
  data: {
    addressList: [],
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.data.quickPayGoodsId = options.quickPayGoodsId;
    this.data.quickPaynumber = options.quickPaynumber;
    this.data.quickPayProductId = options.quickPayProductId;
    this.data.quickPayPostscript = options.quickPayPostscript; 
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    this.getAddressList();

  },
  getAddressList (){
    let that = this;
    util.request(api.AddressList).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          addressList: res.data
        });
      }
    });
  },
  addressAddOrUpdate (event) {
    console.log(event)
    wx.navigateTo({
      url: '/pages/shopping/addressAdd/addressAdd?id=' + event.currentTarget.dataset.addressId
    })
  },
  selectAddress(event){
    let that = this;
    console.log(event.currentTarget.dataset.addressId);
    try {
      wx.setStorageSync('addressId', event.currentTarget.dataset.addressId);
    } catch (e) {

    }
    if (!that.data.quickPayGoodsId) {
      //选择该收货地址
      wx.redirectTo({
        url: '/pages/shopping/checkout/checkout'
      })
    } else {
      console.log("app.globalData.referee", app.globalData);
      // 获取推荐人
      let referee = app.globalData.referee;
      referee = referee ? referee : null;
      //打开
      util.request(api.OrderQuickbuy, { 
        goodsId: this.data.quickPayGoodsId, 
        number: this.data.quickPaynumber, 
        productId: this.data.quickPayProductId, 
        addressId: event.currentTarget.dataset.addressId, 
        postscript: this.data.quickPayPostscript,  
        referee
      }, "POST")
        .then(function (res) {
          let _res = res;
          if (_res.errno == 0) {
            //发起支付
            const orderId = _res.data.orderInfo.id;
            pay.payOrder(parseInt(orderId)).then(res => {
              wx.redirectTo({
                url: '/pages/payResult/payResult?status=1&orderId=' + orderId
              });
            }).catch(res => {
              wx.redirectTo({
                url: '/pages/payResult/payResult?status=0&orderId=' + orderId
              });
            });

            that.setData({
              openAttr: !that.data.openAttr,
            });
          } else {
            let theToastMes = "下单失败";
            console.log("_res.errmsg", _res.errmsg);
            theToastMes = _res.errmsg;
            util.showErrorToast(theToastMes);
          }
        });
    }
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})