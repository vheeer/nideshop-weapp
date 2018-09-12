var util = require('../../../../utils/util.js');
var api = require('../../../../config/api.js');
var user = require('../../../../services/user.js');
const app = getApp();
Page({
  data: {
    partner: [{
        id: 0,
        name: '梦想合伙人',
        original_price: 300,
        price: 8,
        first_commision: 40,
        second_commision: 10,
        desc: '你的粉丝购买商品或者加入优选客联盟等，您可获得提成，躺着就能赚钱'
      },
      {
        id: 1,
        name: '天使合伙人',
        original_price: 1000,
        price: 18,
        first_commision: 40,
        second_commision: 20,
        desc: '你的粉丝购买商品或者加入优选客联盟等，您可获得提成，躺着就能赚钱'
      }
    ],
    partnerList: ['梦想合伙人', '天使合伙人'],
    selectedPartnerIndex: 1,
    agree: false
  },
  onLoad: function (options) {
    const that = this;
    this.setData(app.globalData);
    this.getDistributeDetail()
    .then(function (res) {
      if (res.errno === 0) {
        that.setData(res.data);
        if (!res.data.is_distributor) {

        }
      }
    })
    .then(res => {
      
    });
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  onUnload: function () {
  
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  },
  agree: function(e) {
    console.log('agree e', e);
    this.setData({
      agree: !this.data.agree
    })
  },
  showAgreement: function(e) {
    this.setData({});
    wx.showModal({
      title: '《合伙人须知》',
      content: '优选客在使用优选客联盟提供的各项服务的同事，承诺接受并遵守各项规定、规则，优选客联盟有权根据需要不时的修改本协议和规则，新规则在优选客联盟平台发布，如有优选客违反新规则，涉及违法犯罪，涉及传销等欺诈手段，优选客联盟有权自动解除优选客，情节严重的可移交司法机关处理。\n佣金规则：1、下级购买商品为商品价格*0.02*分成比=佣金；2、推荐成为合伙人直接从下级加入费用提70%，二级加入费用提20%；该佣金规则持续到2018年10月1号0点，届时更改规则。'
    })
  },
  changePartner: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      selectedPartnerIndex: e.detail.value
    })
  },
  getPhoneNumber(e){
    const that = this;
    const app = getApp();
    console.log("e.detail.errMsg", e.detail.errMsg);
    console.log("e.detail.iv", e.detail.iv);
    console.log("e.detail.encryptedData", e.detail.encryptedData);
    console.log("app.globalData", app.globalData);

    const { iv, encryptedData } = e.detail;
    if(iv && encryptedData)
    {
      util.request(api.Mobile, {
        iv, 
        encryptedData
      }, "POST")
      .then(function (res) {
        if (res.errno === 0) {
            console.log('获取手机', res.data);
            const userInfo = wx.getStorageSync("userInfo");
            const new_userInfo = Object.assign(userInfo, { mobile: res.data });
            wx.setStorageSync("userInfo", new_userInfo);
            that.setData({ mobile: res.data });
        }
      });
    }
  },
  getDistributeDetail() {
    let that = this;
    util.request(api.DistributeList, {}, "GET")
    .then(res => {
      console.log("获取我的分销订单res ", res)
    });
    return util.request(api.DistributeDetail, {
      
    })
  },
  formSubmit: function (e) {
    console.log('申请分销商form发生了submit事件，携带数据为：', e.detail.value);
    const { real_name, mobile } = e.detail.value;

    if(real_name.length < 2 && 0)
      return wx.showModal({ title: "提示", content: "请输入姓名", showCancel: false });
    if((!this.data.mobile || this.data.mobile === '') && 0)
      return wx.showModal({ title: "提示", content: "请绑定手机", showCancel: false });
    if(!this.data.agree && 0)
      return wx.showModal({ title: "提示", content: "请阅读协议", showCancel: false });

    util.request(api.ApplyPay, { real_name, mobile, distributor_level: this.data.selectedPartnerIndex }, "POST")
    .then(function (res) {
      console.log("申请分销商 res: ", res);
      if(res.errno === 1){
        wx.showToast({ title: "申请中.." });
      }else{
        console.log("payPrepayId res: ", res);
        if (res.errno === 0) {
          let payParam = res.data;
          wx.requestPayment({
            'timeStamp': payParam.timeStamp,
            'nonceStr': payParam.nonceStr,
            'package': payParam.package,
            'signType': payParam.signType,
            'paySign': payParam.paySign,
            'success': function (res) {
              console.log("success to requestPayment and res is: ", res);
              wx.showModal({ 
                title: '提示', 
                content: '支付成功', 
                showCancel: false, 
                success: function(res) {
                  let userInfo = wx.getStorageSync('userInfo');
                  userInfo.is_distributor = 1
                  wx.setStorageSync('userInfo', userInfo)
                  if (res.confirm) {
                    wx.switchTab({
                      url: '/pages/ucenter/index/index'
                    })
                  }
                }
              })
            },
            'fail': function (res) {
              console.log("fail to requestPayment and res is: ", res);
            }
          })
        }
      }
    });
  },
})