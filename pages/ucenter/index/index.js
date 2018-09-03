var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var user = require('../../../services/user.js');
var app = getApp();

Page({
  data: {
    userInfo: {}
  },
  onLoad: function (onewGoodsptions) {
    // 页面初始化 options为页面跳转所带来的参数
    const that = this;
    console.log(app.globalData);

    this.setData(app.globalData);
    this.getDistributeDetail()
    .then(function (res) {
      if (res.errno === 0) {
        that.setData(res.data);
        if (!res.data.is_distributor) {
          wx.navigateTo({
            url: '../join/join'
          })
        }
        // return that.getCode(res.data.access_token)
      }
    })
    .then(res => {
      // console.log("二维码: ", res);
      
    });

  },
  onReady: function () {

  },
  onShow: function () { 

    let userInfo = wx.getStorageSync('userInfo');
    let token = wx.getStorageSync('token');

    // 页面显示
    if (userInfo && token) {
      app.globalData.userInfo = userInfo;
      app.globalData.token = token;
    }

    this.setData({
      userInfo: app.globalData.userInfo,
    });

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭
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
  bindgetuserinfo: function(res){
    const that = this;
    console.log("res: ", res);
    const { userInfo } = res.detail;
    app.globalData.userInfo = userInfo;
    user.loginByWeixin().then(res => {
      that.setData({
        userInfo: res.data.userInfo
      });
      app.globalData.token = res.data.token;
    }).catch((err) => {
      console.log(err)
    });
  },
  exitLogin: function(){
    wx.showModal({
      title: '',
      confirmColor: '#b4282d',
      content: '退出登录？',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorageSync('token');
          wx.removeStorageSync('userInfo');
          wx.switchTab({
            url: '/pages/index/index'
          });
        }
      }
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
            console.log(res.data);
            const userInfo = wx.getStorageSync("userInfo");
            const new_userInfo = Object.assign(userInfo, { mobile: res.data });
            wx.setStorageSync("userInfo", new_userInfo);
            that.setData({ userInfo: new_userInfo });
        }
      });
    }
  },
  tapItem(e) {
    console.log('type: ', e);
    wx.navigateTo({ url: e.currentTarget.dataset.page });
  },
  addGroup(e) {
    if(this.data.userInfo.is_distributor !== 1){
      return wx.showModal({
        title: '提示',
        content: '成为优选客后可以加群',
        showCancel: false
      })
    }
    wx.previewImage({ 
      current: 'https://nideshop-admin-dva-1256171234.cos.ap-beijing.myqcloud.com/river/upload/images/addGroupCode.jpg', 
      urls: [ 'https://nideshop-admin-dva-1256171234.cos.ap-beijing.myqcloud.com/river/upload/images/addGroupCode.jpg' ], 
      complete: function(res){
        console.log("res", res)
      } 
    })
  }
})